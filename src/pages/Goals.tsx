
import Header from "@/components/Header";
import NavBar from "@/components/NavBar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Flag, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const Goals = () => {
  const { toast } = useToast();
  const [goalName, setGoalName] = useState("");
  const [goalAmount, setGoalAmount] = useState("");
  const [goalDate, setGoalDate] = useState("");
  const [open, setOpen] = useState(false);
  
  const [goals, setGoals] = useState([
    {
      id: 1,
      name: "Emergency Fund",
      target: 3000,
      current: 1200,
      deadline: "2025-08-30",
      icon: "🛟"
    },
    {
      id: 2,
      name: "New Laptop",
      target: 1200,
      current: 600,
      deadline: "2025-12-15",
      icon: "💻"
    },
    {
      id: 3,
      name: "Summer Vacation",
      target: 2000,
      current: 850,
      deadline: "2025-06-01",
      icon: "🏝️"
    }
  ]);

  const handleAddGoal = () => {
    // Validation
    if (!goalName || !goalAmount || !goalDate) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields",
        duration: 3000
      });
      return;
    }

    const amount = Number(goalAmount);
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount",
        duration: 3000
      });
      return;
    }

    // Create new goal
    const newGoal = {
      id: Date.now(),
      name: goalName,
      target: amount,
      current: 0,
      deadline: goalDate,
      icon: "🎯" // Default icon
    };

    setGoals([...goals, newGoal]);
    toast({
      title: "Goal created!",
      description: "You're on your way to financial freedom 🚀",
      duration: 3000
    });

    // Reset form
    setGoalName("");
    setGoalAmount("");
    setGoalDate("");
    setOpen(false);
  };

  const handleDeleteGoal = (id: number) => {
    setGoals(goals.filter(goal => goal.id !== id));
    toast({
      title: "Goal removed",
      description: "Goal has been deleted",
      duration: 2000
    });
  };

  const handleContribute = (id: number, amount: number) => {
    setGoals(goals.map(goal => {
      if (goal.id === id) {
        const newAmount = goal.current + amount;
        return {
          ...goal,
          current: newAmount > goal.target ? goal.target : newAmount
        };
      }
      return goal;
    }));

    toast({
      title: "Contribution added!",
      description: `$${amount} added to your goal`,
      duration: 3000
    });
  };

  return (
    <div className="min-h-screen bg-background pb-20 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="fixed top-20 right-10 w-40 h-40 bg-money-blue opacity-5 rounded-full blur-3xl"></div>
      <div className="fixed bottom-40 left-10 w-60 h-60 bg-money-mint opacity-5 rounded-full blur-3xl"></div>
      
      <div className="container max-w-4xl mx-auto px-4 py-6">
        <Header />
        
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold flex items-center">
              <Flag className="mr-2 h-6 w-6" />
              Savings Goals
            </h2>
            <p className="text-muted-foreground">
              Track your progress toward what matters to you
            </p>
          </div>
          
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="rounded-full">
                <Plus className="mr-2" size={18} />
                New Goal
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create a new savings goal</DialogTitle>
                <DialogDescription>
                  Set a target to save for something special!
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="goalName">Goal name</Label>
                  <Input 
                    id="goalName" 
                    value={goalName} 
                    onChange={(e) => setGoalName(e.target.value)}
                    placeholder="Vacation, new phone, etc."
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="goalAmount">Target amount ($)</Label>
                  <Input 
                    id="goalAmount"
                    type="number"
                    value={goalAmount}
                    onChange={(e) => setGoalAmount(e.target.value)}
                    placeholder="1000"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="goalDate">Target date</Label>
                  <Input 
                    id="goalDate"
                    type="date"
                    value={goalDate}
                    onChange={(e) => setGoalDate(e.target.value)}
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                <Button onClick={handleAddGoal}>Create Goal</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="space-y-6">
          {goals.map((goal) => {
            const progress = Math.round((goal.current / goal.target) * 100);
            const deadline = new Date(goal.deadline);
            const today = new Date();
            const daysLeft = Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
            
            return (
              <Card key={goal.id} className="money-card overflow-hidden">
                <div className="flex justify-between items-start p-6">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{goal.icon}</div>
                    <div>
                      <h3 className="font-semibold text-lg">{goal.name}</h3>
                      <p className="text-muted-foreground">
                        {daysLeft > 0 ? `${daysLeft} days left` : "Past due"}
                      </p>
                    </div>
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleDeleteGoal(goal.id)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
                
                <div className="px-6 pb-2">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">${goal.current}</span>
                    <span className="font-medium">${goal.target}</span>
                  </div>
                  <Progress 
                    value={progress} 
                    className={`h-2 ${progress < 50 ? 'bg-money-coral' : 'bg-money-mint'}`}
                  />
                  <p className="text-xs text-right mt-1 text-muted-foreground">{progress}% complete</p>
                </div>
                
                <div className="px-6 pb-6 mt-4 flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleContribute(goal.id, 10)}
                  >
                    +$10
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleContribute(goal.id, 50)}
                  >
                    +$50
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleContribute(goal.id, 100)}
                  >
                    +$100
                  </Button>
                </div>
              </Card>
            );
          })}
          
          {goals.length === 0 && (
            <Card className="money-card p-12 text-center">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="font-semibold text-lg mb-2">No goals yet</h3>
              <p className="text-muted-foreground mb-6">
                Set your first savings goal to start tracking your progress
              </p>
              <Button 
                onClick={() => setOpen(true)}
                className="animate-pulse"
              >
                <Plus className="mr-2" size={18} />
                Create a goal
              </Button>
            </Card>
          )}
        </div>
      </div>
      
      <NavBar />
    </div>
  );
};

export default Goals;
