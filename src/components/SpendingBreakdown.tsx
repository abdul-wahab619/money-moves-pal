
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const SpendingBreakdown = () => {
  const categories = [
    { name: "Food 🍕", amount: 340, budget: 400, color: "bg-money-coral" },
    { name: "Shopping 🛍️", amount: 210, budget: 250, color: "bg-money-blue" },
    { name: "Transport 🚗", amount: 120, budget: 150, color: "bg-money-mint" },
    { name: "Entertainment 🎮", amount: 85, budget: 100, color: "bg-money-lavender" }
  ];

  return (
    <Card className="money-card mb-6">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Spending Breakdown</CardTitle>
        <CardDescription>Your monthly budget tracker</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {categories.map((category) => (
            <div key={category.name} className="space-y-1">
              <div className="flex justify-between items-center">
                <span>{category.name}</span>
                <span className="font-medium">${category.amount} / ${category.budget}</span>
              </div>
              <div className="relative">
                <Progress 
                  value={(category.amount / category.budget) * 100} 
                  className={`h-2 ${category.color}`}
                />
              </div>
              <p className="text-xs text-right">
                ${category.budget - category.amount} left to spend
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SpendingBreakdown;
