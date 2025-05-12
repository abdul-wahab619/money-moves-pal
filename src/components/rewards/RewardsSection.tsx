
import { Gift } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import RewardCard, { Reward } from "./RewardCard";

interface RewardsSectionProps {
  rewards: Reward[];
  totalPoints: number;
}

const RewardsSection = ({ rewards, totalPoints }: RewardsSectionProps) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-3 flex items-center">
        <Gift className="mr-2 h-5 w-5" />
        Redeem Rewards
      </h3>
      
      <div className="space-y-4">
        {rewards.map((reward) => (
          <RewardCard 
            key={reward.id} 
            reward={reward} 
            totalPoints={totalPoints} 
          />
        ))}
        
        <Card className="money-card bg-gradient-to-r from-money-mint/20 to-blue-50 border-dashed">
          <CardContent className="p-6 text-center">
            <div className="text-4xl mb-2">🎁</div>
            <h4 className="font-medium mb-1">More rewards coming soon!</h4>
            <p className="text-sm text-muted-foreground">
              Keep saving and budgeting to earn more points
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RewardsSection;
