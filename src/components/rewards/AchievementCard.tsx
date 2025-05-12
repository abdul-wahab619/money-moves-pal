
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export interface Achievement {
  id: number;
  name: string;
  description: string;
  points: number;
  completed: boolean;
  progress?: number;
  icon: string;
}

interface AchievementCardProps {
  achievement: Achievement;
}

const AchievementCard = ({ achievement }: AchievementCardProps) => {
  return (
    <Card key={achievement.id} className={`money-card border ${achievement.completed ? 'border-money-mint/50' : 'border-border'}`}>
      <CardContent className="p-4">
        <div className="flex gap-3">
          <div className="text-3xl">{achievement.icon}</div>
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <h4 className="font-medium">{achievement.name}</h4>
              <div className="flex items-center">
                <span className="text-sm font-medium">{achievement.points}</span>
                <Star className="ml-1 h-3 w-3 fill-yellow-400 text-yellow-400" />
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground">{achievement.description}</p>
            
            {!achievement.completed && achievement.progress !== undefined && (
              <div className="mt-2">
                <Progress value={achievement.progress} className="h-1.5" />
                <p className="text-xs text-right mt-0.5 text-muted-foreground">{achievement.progress}%</p>
              </div>
            )}
            
            {achievement.completed && (
              <div className="mt-1 bg-money-mint/20 text-money-mint rounded-full px-2 py-0.5 text-xs w-fit">
                Completed
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AchievementCard;
