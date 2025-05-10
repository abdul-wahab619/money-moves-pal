
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const StreakCard = () => {
  const streak = 7; // Days
  
  return (
    <Card className="money-card bg-gradient-lavender mb-6">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Your Money Streak</CardTitle>
        <CardDescription>Keep checking in daily!</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <div className="text-center">
            <p className="text-4xl font-bold">{streak}</p>
            <p className="text-sm">days</p>
          </div>
          <div className="flex flex-col gap-2">
            <Badge className="bg-white/20 hover:bg-white/30">7-day streak 🔥</Badge>
            {streak >= 7 && (
              <Badge className="bg-white/20 hover:bg-white/30 animate-pulse-soft">Money Master 💰</Badge>
            )}
          </div>
        </div>
        <div className="flex justify-between mt-6">
          {[1, 2, 3, 4, 5, 6, 7].map((day) => (
            <div 
              key={day} 
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                day <= streak ? "bg-white text-purple-700" : "bg-white/20"
              }`}
            >
              {day}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default StreakCard;
