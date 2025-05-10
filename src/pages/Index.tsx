
import Header from "@/components/Header";
import NavBar from "@/components/NavBar";
import DashboardStats from "@/components/DashboardStats";
import StreakCard from "@/components/StreakCard";
import DailyChallenge from "@/components/DailyChallenge";
import SmartTips from "@/components/SmartTips";
import SpendingBreakdown from "@/components/SpendingBreakdown";
import SavingsGoals from "@/components/SavingsGoals";

const Index = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="container max-w-4xl mx-auto px-4 py-6">
        <Header />
        
        <DashboardStats />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <StreakCard />
            <SmartTips />
          </div>
          <div>
            <DailyChallenge />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <SpendingBreakdown />
          <SavingsGoals />
        </div>
      </div>
      
      <NavBar />
    </div>
  );
};

export default Index;
