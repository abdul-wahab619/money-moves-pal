
import { CircleDollarSign, TrendingUp, PiggyBank } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const DashboardStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 animate-scale-in">
      <Card className="money-card bg-gradient-mint">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <CircleDollarSign className="h-5 w-5" />
            Balance
          </CardTitle>
          <CardDescription>Your current money</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">$1,245</p>
          <div className="flex items-center text-xs mt-2">
            <TrendingUp className="h-4 w-4 mr-1" />
            <span>+$140 this week</span>
          </div>
        </CardContent>
      </Card>

      <Card className="money-card bg-gradient-yellow">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <PiggyBank className="h-5 w-5" />
            Savings
          </CardTitle>
          <CardDescription>This month's goal</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">$420<span className="text-sm font-normal"> / $500</span></p>
          <Progress value={84} className="h-2 mt-2" />
          <p className="text-xs mt-1">84% of monthly goal completed</p>
        </CardContent>
      </Card>

      <Card className="money-card bg-gradient-blue">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Investments
          </CardTitle>
          <CardDescription>Your portfolio</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">$780</p>
          <div className="flex items-center text-xs mt-2">
            <TrendingUp className="h-4 w-4 mr-1 text-green-500" />
            <span className="text-green-500">+2.4% this week</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardStats;
