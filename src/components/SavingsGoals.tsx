
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const SavingsGoals = () => {
  const goals = [
    {
      name: "Vacation Fund 🏝️",
      saved: 850,
      target: 1500,
      deadline: "Aug 2025",
      color: "bg-money-blue"
    },
    {
      name: "New Laptop 💻",
      saved: 600,
      target: 1200,
      deadline: "Dec 2025",
      color: "bg-money-mint"
    },
    {
      name: "Emergency Fund 🛟",
      saved: 1200,
      target: 3000,
      deadline: "Ongoing",
      color: "bg-money-lavender"
    }
  ];

  return (
    <Card className="money-card">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Savings Goals</CardTitle>
        <CardDescription>Track your progress toward financial goals</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {goals.map((goal) => (
            <div key={goal.name} className="space-y-2">
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-medium">{goal.name}</span>
                  <div className="text-xs text-muted-foreground">
                    Due: {goal.deadline}
                  </div>
                </div>
                <Badge variant="outline">
                  ${goal.saved} / ${goal.target}
                </Badge>
              </div>
              <Progress 
                value={(goal.saved / goal.target) * 100} 
                className={`h-2 ${goal.color}`}
              />
              <p className="text-xs">
                {Math.round((goal.saved / goal.target) * 100)}% complete
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SavingsGoals;
