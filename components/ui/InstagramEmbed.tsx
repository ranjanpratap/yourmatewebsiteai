'use client'

interface Props {
  url: string
}

export default function InstagramEmbed({ url }: Props) {
  // Extract the shortcode from the URL
  const shortcode = (() => {
    try {
      const parts = url.split('/').filter(Boolean)
      const reelIndex = parts.indexOf('reel')
      if (reelIndex !== -1 && parts[reelIndex + 1]) {
        return parts[reelIndex + 1].split('?')[0]
      }
      return null
    } catch (e) {
      return null
    }
  })()

  if (!shortcode) return <div className="w-full h-full bg-white/5 animate-pulse" />

  const embedUrl = `https://www.instagram.com/reel/${shortcode}/embed/`

  return (
    <div className="w-full h-full relative overflow-hidden bg-black">
      <iframe
        key={shortcode}
        src={embedUrl}
        className="w-full h-full border-0 absolute inset-0"
        allowTransparency={true}
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        scrolling="no"
        style={{
          colorScheme: 'dark',
        }}
      />
    </div>
  )
}
