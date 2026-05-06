import { cn } from '@/lib/utils'

interface WordmarkProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizeMap = {
  sm: 'text-lg font-bold',
  md: 'text-2xl font-bold',
  lg: 'text-3xl font-bold',
}

export default function Wordmark({ size = 'md', className }: WordmarkProps) {
  return (
    <span className={cn('tracking-tight', sizeMap[size], className)}>
      Your<span className="brand-gradient-text">Mate</span>
    </span>
  )
}
