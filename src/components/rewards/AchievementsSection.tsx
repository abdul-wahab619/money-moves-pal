
import { Star } from "lucide-react";
import AchievementCard, { Achievement } from "./AchievementCard";

interface AchievementsSectionProps {
  achievements: Achievement[];
}

const AchievementsSection = ({ achievements }: AchievementsSectionProps) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-3 flex items-center">
        <Star className="mr-2 h-5 w-5" />
        Achievements
      </h3>
      
      <div className="space-y-4">
        {achievements.map((achievement) => (
          <AchievementCard key={achievement.id} achievement={achievement} />
        ))}
      </div>
    </div>
  );
};

export default AchievementsSection;
