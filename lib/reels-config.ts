export type Reel = {
  id: string
  url: string
  caption: string
  date: string
  thumbnail?: string  // optional: path like '/reels/reel-001.jpg' or any image URL
}

export const reels: Reel[] = [
  {
    id: 'reel-001',
    url: 'https://www.instagram.com/reel/DXbv8OuTuyE/',
    caption: 'Day 0 of building an AI app. Excited and terrified.',
    date: '2026-04-25',
  },
  {
    id: 'reel-002',
    url: 'https://www.instagram.com/reel/DXeRXWOzHqi/',
    caption: 'Day 1 of building AI apps — and we picked our idea: YourMate AI.',
    date: '2026-04-26',
  },
  {
    id: 'reel-003',
    url: 'https://www.instagram.com/reel/DXglx4fkQhI/',
    caption: 'Day 2 — why I\'m building an AI companion for loneliness and mental health.',
    date: '2026-04-27',
  },
  {
    id: 'reel-004',
    url: 'https://www.instagram.com/reel/DXjkHmGkSYC/',
    caption: 'Day 3 — initial structure and UI design are taking shape.',
    date: '2026-04-28',
  },
  {
    id: 'reel-005',
    url: 'https://www.instagram.com/reel/DXmPBrIEVVN/',
    caption: 'Day 4 — started coding the initial designs. Things are getting real.',
    date: '2026-04-29',
  },
  {
    id: 'reel-006',
    url: 'https://www.instagram.com/reel/DXoiHzqkRSy/',
    caption: 'Day 5, I have build the 1st version of the app with Login and onboarding screens',
    date: '2026-04-30',
  },
  {
    id: 'reel-007',
    url: 'https://www.instagram.com/reel/DXreldcjP0M/',
    caption: 'Day 6, Today I am working on Home Screen of the app',
    date: '2026-05-01',
  },
  {
    id: 'reel-008',
    url: 'https://www.instagram.com/reel/DXtyTirETZo/',
    caption: 'Day 7, Error in Chat page and we are solving it live.',
    date: '2026-05-02',
  },
  {
    id: 'reel-009',
    url: 'https://www.instagram.com/reel/DXwLm5sx7cK/',
    caption: 'Day 8, Chat assistant fixed and working properly.',
    date: '2026-05-03',
  },
  {
    id: 'reel-010',
    url: 'https://www.instagram.com/reel/DXzATvjxUjA/',
    caption: 'Day 9, Making our AI assistant more smarter and personalized.',
    date: '2026-05-04',
  },
  {
    id: 'reel-011',
    url: 'https://www.instagram.com/reel/DX1YIdIxApm/',
    caption: 'Day 10, We have decreased our Token size and AI cost',
    date: '2026-05-05',
  },
]
