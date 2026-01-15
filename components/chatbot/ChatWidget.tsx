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
    Loader2,
    CheckCircle2
} from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'

interface Message {
    role: 'user' | 'assistant'
    content: string
    timestamp: number
    sources?: { title: string; links: { label: string; url: string }[] }[]
}

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false)
    const [isRendered, setIsRendered] = useState(false)
    const [messages, setMessages] = useState<Message[]>([])
    const [input, setInput] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

    const bottomRef = useRef<HTMLDivElement>(null)

    // Handle render state for animations
    useEffect(() => {
        if (isOpen) {
            setIsRendered(true)
        } else {
            const timer = setTimeout(() => setIsRendered(false), 300)
            return () => clearTimeout(timer)
        }
    }, [isOpen])

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
            setMessages([
                {
                    role: 'assistant',
                    content: "Hello! I'm **Zarga**, your IEEE ISIMM SB assistant. How can I help you today?",
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
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages, isLoading, isRendered])

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
        // No confirm dialog for cleaner UX, or use custom UI. 
        // For minimalist, we'll just clear it. But maybe keep a confirmation if needed.
        // Let's stick to simple clear for now as per "neat".
        const welcome: Message = {
            role: 'assistant',
            content: "Chat cleared. I'm ready for new questions!",
            timestamp: Date.now()
        }
        setMessages([welcome])
        localStorage.setItem('zarga_chat_history', JSON.stringify([welcome]))
    }

    const copyToClipboard = (text: string, index: number) => {
        navigator.clipboard.writeText(text)
        setCopiedIndex(index)
        setTimeout(() => setCopiedIndex(null), 2000)
    }

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4 pointer-events-none">
            {/* Chat Window */}
            {(isOpen || isRendered) && (
                <Card className={cn(
                    "w-[90vw] sm:w-[380px] h-[550px] flex flex-col shadow-2xl transition-all duration-300 ease-in-out origin-bottom-right pointer-events-auto border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
                    isOpen 
                        ? "opacity-100 scale-100 translate-y-0" 
                        : "opacity-0 scale-95 translate-y-10"
                )}>
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b bg-muted/20">
                        <div className="flex items-center gap-3">
                            <Avatar className="h-9 w-9 border">
                                <AvatarFallback className="bg-primary/10 text-primary">
                                    <Bot className="h-5 w-5" />
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <h3 className="font-semibold text-sm leading-none">Zarga AI</h3>
                                <p className="text-xs text-muted-foreground mt-1">IEEE ISIMM Assistant</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1">
                            <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8 text-muted-foreground hover:text-destructive transition-colors" 
                                onClick={clearChat}
                                title="Clear chat"
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                            <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8 text-muted-foreground hover:text-foreground transition-colors" 
                                onClick={() => setIsOpen(false)}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Messages */}
                    <ScrollArea className="flex-1 p-4">
                        <div className="space-y-6 pr-4">
                            {messages.map((msg, idx) => (
                                <div
                                    key={idx}
                                    className={cn(
                                        "flex flex-col max-w-[85%] gap-1",
                                        msg.role === 'user' ? "ml-auto items-end" : "mr-auto items-start"
                                    )}
                                >
                                    <div className={cn(
                                        "px-4 py-2.5 rounded-2xl text-sm leading-relaxed relative group shadow-sm",
                                        msg.role === 'user'
                                            ? "bg-primary text-primary-foreground rounded-tr-none"
                                            : "bg-muted/50 text-foreground border border-border/50 rounded-tl-none"
                                    )}>
                                        {msg.role === 'assistant' ? (
                                            <div className="prose prose-sm max-w-none dark:prose-invert prose-p:leading-relaxed prose-pre:bg-muted/50">
                                                <ReactMarkdown>{msg.content}</ReactMarkdown>
                                            </div>
                                        ) : (
                                            msg.content
                                        )}

                                        {msg.role === 'assistant' && (
                                            <button
                                                onClick={() => copyToClipboard(msg.content, idx)}
                                                className="absolute -right-8 top-0 p-1 text-muted-foreground hover:text-primary opacity-0 group-hover:opacity-100 transition-all"
                                            >
                                                {copiedIndex === idx ? (
                                                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                                                ) : (
                                                    <Copy className="w-4 h-4" />
                                                )}
                                            </button>
                                        )}
                                    </div>

                                    {/* Sources */}
                                    {msg.sources && msg.sources.length > 0 && (
                                        <div className="mt-1 space-y-1 w-full pl-1">
                                            <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Sources</p>
                                            {msg.sources.map((source, sIdx) => (
                                                <div key={sIdx} className="flex flex-wrap gap-2">
                                                    {source.links.map((link, lIdx) => (
                                                        <a
                                                            key={lIdx}
                                                            href={link.url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-[10px] text-primary hover:underline hover:text-primary/80 bg-primary/5 px-2 py-0.5 rounded-full border border-primary/10 transition-colors"
                                                        >
                                                            {link.label}
                                                        </a>
                                                    ))}
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    <span className="text-[10px] text-muted-foreground/60 px-1">
                                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>
                            ))}

                            {isLoading && (
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-8 w-8">
                                        <AvatarFallback className="bg-muted text-muted-foreground animate-pulse">
                                            <Bot className="h-4 w-4" />
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex gap-1">
                                        <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                        <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                        <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce"></div>
                                    </div>
                                </div>
                            )}

                            {error && (
                                <div className="p-3 bg-destructive/10 text-destructive text-xs rounded-lg border border-destructive/20 flex items-center gap-2">
                                    <X className="w-4 h-4" />
                                    {error}
                                </div>
                            )}
                            <div ref={bottomRef} />
                        </div>
                    </ScrollArea>

                    {/* Input */}
                    <div className="p-4 border-t bg-background">
                        <form
                            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                            className="relative flex items-center"
                        >
                            <Input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask about IEEE ISIMM..."
                                className="pr-12 py-6 rounded-full bg-muted/30 border-muted-foreground/20 focus-visible:ring-primary/20 focus-visible:border-primary"
                                disabled={isLoading}
                            />
                            <Button
                                type="submit"
                                size="icon"
                                className={cn(
                                    "absolute right-1.5 h-9 w-9 rounded-full transition-all",
                                    input.trim() ? "bg-primary text-primary-foreground hover:bg-primary/90" : "bg-transparent text-muted-foreground hover:bg-muted"
                                )}
                                disabled={!input.trim() || isLoading}
                            >
                                <Send className="w-4 h-4" />
                            </Button>
                        </form>
                        <div className="flex justify-center mt-2">
                             <p className="text-[10px] text-muted-foreground/60">
                                Powered by Zarga AI • Internal Tool
                            </p>
                        </div>
                    </div>
                </Card>
            )}

            {/* Toggle Button */}
            <Button
                onClick={() => setIsOpen(!isOpen)}
                size="icon"
                className={cn(
                    "h-14 w-14 rounded-full shadow-lg transition-all duration-500 hover:scale-105 pointer-events-auto",
                    isOpen 
                        ? "bg-background border border-border text-foreground rotate-90 shadow-xl" 
                        : "bg-primary text-primary-foreground hover:bg-primary/90"
                )}
            >
                {isOpen ? <ChevronDown className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
                {!isOpen && messages.length > 1 && ( // Assuming welcome message is 1
                    <span className="absolute -top-1 -right-1 flex h-4 w-4">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 border-white"></span>
                    </span>
                )}
            </Button>
        </div>
    )
}
