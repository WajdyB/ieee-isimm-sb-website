import { GoogleGenerativeAI } from '@google/generative-ai'

export interface ChatMessage {
    role: 'user' | 'assistant' | 'system'
    content: string
}

export interface LLMResponse {
    reply: string
    error?: string
}

export async function callLLM(messages: ChatMessage[]): Promise<LLMResponse> {
    const provider = process.env.LLM_PROVIDER || 'GEMINI'
    const apiKey = process.env.LLM_API_KEY
    const modelName = process.env.LLM_MODEL || 'gemini-pro'

    if (!apiKey) {
        return { reply: '', error: 'LLM API key is not configured' }
    }

    if (provider === 'GEMINI') {
        try {
            const genAI = new GoogleGenerativeAI(apiKey)
            const model = genAI.getGenerativeModel({ model: modelName })

            // Extract system instruction if present
            const systemMessage = messages.find(m => m.role === 'system')

            // Gemini requires history to start with a 'user' role.
            // We find the first 'user' message and slice from there.
            const rawHistory = messages.filter(m => m.role !== 'system').slice(0, -1)
            const firstUserIndex = rawHistory.findIndex(m => m.role === 'user')
            const history = firstUserIndex !== -1 ? rawHistory.slice(firstUserIndex) : []

            const latestMessage = messages[messages.length - 1].content

            const chat = model.startChat({
                history: history.map(m => ({
                    role: m.role === 'user' ? 'user' : 'model',
                    parts: [{ text: m.content }],
                })),
                generationConfig: {
                    maxOutputTokens: 1000,
                },
                systemInstruction: systemMessage ? { role: 'user', parts: [{ text: systemMessage.content }] } : undefined,
            })

            const result = await chat.sendMessage(latestMessage)
            const response = await result.response
            return { reply: response.text() }
        } catch (error) {
            console.error('Gemini API Error:', error)
            return { reply: '', error: 'Failed to communicate with LLM' }
        }
    }

    return { reply: '', error: 'Unsupported LLM provider' }
}
