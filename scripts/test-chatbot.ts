import { callLLM } from '../lib/llm-provider'

async function test() {
    console.log('--- Chatbot Diagnostic ---')
    console.log('Checking environment variables...')
    console.log('LLM_PROVIDER:', process.env.LLM_PROVIDER)
    console.log('LLM_MODEL:', process.env.LLM_MODEL)
    console.log('LLM_API_KEY defined:', !!process.env.LLM_API_KEY)

    if (!process.env.LLM_API_KEY) {
        console.error('ERROR: LLM_API_KEY is missing!')
        return
    }

    console.log('\nTesting LLM connectivity...')
    try {
        const response = await callLLM([
            { role: 'user', content: 'Hello, are you working?' }
        ])

        if (response.error) {
            console.error('LLM API Error:', response.error)
        } else {
            console.log('LLM Response:', response.reply)
            console.log('\nSUCCESS: Connectivity established.')
        }
    } catch (err) {
        console.error('Unexpected error during test:', err)
    }
}

test()
