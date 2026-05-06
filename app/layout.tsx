import type { Metadata } from 'next'
import { Poppins, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import CursorGlow from '@/components/ui/CursorGlow'
import NoiseOverlay from '@/components/ui/NoiseOverlay'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins-var',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains-var',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'YourMate — Your daily life partner',
  description: 'An AI daily-life companion that logs meals, nudges you to the gym, checks in on bad days, and tracks calories, steps, water, and protein automatically. Launching 2026.',
  keywords: ['AI companion', 'health tracker', 'fitness app', 'daily life partner'],
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    title: 'YourMate — Your daily life partner',
    description: 'Your AI daily-life companion. Launching 2026.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-[#0A0410] text-white overflow-x-hidden">
        <NoiseOverlay />
        <CursorGlow />
        {children}
      </body>
    </html>
  )
}
