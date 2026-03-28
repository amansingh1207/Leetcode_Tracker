export const DIFFICULTY_COLORS = {
  easy: 'hsl(142, 76%, 36%)',
  medium: 'hsl(38, 92%, 50%)',
  hard: 'hsl(0, 84%, 60%)',
} as const;

export const BADGE_TYPES = {
  streak_master: {
    title: '🧐 Streak Master',
    description: '7-day streak of 5+ daily problems',
    icon: 'fas fa-fire',
    gradient: 'from-orange-400 to-red-500',
    emoji: '🧐'
  },
  century_coder: {
    title: '💯 Century Coder',
    description: '100+ total problems solved',
    icon: 'fas fa-code',
    gradient: 'from-green-400 to-emerald-500',
    emoji: '💯'
  },
  comeback_coder: {
    title: '🔥 Comeback Coder',
    description: 'Big week-over-week improvement',
    icon: 'fas fa-chart-line',
    gradient: 'from-purple-400 to-pink-500',
    emoji: '🔥'
  },
  weekly_topper: {
    title: '🏆 Weekly Topper',
    description: 'Top performer this week',
    icon: 'fas fa-trophy',
    gradient: 'from-yellow-400 to-orange-500',
    emoji: '🏆'
  },
  consistency_champ: {
    title: '🧱 Consistency Champ',
    description: 'Completed 30-day challenge',
    icon: 'fas fa-calendar-check',
    gradient: 'from-blue-400 to-indigo-500',
    emoji: '🧱'
  },
  speed_demon: {
    title: '⚡ Speed Demon',
    description: '50+ problems solved this week',
    icon: 'fas fa-bolt',
    gradient: 'from-yellow-500 to-red-500',
    emoji: '⚡'
  },
  problem_hunter: {
    title: '🎯 Problem Hunter',
    description: '200+ total problems solved',
    icon: 'fas fa-crosshairs',
    gradient: 'from-teal-400 to-cyan-500',
    emoji: '🎯'
  },
  night_owl: {
    title: '🦉 Night Owl',
    description: 'Coding streak after midnight',
    icon: 'fas fa-moon',
    gradient: 'from-purple-600 to-indigo-600',
    emoji: '🦉'
  },
  early_bird: {
    title: '🐦 Early Bird',
    description: 'Morning coding sessions',
    icon: 'fas fa-sun',
    gradient: 'from-yellow-300 to-orange-400',
    emoji: '🐦'
  },
  hard_mode: {
    title: '🔥 Hard Mode',
    description: '25+ hard problems solved',
    icon: 'fas fa-skull',
    gradient: 'from-red-500 to-purple-600',
    emoji: '🔥'
  },
  perfectionist: {
    title: '💎 Perfectionist',
    description: '95%+ submission acceptance rate',
    icon: 'fas fa-gem',
    gradient: 'from-pink-400 to-purple-500',
    emoji: '💎'
  },
  marathon_runner: {
    title: '🏃 Marathon Runner',
    description: '14-day consecutive streak',
    icon: 'fas fa-running',
    gradient: 'from-green-500 to-teal-500',
    emoji: '🏃'
  },
  algorithm_ace: {
    title: '🧮 Algorithm Ace',
    description: '100+ medium problems solved',
    icon: 'fas fa-calculator',
    gradient: 'from-blue-500 to-purple-600',
    emoji: '🧮'
  },
  data_structures_master: {
    title: '🏗️ Data Structures Master',
    description: 'Mastered all data structure categories',
    icon: 'fas fa-building',
    gradient: 'from-gray-400 to-blue-500',
    emoji: '🏗️'
  },
  weekly_warrior: {
    title: '⚔️ Weekly Warrior',
    description: 'Top 3 performer of the week',
    icon: 'fas fa-sword',
    gradient: 'from-orange-400 to-red-600',
    emoji: '⚔️'
  },
  rising_star: {
    title: '⭐ Rising Star',
    description: '50% improvement in one week',
    icon: 'fas fa-star',
    gradient: 'from-yellow-400 to-pink-500',
    emoji: '⭐'
  }
} as const;

export const STATUS_COLORS = {
  'Excellent': 'bg-green-100 text-green-800',
  'Good': 'bg-emerald-100 text-emerald-800',
  'Active': 'bg-blue-100 text-blue-800',
  'Underperforming': 'bg-red-100 text-red-800'
} as const;
