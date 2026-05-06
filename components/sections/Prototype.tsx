'use client'
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CONVERSATION_TREE } from '@/lib/constants'
import { easing } from '@/lib/animations'
import { Sparkles, Camera, Heart, Dumbbell, Send, RefreshCw } from 'lucide-react'

const FALLBACK_REPLIES = [
  "Hey, so great to hear from you! 🌟 I'm Maya — your future daily companion. On the app I can track your meals, cheer your workouts, and check in when life gets heavy. We're launching soon — join the waitlist and I'll be with you every day! 💛",
  "Love that you reached out! ✨ This is just a tiny taste of what I can do. On the real YourMate app, I'll remember your goals, notice your patterns, and show up exactly when you need me. Can't wait to be your mate for real! 🚀",
  "Aw, you talked to me! 🥹 I'm still warming up here on the website, but on the app? I'm a whole different level — meal logs, step counts, mood check-ins, gym reminders... basically your most attentive friend ever. Join the waitlist and let's do this together! 🔥",
  "Hey you! 👋 I wish I could chat properly right now, but my full brain lives in the app. There I can help with literally everything — food, fitness, feelings, focus. Drop your email on the waitlist and I'll personally ping you when we launch! 💪",
]

interface Message {
  id: string
  text: string
  from: 'maya' | 'user'
}

export default function Prototype() {
  const [nodeKey, setNodeKey] = useState('root')
  const [messages, setMessages] = useState<Message[]>([
    { id: '0', text: "Hey! I'm Maya — a tiny demo of YourMate. Try one of the chips below, or tell me anything.", from: 'maya' }
  ])
  const [inputValue, setInputValue] = useState('')
  const [typing, setTyping] = useState(false)
  const [typedText, setTypedText] = useState('')
  const [isTypingMaya, setIsTypingMaya] = useState(false)
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = (instant = false) => {
    const container = chatContainerRef.current
    if (container) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: instant ? 'auto' : 'smooth'
      })
    }
  }

  // Scroll on message updates
  useEffect(() => {
    scrollToBottom()
  }, [messages, isTypingMaya])

  // Scroll more frequently during typing to keep cursor in view
  useEffect(() => {
    if (typedText) scrollToBottom(true)
  }, [typedText])

  const processResponse = async (targetNode?: string, customText?: string) => {
    setTyping(true)
    setIsTypingMaya(true)

    let text = ''

    if (customText) {
      // Use the provided text (for the "DeepSeek integrated soon" placeholder if desired)
      text = customText
    } else if (targetNode) {
      // Use the local conversation tree for pre-defined chips
      text = CONVERSATION_TREE[targetNode].maya
      if (targetNode) setNodeKey(targetNode)
    } else {
      // Call real DeepSeek API for free-form text
      try {
        const history = messages.map(m => ({
          role: m.from === 'user' ? 'user' : 'assistant',
          content: m.text
        }))

        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: history })
        })

        const data = await res.json()
        if (res.ok && data.choices?.[0]?.message?.content) {
          text = data.choices[0].message.content
        } else {
          text = FALLBACK_REPLIES[Math.floor(Math.random() * FALLBACK_REPLIES.length)]
        }
      } catch (error) {
        text = FALLBACK_REPLIES[Math.floor(Math.random() * FALLBACK_REPLIES.length)]
      }
    }

    setIsTypingMaya(false)
    let i = 0
    setTypedText('')
    const interval = setInterval(() => {
      i++
      setTypedText(text.slice(0, i))
      if (i >= text.length) {
        clearInterval(interval)
        setTyping(false)
        setMessages(m => [...m, { id: Date.now().toString(), text, from: 'maya' }])
        setTypedText('')
      }
    }, 20)
  }

  const handleChip = (chipLabel: string, next?: string) => {
    if (typing) return
    const userMsg: Message = { id: Date.now().toString(), text: chipLabel, from: 'user' }
    setMessages(m => [...m, userMsg])
    processResponse(next)
  }

  const handleSend = () => {
    if (!inputValue.trim() || typing) return
    const userMsg: Message = { id: Date.now().toString(), text: inputValue, from: 'user' }
    setMessages(m => [...m, userMsg])
    const currentInput = inputValue
    setInputValue('')
    processResponse(undefined) // This will trigger the AI call
  }

  const reset = () => {
    setNodeKey('root')
    setMessages([{ id: '0', text: "Hey! I'm Maya — a tiny demo of YourMate. Try one of the chips below, or tell me anything.", from: 'maya' }])
    setTyping(false)
    setTypedText('')
    setIsTypingMaya(false)
  }

  const currentChips = CONVERSATION_TREE[nodeKey]?.chips || []

  // Map icons to labels
  const getIcon = (label: string) => {
    if (label.toLowerCase().includes('lunch')) return <Camera size={14} className="opacity-60" />
    if (label.toLowerCase().includes('gym')) return <Dumbbell size={14} className="opacity-60" />
    if (label.toLowerCase().includes('rough') || label.toLowerCase().includes('off')) return <Heart size={14} className="opacity-60" />
    if (label.toLowerCase().includes('motivate')) return <Sparkles size={14} className="opacity-60" />
    return <Sparkles size={14} className="opacity-60" />
  }

  return (
    <section id="demo" className="relative section-pad bg-black">
      <div className="container-pad">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p 
            className="eyebrow !text-white/40 mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            LIVE PROTOTYPE
          </motion.p>
          <motion.h2
            className="font-bold mb-6"
            style={{ 
              fontSize: 'clamp(40px, 6vw, 72px)', 
              fontWeight: 800, 
              letterSpacing: '-0.03em',
              color: '#fefefe'
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: easing }}
          >
            Talk to <span className="brand-gradient-text">Maya.</span>
          </motion.h2>
          <p className="text-lg text-white/40 max-w-xl mx-auto font-light leading-relaxed">
            A lightweight taste of the real thing. Mocked, local, and friendly.
          </p>
        </div>

        {/* Glassmorphism Chat Interface */}
        <motion.div
          className="max-w-4xl mx-auto relative group"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: easing }}
        >
          {/* Background Decorative Glows */}
          <div className="absolute -inset-4 bg-gradient-to-tr from-purple-500/10 via-transparent to-orange-500/10 blur-[100px] opacity-50 group-hover:opacity-80 transition-opacity duration-1000" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-500/5 blur-[100px] rounded-full" />
          
          <div
            className="relative rounded-[24px] sm:rounded-[32px] overflow-hidden border border-white/10 glass shadow-2xl"
            style={{
              background: 'rgba(13, 8, 20, 0.4)',
              backdropFilter: 'blur(32px) saturate(150%)',
              WebkitBackdropFilter: 'blur(32px) saturate(150%)',
              height: 'clamp(520px, 80vh, 650px)',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {/* Header Row */}
            <div className="flex items-center justify-between px-4 sm:px-8 py-4 sm:py-6 border-b border-white/5 bg-white/[0.02] flex-shrink-0">
              <div className="flex items-center gap-4">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center relative shadow-lg"
                  style={{ background: 'linear-gradient(135deg, #A855F7, #EC4899)' }}
                >
                  <Sparkles size={20} color="#fefefe" />
                  <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-[3px] border-[#0D0814]" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-[#fefefe] leading-none mb-1">Maya</h4>
                  <p className="text-sm text-white/30 font-medium">Your Mate • Demo mode</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="eyebrow !text-white/20 !text-[10px] hidden sm:block">MOCKED RESPONSES</span>
                <button 
                  onClick={reset}
                  className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all shadow-inner"
                  title="Reset Conversation"
                >
                  <RefreshCw size={16} className="text-white/40" />
                </button>
              </div>
            </div>

            {/* Chat Content area */}
            <div
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto px-4 sm:px-8 py-6 sm:py-10 flex flex-col gap-4 sm:gap-6 custom-scrollbar"
            >
              <AnimatePresence initial={false}>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 12, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] sm:max-w-[75%] px-4 sm:px-6 py-3 sm:py-3.5 rounded-[18px] sm:rounded-[22px] leading-relaxed text-sm sm:text-base shadow-sm ${
                        msg.from === 'user' 
                          ? 'text-[#fefefe] font-medium' 
                          : 'bg-white/[0.04] border border-white/10 text-[#fefefe]/90 backdrop-blur-md'
                      }`}
                      style={{
                        background: msg.from === 'user' 
                          ? 'linear-gradient(to right, #FF8B3C, #CC66FF)' 
                          : undefined
                      }}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {isTypingMaya && (
                <div className="flex justify-start">
                  <div className="bg-white/[0.04] border border-white/10 px-6 py-4 rounded-[22px] flex gap-1.5 items-center backdrop-blur-md">
                    {[0,1,2].map(i => (
                      <motion.div 
                        key={i} 
                        className="w-1.5 h-1.5 bg-white/30 rounded-full"
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }} 
                      />
                    ))}
                  </div>
                </div>
              )}

              {typedText && (
                <div className="flex justify-start">
                  <div className="bg-white/[0.04] border border-white/10 px-6 py-4 rounded-[22px] leading-relaxed text-base text-[#fefefe]/90 backdrop-blur-md">
                    {typedText}<span className="inline-block w-1.5 h-4 bg-orange-500 ml-1 animate-pulse align-middle" />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} className="h-4" />
            </div>

            {/* Footer Interaction Area */}
            <div className="px-4 sm:px-8 pb-4 sm:pb-8 bg-gradient-to-t from-white/[0.02] to-transparent">
              {/* Suggestion Chips */}
              <div className="min-h-[44px] flex flex-wrap gap-2.5 mb-6">
                <AnimatePresence mode="popLayout">
                  {currentChips.map((chip) => (
                    <motion.button
                      key={chip.label}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      onClick={() => handleChip(chip.label, chip.next)}
                      disabled={typing}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-white/60 hover:text-[#fefefe] hover:bg-white/10 hover:border-white/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed backdrop-blur-sm"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {getIcon(chip.label)}
                      {chip.label}
                    </motion.button>
                  ))}
                </AnimatePresence>
              </div>

              {/* Message Input Box */}
              <div className="relative group/input">
                <input 
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Message Maya..."
                  disabled={typing}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-base text-[#fefefe] placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-all group-hover/input:bg-white/[0.08] backdrop-blur-md shadow-inner disabled:opacity-50"
                />
                <button 
                  onClick={handleSend}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 rounded-xl flex items-center justify-center transition-all bg-gradient-to-br from-orange-500 to-pink-500 hover:scale-105 active:scale-95 shadow-lg disabled:opacity-50 disabled:scale-100"
                  disabled={typing || !inputValue.trim()}
                >
                  <Send size={18} color="#fefefe" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(254, 254, 254, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(254, 254, 254, 0.1);
        }
      `}</style>
    </section>
  )
}

