
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

interface RewardsSummaryCardProps {
  totalPoints: number;
  totalBadges: number;
  level: number;
  levelProgress: number;
  nextLevelPoints: number;
}

const RewardsSummaryCard = ({ 
  totalPoints, 
  totalBadges, 
  level, 
  levelProgress,
  nextLevelPoints 
}: RewardsSummaryCardProps) => {
  return (
    <Card className="money-card mb-6 overflow-hidden bg-gradient-to-r from-money-coral/10 to-money-mint/10">
      <CardContent className="p-0">
        <div className="p-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold">Level {level}</h3>
              <p className="text-muted-foreground">Money Master</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold flex items-center">
                {totalPoints} <Star className="ml-1 h-5 w-5 fill-yellow-400 text-yellow-400" />
              </div>
              <p className="text-muted-foreground text-sm">{totalBadges} badges earned</p>
            </div>
          </div>
          
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-1">
              <span>Progress to Level {level + 1}</span>
              <span>{levelProgress}%</span>
            </div>
            <Progress value={levelProgress} className="h-2 bg-white/50" />
          </div>
        </div>
        
        <div className="bg-white/50 p-4 flex justify-between items-center">
          <div className="text-sm">
            Next reward at Level {level + 1} (need {nextLevelPoints - totalPoints} more points)
          </div>
          <Button size="sm" variant="outline">View all levels</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RewardsSummaryCard;
