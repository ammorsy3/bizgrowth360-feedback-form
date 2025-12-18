import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

export function calculateProgress(currentSection, totalSections) {
  return Math.round((currentSection / totalSections) * 100)
}

export function getProgressMessage(percentage) {
  if (percentage < 20) return "Great start! Let's keep going 🚀"
  if (percentage < 40) return "You're making progress! 💪"
  if (percentage < 60) return "Halfway there! You're doing great 🌟"
  if (percentage < 80) return "You're crushing it! Keep it up 🎉"
  if (percentage < 100) return "Almost done! Just one more push 🏁"
  return "Complete! Amazing work 🎊"
}

export function getEstimatedTimeRemaining(currentSection, totalSections) {
  const totalMinutes = 8
  const minutesPerSection = totalMinutes / totalSections
  const remainingSections = totalSections - currentSection
  const remainingMinutes = Math.ceil(remainingSections * minutesPerSection)
  
  if (remainingMinutes <= 0) return "Almost there!"
  if (remainingMinutes === 1) return "~1 minute left"
  return `~${remainingMinutes} minutes left`
}
