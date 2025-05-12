
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export interface Reward {
  id: number;
  name: string;
  points: number;
  icon: string;
}

interface RewardCardProps {
  reward: Reward;
  totalPoints: number;
}

const RewardCard = ({ reward, totalPoints }: RewardCardProps) => {
  const { toast } = useToast();

  const handleRedeemReward = () => {
    toast({
      title: "Insufficient points",
      description: "Keep saving money to earn more points!",
      duration: 3000,
    });
  };

  return (
    <Card key={reward.id} className="money-card">
      <CardContent className="p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="text-3xl">{reward.icon}</div>
            <h4 className="font-medium">{reward.name}</h4>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-sm font-semibold">
              {reward.points} <Star className="inline-block h-3 w-3 fill-yellow-400 text-yellow-400" />
            </div>
            <Button 
              size="sm" 
              variant={totalPoints >= reward.points ? "default" : "outline"}
              onClick={() => handleRedeemReward()}
              disabled={totalPoints < reward.points}
            >
              Redeem
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RewardCard;
