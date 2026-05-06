import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()
    const apiKey = process.env.DEEPSEEK_API_KEY

    if (!apiKey || apiKey === 'your_deepseek_api_key_here') {
      return NextResponse.json(
        { error: 'API_KEY_NOT_CONFIGURED', message: 'Please add your DeepSeek API key to .env.local' },
        { status: 401 }
      )
    }

    const response = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { 
            role: 'system', 
            content: 'You are Maya, a friendly and supportive AI health companion for the YourMate app. You are encouraging, empathetic, and casual. Keep responses concise and human-like.' 
          },
          ...messages
        ],
        stream: false
      })
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      return NextResponse.json(
        { error: 'DEEPSEEK_API_ERROR', message: errorData.error?.message || 'Failed to fetch from DeepSeek' },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Chat API Error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
