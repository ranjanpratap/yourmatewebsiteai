import { NextResponse } from 'next/server'

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms))

async function fetchThumb(url: string, attempt = 0): Promise<string> {
  const res = await fetch(url, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
      'Accept': 'text/html,application/xhtml+xml,*/*',
      'Accept-Language': 'en-US,en;q=0.9',
      'Cache-Control': 'no-cache',
    },
    cache: 'no-store', // don't cache at the fetch level — we cache at response level
  })

  if (!res.ok) {
    if (attempt < 3) {
      await sleep(600 * (attempt + 1)) // 600ms, 1200ms, 1800ms
      return fetchThumb(url, attempt + 1)
    }
    throw new Error(`Instagram returned ${res.status}`)
  }

  const html = await res.text()

  const match =
    html.match(/<meta[^>]+property="og:image"[^>]+content="([^"]+)"/) ||
    html.match(/<meta[^>]+content="([^"]+)"[^>]+property="og:image"/)

  if (!match?.[1]) {
    if (attempt < 3) {
      await sleep(600 * (attempt + 1))
      return fetchThumb(url, attempt + 1)
    }
    throw new Error('og:image not found')
  }

  return match[1].replace(/&amp;/g, '&')
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const url = searchParams.get('url')
  if (!url) return NextResponse.json({ error: 'No URL' }, { status: 400 })

  try {
    const thumbnail = await fetchThumb(url)

    return NextResponse.json(
      { thumbnail },
      {
        headers: {
          'Cache-Control': 'public, max-age=86400, stale-while-revalidate=3600',
        },
      }
    )
  } catch (err) {
    console.error('[instagram-thumb]', err)
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
