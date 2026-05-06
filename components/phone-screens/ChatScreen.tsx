'use client'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

interface Message {
  id: string
  text: string
  from: 'maya' | 'user'
  time: string
}

const initialMessages: Message[] = [
  { id: '1', text: "Hey Pratap! How's your day going? 🌟", from: 'maya', time: '2:14 PM' },
  { id: '2', text: 'Pretty good! Just got back from work', from: 'user', time: '2:15 PM' },
]

export default function ChatScreen() {
  const [messages, setMessages] = useState(initialMessages)
  const [typing, setTyping] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => {
      setTyping(true)
      setTimeout(() => {
        setTyping(false)
        setMessages(m => [...m, {
          id: '3',
          text: 'Nice! Did you manage to drink enough water today? 💧',
          from: 'maya',
          time: '2:15 PM'
        }])
      }, 1500)
    }, 1000)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="w-full h-full flex flex-col overflow-hidden"
      style={{ background: '#0A0410', paddingTop: 44 }}>
      {/* Header */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-white/5">
        <div className="relative">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
            style={{ background: 'var(--cta-gradient)' }}>P</div>
          <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-400 rounded-full border border-black" />
        </div>
        <div>
          <p className="text-xs font-semibold">Maya</p>
          <p className="text-[9px]" style={{ color: 'var(--text-tertiary)' }}>Your mate • online</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto flex flex-col gap-2 p-3">
        {messages.map((msg, i) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15 }}
            className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className="max-w-[80%] px-3 py-2 rounded-2xl text-[11px] leading-relaxed"
              style={{
                background: msg.from === 'user' ? 'rgba(255,139,60,0.25)' : 'var(--glass-bg)',
                border: '1px solid',
                borderColor: msg.from === 'user' ? 'rgba(255,139,60,0.3)' : 'var(--glass-border)',
              }}
            >
              {msg.text}
            </div>
          </motion.div>
        ))}

        {typing && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
            <div className="glass px-3 py-2 rounded-2xl flex gap-1">
              {[0,1,2].map(i => (
                <motion.div key={i} className="w-1.5 h-1.5 bg-white/50 rounded-full"
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }} />
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Input */}
      <div className="flex items-center gap-2 p-2 border-t border-white/5">
        <div className="flex-1 glass rounded-full px-3 py-1.5 text-[10px]" style={{ color: 'var(--text-tertiary)' }}>
          Message Maya...
        </div>
        <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: 'var(--cta-gradient)' }}>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M1 9L9 5L1 1V4.5L6 5L1 5.5V9Z" fill="white" />
          </svg>
        </div>
      </div>
    </div>
  )
}
