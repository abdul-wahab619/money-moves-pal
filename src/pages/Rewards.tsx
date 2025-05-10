
import Header from "@/components/Header";
import NavBar from "@/components/NavBar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BadgeDollarSign, Gift, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Rewards = () => {
  const { toast } = useToast();
  
  const rewards = [
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
  
  const redeemOptions = [
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
  
  const handleRedeemReward = (reward: any) => {
    toast({
      title: "Insufficient points",
      description: "Keep saving money to earn more points!",
      duration: 3000,
    });
  };
  
  const totalPoints = 150; // Current user points
  const totalBadges = rewards.filter(r => r.completed).length;
  const level = Math.floor(totalPoints / 100) + 1;
  const nextLevelPoints = level * 100;
  const levelProgress = (totalPoints % 100);
  
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <Star className="mr-2 h-5 w-5" />
              Achievements
            </h3>
            
            <div className="space-y-4">
              {rewards.map((badge) => (
                <Card key={badge.id} className={`money-card border ${badge.completed ? 'border-money-mint/50' : 'border-border'}`}>
                  <CardContent className="p-4">
                    <div className="flex gap-3">
                      <div className="text-3xl">{badge.icon}</div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium">{badge.name}</h4>
                          <div className="flex items-center">
                            <span className="text-sm font-medium">{badge.points}</span>
                            <Star className="ml-1 h-3 w-3 fill-yellow-400 text-yellow-400" />
                          </div>
                        </div>
                        
                        <p className="text-sm text-muted-foreground">{badge.description}</p>
                        
                        {!badge.completed && badge.progress !== undefined && (
                          <div className="mt-2">
                            <Progress value={badge.progress} className="h-1.5" />
                            <p className="text-xs text-right mt-0.5 text-muted-foreground">{badge.progress}%</p>
                          </div>
                        )}
                        
                        {badge.completed && (
                          <div className="mt-1 bg-money-mint/20 text-money-mint rounded-full px-2 py-0.5 text-xs w-fit">
                            Completed
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <Gift className="mr-2 h-5 w-5" />
              Redeem Rewards
            </h3>
            
            <div className="space-y-4">
              {redeemOptions.map((reward) => (
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
                          onClick={() => handleRedeemReward(reward)}
                          disabled={totalPoints < reward.points}
                        >
                          Redeem
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
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
        </div>
      </div>
      
      <NavBar />
    </div>
  );
};

export default Rewards;
