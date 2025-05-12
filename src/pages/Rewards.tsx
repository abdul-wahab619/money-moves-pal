
import Header from "@/components/Header";
import NavBar from "@/components/NavBar";
import { BadgeDollarSign } from "lucide-react";
import RewardsSummaryCard from "@/components/rewards/RewardsSummaryCard";
import AchievementsSection from "@/components/rewards/AchievementsSection";
import RewardsSection from "@/components/rewards/RewardsSection";
import { achievements, redeemOptions, calculateRewardsStats } from "@/data/rewardsData";

const Rewards = () => {
  const completedAchievements = achievements.filter(r => r.completed);
  const { totalPoints, totalBadges, level, nextLevelPoints, levelProgress } = calculateRewardsStats(completedAchievements);
  
  return (
    <div className="min-h-screen bg-background pb-20 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="fixed top-20 right-10 w-40 h-40 bg-money-coral opacity-5 rounded-full blur-3xl"></div>
      <div className="fixed bottom-40 left-10 w-60 h-60 bg-money-mint opacity-5 rounded-full blur-3xl"></div>
      
      <div className="container max-w-4xl mx-auto px-4 py-6">
        <Header />
        
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold flex items-center">
              <BadgeDollarSign className="mr-2 h-6 w-6" />
              Rewards Center
            </h2>
            <p className="text-muted-foreground">
              Earn points by managing your money wisely
            </p>
          </div>
        </div>
        
        <RewardsSummaryCard 
          totalPoints={totalPoints}
          totalBadges={totalBadges}
          level={level}
          levelProgress={levelProgress}
          nextLevelPoints={nextLevelPoints}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AchievementsSection achievements={achievements} />
          <RewardsSection rewards={redeemOptions} totalPoints={totalPoints} />
        </div>
      </div>
      
      <NavBar />
    </div>
  );
};

export default Rewards;
