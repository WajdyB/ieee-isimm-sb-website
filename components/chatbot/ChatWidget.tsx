"use client"

import React, { useState, useEffect, useRef } from 'react'
import {
    MessageCircle,
    X,
    Send,
    Trash2,
    Copy,
    ChevronDown,
    Bot,
    User,
    Loader2,
    CheckCircle2
} from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface Message {
    role: 'user' | 'assistant'
    content: string
    timestamp: number
    sources?: { title: string; links: { label: string; url: string }[] }[]
}

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState<Message[]>([])
    const [input, setInput] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

    const scrollRef = useRef<HTMLDivElement>(null)

    // Load history from localStorage
    useEffect(() => {
        const saved = localStorage.getItem('zarga_chat_history')
        if (saved) {
            try {
                setMessages(JSON.parse(saved))
            } catch (e) {
                console.error('Failed to parse chat history', e)
            }
        } else {
            // Welcome message
            setMessages([
                {
                    role: 'assistant',
                    content: "Hello! I'm **Zarga**, your IEEE ISIMM SB assistant. How can I help you today? I can answer questions about IEEE Global, Tunisia Section, or our Student Branch.",
                    timestamp: Date.now()
                }
            ])
        }
    }, [])

    // Save history to localStorage
    useEffect(() => {
        if (messages.length > 0) {
            localStorage.setItem('zarga_chat_history', JSON.stringify(messages))
        }
    }, [messages])

    // Scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [messages, isLoading])

    const handleSend = async () => {
        if (!input.trim() || isLoading) return

        const userMessage: Message = {
            role: 'user',
            content: input,
            timestamp: Date.now()
        }

        setMessages(prev => [...prev, userMessage])
        setInput('')
        setIsLoading(true)
        setError(null)

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: [...messages, userMessage].map(m => ({ role: m.role, content: m.content }))
                })
            })

            if (!response.ok) {
                throw new Error(response.status === 429 ? 'Too many requests. Please wait.' : 'Failed to get response.')
            }

            const data = await response.json()

            const assistantMessage: Message = {
                role: 'assistant',
                content: data.reply,
                timestamp: Date.now(),
                sources: data.sources
            }

            setMessages(prev => [...prev, assistantMessage])
        } catch (err: any) {
            setError(err.message || 'Something went wrong.')
        } finally {
            setIsLoading(false)
        }
    }

    const clearChat = () => {
        if (confirm('Clear all messages?')) {
            const welcome: Message = {
                role: 'assistant',
                content: "Chat cleared. I'm ready for new questions!",
                timestamp: Date.now()
            }
            setMessages([welcome])
            localStorage.setItem('zarga_chat_history', JSON.stringify([welcome]))
        }
    }

    const copyToClipboard = (text: string, index: number) => {
        navigator.clipboard.writeText(text)
        setCopiedIndex(index)
        setTimeout(() => setCopiedIndex(null), 2000)
    }

    return (
        <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
            {/* Chat Window */}
            {isOpen && (
                <div className="mb-4 w-[90vw] sm:w-[400px] h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
                    {/* Header */}
                    <div className="bg-sky-500 p-4 text-white flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                                <Bot className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold">Zarga</h3>
                                <p className="text-xs text-sky-100">IEEE ISIMM Assistant</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={clearChat}
                                className="p-1.5 hover:bg-white/10 rounded-md transition-colors"
                                title="Clear Chat"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-1.5 hover:bg-white/10 rounded-md transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Messages */}
                    <div
                        ref={scrollRef}
                        className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50"
                    >
                        {messages.map((msg, idx) => (
                            <div
                                key={idx}
                                className={cn(
                                    "flex flex-col max-w-[85%]",
                                    msg.role === 'user' ? "ml-auto items-end" : "mr-auto items-start"
                                )}
                            >
                                <div className={cn(
                                    "px-4 py-2 rounded-2xl text-sm leading-relaxed relative group",
                                    msg.role === 'user'
                                        ? "bg-sky-500 text-white rounded-tr-none"
                                        : "bg-white text-gray-800 border border-gray-100 shadow-sm rounded-tl-none"
                                )}>
                                    {msg.role === 'assistant' ? (
                                        <div className="prose prose-sm max-w-none dark:prose-invert">
                                            <ReactMarkdown>{msg.content}</ReactMarkdown>
                                        </div>
                                    ) : (
                                        msg.content
                                    )}

                                    {msg.role === 'assistant' && (
                                        <button
                                            onClick={() => copyToClipboard(msg.content, idx)}
                                            className="absolute -right-8 top-0 p-1 text-gray-400 hover:text-sky-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            {copiedIndex === idx ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                                        </button>
                                    )}
                                </div>

                                {/* Sources */}
                                {msg.sources && msg.sources.length > 0 && (
                                    <div className="mt-2 space-y-1 w-full">
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Sources:</p>
                                        {msg.sources.map((source, sIdx) => (
                                            <div key={sIdx} className="flex flex-wrap gap-2">
                                                {source.links.map((link, lIdx) => (
                                                    <a
                                                        key={lIdx}
                                                        href={link.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-[11px] text-sky-600 hover:underline bg-sky-50 px-2 py-0.5 rounded-full border border-sky-100"
                                                    >
                                                        {link.label}
                                                    </a>
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <span className="text-[10px] text-gray-400 mt-1">
                                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>
                        ))}

                        {isLoading && (
                            <div className="flex items-center gap-2 text-gray-400">
                                <div className="w-8 h-8 bg-white border border-gray-100 rounded-full flex items-center justify-center shadow-sm">
                                    <Loader2 className="w-4 h-4 animate-spin text-sky-500" />
                                </div>
                                <span className="text-xs italic">Zarga is thinking...</span>
                            </div>
                        )}

                        {error && (
                            <div className="p-2 bg-red-50 text-red-600 text-xs rounded-lg border border-red-100 flex items-center gap-2">
                                <X className="w-3 h-3" />
                                {error}
                            </div>
                        )}
                    </div>

                    {/* Input */}
                    <div className="p-4 bg-white border-t border-gray-100">
                        <form
                            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                            className="flex items-center gap-2"
                        >
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask about IEEE ISIMM..."
                                className="flex-1 bg-gray-50 border-none rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-sky-500 outline-none"
                                disabled={isLoading}
                            />
                            <Button
                                type="submit"
                                size="sm"
                                className="bg-sky-500 hover:bg-sky-600 rounded-xl px-3"
                                disabled={!input.trim() || isLoading}
                            >
                                <Send className="w-4 h-4" />
                            </Button>
                        </form>
                        <p className="text-[10px] text-center text-gray-400 mt-2">
                            Powered by Zarga AI • IEEE ISIMM SB
                        </p>
                    </div>
                </div>
            )}

            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 transform hover:scale-110",
                    isOpen ? "bg-white text-sky-500 rotate-90" : "bg-sky-500 text-white"
                )}
            >
                {isOpen ? <ChevronDown className="w-8 h-8" /> : <MessageCircle className="w-8 h-8" />}
                {!isOpen && messages.length > 0 && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                        1
                    </div>
                )}
            </button>
        </div>
    )
}
