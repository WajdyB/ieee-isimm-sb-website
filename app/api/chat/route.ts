import { NextRequest, NextResponse } from 'next/server'
import { searchKB } from '@/lib/kb-engine'
import { callLLM, ChatMessage } from '@/lib/llm-provider'

// Simple in-memory rate limiting for MVP
const ipCache = new Map<string, { count: number; lastReset: number }>()
const RATE_LIMITCount = 10 // 10 requests
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute

function isRateLimited(ip: string): boolean {
    const now = Date.now()
    const stats = ipCache.get(ip) || { count: 0, lastReset: now }

    if (now - stats.lastReset > RATE_LIMIT_WINDOW) {
        stats.count = 1
        stats.lastReset = now
        ipCache.set(ip, stats)
        return false
    }

    if (stats.count >= RATE_LIMITCount) {
        return true
    }

    stats.count++
    ipCache.set(ip, stats)
    return false
}

export async function POST(req: NextRequest) {
    try {
        const ip = req.headers.get('x-forwarded-for') || 'unknown'
        if (isRateLimited(ip)) {
            return NextResponse.json(
                { reply: 'Too many requests. Please try again in a minute.' },
                { status: 429 }
            )
        }

        const { messages } = await req.json()

        if (!messages || !Array.isArray(messages) || messages.length === 0) {
            return NextResponse.json(
                { reply: 'Invalid request: messages array is required.' },
                { status: 400 }
            )
        }

        const latestQuery = messages[messages.length - 1].content

        // 1. Search Knowledge Base
        const kbResults = searchKB(latestQuery)
        const contextStr = kbResults
            .map(r => `[ID: ${r.entry.id}] ${r.entry.content}\nLinks: ${JSON.stringify(r.entry.links)}`)
            .join('\n\n')

        // 2. Prepare System Prompt
        const systemPrompt = `You are "Zarga", the friendly and professional AI assistant for the IEEE ISIMM Student Branch (Higher Institute of Informatics and Multimedia of Monastir).

Your Goal:
- Answer questions primarily using the provided Knowledge Base (KB) context.
- If the KB contains the answer, use it and cite the links provided.
- If the KB is insufficient, use your general knowledge but stay grounded in the IEEE context.
- If you are absolutely unsure or the topic is sensitive/unknown, say: "I’m not sure based on our IEEE ISIMM resources. I can give a general IEEE explanation or you can provide an official source."
- Always keep answers clear, structured, and concise. Use markdown for formatting.

Context from Knowledge Base:
${contextStr || 'No specific matches found in KB.'}

Name: Zarga
Tone: Helpful, Engineering-focused, Professional.
`

        // 3. Call LLM
        const fullMessages: ChatMessage[] = [
            { role: 'system', content: systemPrompt },
            ...messages
        ]

        const response = await callLLM(fullMessages)

        if (response.error) {
            return NextResponse.json({ reply: response.error }, { status: 500 })
        }

        return NextResponse.json({
            reply: response.reply,
            sources: kbResults.map(r => ({ title: r.entry.title, links: r.entry.links })),
            meta: {
                matches: kbResults.length,
                usedKB: kbResults.length > 0
            }
        })

    } catch (error) {
        console.error('Chat API Error:', error)
        return NextResponse.json(
            { reply: 'An internal error occurred. Please try again later.' },
            { status: 500 }
        )
    }
}
