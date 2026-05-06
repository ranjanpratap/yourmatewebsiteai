import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    // TODO: Integrate with Resend or Loops.so
    // Example: await resend.emails.send({ ... })
    console.log(`New waitlist signup: ${email}`)

    return NextResponse.json({ success: true, message: "You're on the list!" })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
