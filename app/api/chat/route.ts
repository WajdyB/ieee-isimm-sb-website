import { NextRequest, NextResponse } from 'next/server'
import { getAllEntries, searchKB } from '@/lib/kb-engine'
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

        // 1. Get full Knowledge Base and relevant matches for sources
        const allEntries = getAllEntries()
        const kbResults = searchKB(latestQuery)

        // 2. Format KB as structured JSON context (optimized for LLM comprehension)
        const kbContext = allEntries.map(entry => ({
            id: entry.id,
            title: entry.title,
            content: entry.content,
            tags: entry.tags,
            links: entry.links.length > 0 ? entry.links : undefined
        }))

        // 3. Prepare System Prompt with full KB context
        const systemPrompt = `You are "Zarga", the friendly and professional AI assistant for the IEEE ISIMM Student Branch (Higher Institute of Informatics and Multimedia of Monastir).

## Instructions
- Use the Knowledge Base below to answer questions accurately.
- When information is available in the KB, reference it and include relevant links if provided.
- For topics not covered in the KB, use your general knowledge while staying grounded in IEEE context.
- If uncertain about sensitive or unknown topics, say: "I'm not sure based on our IEEE ISIMM resources. I can give a general IEEE explanation or you can contact us for official information."
- Keep answers clear, structured, and concise. Use markdown formatting.

## Knowledge Base
${JSON.stringify(kbContext, null, 2)}

## Assistant Profile
Name: Zarga
Organization: IEEE ISIMM Student Branch
Tone: Helpful, Engineering-focused, Professional`

        // 4. Call LLM
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
                usedKB: allEntries.length > 0
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
