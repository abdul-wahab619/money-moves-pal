
import { Achievement } from "@/components/rewards/AchievementCard";
import { Reward } from "@/components/rewards/RewardCard";

export const achievements: Achievement[] = [
  {
    id: 1,
    name: "Budget Master",
    description: "Complete your first monthly budget",
    points: 50,
    completed: true,
    icon: "📊"
  },
  {
    id: 2,
    name: "Streak Champion",
    description: "Maintain a 7-day login streak",
    points: 100,
    completed: true,
    icon: "🔥"
  },
  {
    id: 3,
    name: "Goal Setter",
    description: "Create 3 savings goals",
    points: 75,
    completed: false,
    progress: 67,
    icon: "🎯"
  },
  {
    id: 4,
    name: "Money Mindful",
    description: "Complete 5 daily challenges",
    points: 125,
    completed: false,
    progress: 40,
    icon: "🧠"
  },
  {
    id: 5,
    name: "Financial Guru",
    description: "Read 10 financial tips",
    points: 100,
    completed: false,
    progress: 30,
    icon: "📚"
  }
];

export const redeemOptions: Reward[] = [
  {
    id: 1,
    name: "$5 Starbucks Gift Card",
    points: 500,
    icon: "☕"
  },
  {
    id: 2,
    name: "$10 Amazon Gift Card",
    points: 1000,
    icon: "🛒"
  },
  {
    id: 3,
    name: "Spotify Premium (1 month)",
    points: 750,
    icon: "🎵"
  },
  {
    id: 4,
    name: "Custom Money Moves Avatar",
    points: 300,
    icon: "👤"
  }
];

export const calculateRewardsStats = (completedAchievements: Achievement[]) => {
  const totalPoints = 150; // Current user points
  const totalBadges = completedAchievements.length;
  const level = Math.floor(totalPoints / 100) + 1;
  const nextLevelPoints = level * 100;
  const levelProgress = (totalPoints % 100);

  return {
    totalPoints,
    totalBadges,
    level,
    nextLevelPoints,
    levelProgress
  };
};
