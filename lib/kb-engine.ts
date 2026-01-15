import fs from 'fs'
import path from 'path'

export interface KBEntry {
    id: string
    title: string
    tags: string[]
    content: string
    links: { label: string; url: string }[]
    priority: number
}

export interface KBSearchResult {
    entry: KBEntry
    score: number
}

const KB_PATH = path.join(process.cwd(), 'data', 'ieee_knowledge_tn.json')

export function searchKB(query: string): KBSearchResult[] {
    try {
        const fileContent = fs.readFileSync(KB_PATH, 'utf-8')
        const kb = JSON.parse(fileContent)
        const entries: KBEntry[] = kb.entries

        const tokens = query.toLowerCase().split(/\s+/)

        const results = entries.map(entry => {
            let score = 0
            const contentLower = entry.content.toLowerCase()
            const titleLower = entry.title.toLowerCase()
            const tagsLower = entry.tags.map(t => t.toLowerCase())

            tokens.forEach(token => {
                if (token.length < 3) return // Skip very short tokens

                // Match in title (highest weight)
                if (titleLower.includes(token)) score += 10

                // Match in tags (high weight)
                if (tagsLower.some(tag => tag.includes(token))) score += 7

                // Match in content (medium weight)
                if (contentLower.includes(token)) score += 3
            })

            // Bonus for priority
            score += (entry.priority === 1 ? 2 : entry.priority === 2 ? 1 : 0)

            return { entry, score }
        })

        // Filter out zero scores and sort
        return results
            .filter(r => r.score > 0)
            .sort((a, b) => b.score - a.score)
            .slice(0, 5) // Return top 5
    } catch (error) {
        console.error('Error reading/parsing KB:', error)
        return []
    }
}
