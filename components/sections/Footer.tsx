import Wordmark from '@/components/ui/Wordmark'

function LinkedinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect width="4" height="12" x="2" y="9"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5">
      <div className="container-pad py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8 text-center sm:text-left">
          {/* Left */}
          <div className="flex flex-col items-center sm:items-start">
            <Wordmark size="md" className="mb-2" />
            <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>Your daily life partner.</p>
            <p className="eyebrow mt-4">© 2026 YourMate</p>
          </div>

          {/* Center */}
          <div className="flex flex-col gap-2 items-center sm:items-start md:items-center">
            {['Privacy', 'Terms', 'Contact'].map(link => (
              <a key={link} href="#"
                className="text-sm transition-colors hover:text-white"
                style={{ color: 'var(--text-secondary)' }}>
                {link}
              </a>
            ))}
          </div>

          {/* Right */}
          <div className="flex gap-3 justify-center sm:justify-start md:justify-end sm:col-span-2 md:col-span-1">
            <a href="https://www.linkedin.com/in/pratap-ranjan-2945271a5" target="_blank" rel="noopener noreferrer"
              className="glass w-10 h-10 flex items-center justify-center rounded-xl hover:border-white/20 transition-all"
              style={{ color: 'var(--text-secondary)' }}
              aria-label="LinkedIn">
              <LinkedinIcon />
            </a>
            <a href="https://www.instagram.com/pratapranjan.ai" target="_blank" rel="noopener noreferrer"
              className="glass w-10 h-10 flex items-center justify-center rounded-xl hover:border-white/20 transition-all"
              style={{ color: 'var(--text-secondary)' }}
              aria-label="Instagram">
              <InstagramIcon />
            </a>
          </div>
        </div>

        <div className="border-t border-white/5 pt-6 text-center">
          <p className="eyebrow">Crafted with ☕ in India. Launching 2026.</p>
        </div>
      </div>
    </footer>
  )
}
