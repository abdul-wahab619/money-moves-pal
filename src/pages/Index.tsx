
import { useEffect } from "react";
import Header from "@/components/Header";
import NavBar from "@/components/NavBar";
import DashboardStats from "@/components/DashboardStats";
import StreakCard from "@/components/StreakCard";
import DailyChallenge from "@/components/DailyChallenge";
import SmartTips from "@/components/SmartTips";
import SpendingBreakdown from "@/components/SpendingBreakdown";
import SavingsGoals from "@/components/SavingsGoals";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { toast } = useToast();
  
  // Display welcome toast on first load
  useEffect(() => {
    const hasShownWelcome = sessionStorage.getItem("welcomeShown");
    
    if (!hasShownWelcome) {
      setTimeout(() => {
        toast({
          title: "Welcome to Money Moves Pal! 👋",
          description: "Your personal finance buddy, ready to make money management fun",
          duration: 5000,
        });
        sessionStorage.setItem("welcomeShown", "true");
      }, 1000);
    }
  }, [toast]);
  
  return (
    <div className="min-h-screen bg-background pb-20 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="fixed top-20 right-10 w-40 h-40 bg-money-mint opacity-5 rounded-full blur-3xl"></div>
      <div className="fixed bottom-40 left-10 w-60 h-60 bg-money-coral opacity-5 rounded-full blur-3xl"></div>
      <div className="fixed top-60 left-20 w-40 h-40 bg-money-blue opacity-5 rounded-full blur-3xl"></div>

      <div className="container max-w-4xl mx-auto px-4 py-6">
        <Header />
        
        <div className="mb-6">
          <DashboardStats />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-0"> {/* Removed space-y since individual components have mb-6 */}
            <StreakCard />
            <SmartTips />
          </div>
          <div className="space-y-4">
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
