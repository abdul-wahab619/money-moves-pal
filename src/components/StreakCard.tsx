
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Award, Star, Trophy } from "lucide-react";
import { useState, useEffect } from "react";

const StreakCard = () => {
  const { toast } = useToast();
  const [streak, setStreak] = useState(7); // Days
  const [showCelebration, setShowCelebration] = useState(false);
  
  // Simulates a streak increment when component mounts
  useEffect(() => {
    const hasShownCelebration = localStorage.getItem("streakCelebration");
    
    if (!hasShownCelebration) {
      const timer = setTimeout(() => {
        setShowCelebration(true);
        setStreak(prev => prev + 1);
        toast({
          title: "New Streak Achievement! 🎉",
          description: "You're on an 8-day streak! Keep going!",
          duration: 5000,
        });
        localStorage.setItem("streakCelebration", "true");
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [toast]);
  
  return (
    <Card className="money-card bg-gradient-lavender mb-6 overflow-hidden relative">
      {showCelebration && (
        <div className="absolute inset-0 bg-white/20 animate-pulse-soft z-0"></div>
      )}
      <CardHeader className="relative z-10">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-lg font-medium">Your Money Streak</CardTitle>
            <CardDescription>Keep checking in daily!</CardDescription>
          </div>
          <Trophy className="h-6 w-6 text-amber-300 animate-bounce-small" />
        </div>
      </CardHeader>
      <CardContent className="relative z-10">
        <div className="flex justify-between items-center">
          <div className="text-center bg-white/30 rounded-full p-4 shadow-inner">
            <p className="text-4xl font-bold">{streak}</p>
            <p className="text-sm">days</p>
          </div>
          <div className="flex flex-col gap-2">
            <Badge className="bg-white/20 hover:bg-white/30 flex items-center gap-1">
              <Star className="h-3 w-3" /> 7-day streak 🔥
            </Badge>
            {streak >= 7 && (
              <Badge className="bg-white/20 hover:bg-white/30 animate-pulse-soft flex items-center gap-1">
                <Award className="h-3 w-3" /> Money Master 💰
              </Badge>
            )}
          </div>
        </div>
        <div className="flex justify-between mt-6">
          {[1, 2, 3, 4, 5, 6, 7].map((day) => (
            <div 
              key={day} 
              className={`w-9 h-9 rounded-full flex items-center justify-center shadow-sm transition-all duration-200 ${
                day <= streak ? "bg-white text-purple-700 scale-105" : "bg-white/20"
              } ${day === streak ? "ring-2 ring-white animate-pulse-soft" : ""}`}
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
