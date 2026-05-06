export const FEATURE_STAGES = [
  {
    id: 1,
    label: '01 · COMPANION',
    screen: 'chat',
    title: 'A mate who texts you.',
    body: 'Real check-ins. Real encouragement. Real accountability. Pick the personality that gets you.',
  },
  {
    id: 2,
    label: '02 · FOOD AI',
    screen: 'meal',
    title: 'Photo → Calories. In 2 seconds.',
    body: 'Snap your plate. AI detects every item. No more 5-tap food entry. No more giving up by week 2.',
  },
  {
    id: 3,
    label: '03 · DASHBOARD',
    screen: 'home',
    title: 'Your day, at a glance.',
    body: 'Calories, steps, water, workout, protein — one beautiful screen.',
  },
  {
    id: 4,
    label: '04 · TRAIN',
    screen: 'workout',
    title: 'Your mate plans the session.',
    body: '6 exercises. ~55 min. Maya keeps you company.',
  },
  {
    id: 5,
    label: '05 · INSIGHTS',
    screen: 'stats',
    title: "Patterns you'd never spot.",
    body: 'Real correlations. Real shortcuts. Real progress.',
  },
]

export const CONVERSATION_TREE: Record<string, {
  maya: string
  chips: Array<{ label: string; next?: string }>
}> = {
  root: {
    maya: "Hey! I'm Maya — try a chip below or tell me anything 💛",
    chips: [
      { label: '🍱 I just had lunch', next: 'lunch' },
      { label: '😴 Skipping the gym', next: 'gym' },
      { label: '💔 Had a rough day', next: 'rough' },
      { label: '✨ Motivate me', next: 'motivate' },
    ],
  },
  lunch: {
    maya: "Yum! What did you have? Snap a pic and I'll log it for you 📸",
    chips: [
      { label: '📷 Send pic', next: 'meal_logged' },
      { label: 'Tell her', next: 'tell_lunch' },
      { label: 'Skip logging', next: 'skip' },
    ],
  },
  meal_logged: {
    maya: "Detected: rice, rajma, roti, salad. 615 kcal · 22g protein. Logged ✓",
    chips: [
      { label: '🎉 Nice!', next: 'root' },
      { label: 'Log another', next: 'root' },
    ],
  },
  tell_lunch: {
    maya: "Sounds delicious! I'll log that for you. You're doing great with meals today 🌟",
    chips: [{ label: 'Thanks!', next: 'root' }],
  },
  skip: {
    maya: "No worries! Just let me know next time 😊",
    chips: [{ label: 'Will do!', next: 'root' }],
  },
  gym: {
    maya: "Hey, no judgment 💛 But before you decide — how about just 15 min? I'll keep you company. Sometimes that's all it takes.",
    chips: [
      { label: 'Okay, 15 min', next: 'gym_yes' },
      { label: 'Tomorrow instead', next: 'gym_tomorrow' },
      { label: "I'm too tired", next: 'gym_tired' },
    ],
  },
  gym_yes: {
    maya: "Yes! That's the spirit 💪 Let's do a quick push session. You've got this!",
    chips: [{ label: "Let's go!", next: 'root' }],
  },
  gym_tomorrow: {
    maya: "That's okay. Rest is part of progress. Just don't let tomorrow become next week 😊",
    chips: [{ label: 'Promise!', next: 'root' }],
  },
  gym_tired: {
    maya: "Completely valid. Rest up. Your body is telling you something. Maybe a 10-min walk later? 🚶",
    chips: [{ label: 'Maybe', next: 'root' }],
  },
  rough: {
    maya: "I'm here. Want to talk, or just sit quietly with me for a minute? Both are okay.",
    chips: [
      { label: 'Just sit with me', next: 'sit' },
      { label: 'Tell her', next: 'tell_rough' },
      { label: "Tomorrow's a new day", next: 'tomorrow' },
    ],
  },
  sit: {
    maya: '...here with you 💛',
    chips: [{ label: 'Thanks', next: 'root' }],
  },
  tell_rough: {
    maya: "I'm listening. Take your time. You don't have to have it all figured out tonight.",
    chips: [{ label: 'Thank you 💛', next: 'root' }],
  },
  tomorrow: {
    maya: "It really is. And I'll be here in the morning 🌅",
    chips: [{ label: 'See you then', next: 'root' }],
  },
  motivate: {
    maya: "You showed up here. That's already step one. Day 7 of your streak — you're building something. Don't break the chain. 🔥",
    chips: [
      { label: "Let's go", next: 'lets_go' },
      { label: 'One more push', next: 'push' },
      { label: 'Thanks 💛', next: 'root' },
    ],
  },
  lets_go: {
    maya: "That's it. Channel that energy. One rep at a time. 💪",
    chips: [{ label: '🔥', next: 'root' }],
  },
  push: {
    maya: "Last rep is always the hardest and always the most important. Push through! 🏋️",
    chips: [{ label: 'Done!', next: 'root' }],
  },
}
