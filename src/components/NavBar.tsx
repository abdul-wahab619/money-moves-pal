
import { CircleDollarSign, Wallet, ChartPieIcon, PiggyBank, BadgeDollarSign, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const NavBar = () => {
  const [active, setActive] = useState("dashboard");
  const { toast } = useToast();

  const navItems = [
    { id: "dashboard", name: "Dashboard", icon: CircleDollarSign },
    { id: "budget", name: "Budget", icon: Wallet },
    { id: "goals", name: "Goals", icon: PiggyBank },
    { id: "insights", name: "Insights", icon: ChartPieIcon },
    { id: "rewards", name: "Rewards", icon: BadgeDollarSign },
  ];

  const handleNavClick = (id: string) => {
    setActive(id);
    
    // Show toast for non-dashboard items
    if (id !== "dashboard") {
      toast({
        title: `${id.charAt(0).toUpperCase() + id.slice(1)} Coming Soon!`,
        description: "This feature will be available in the next update.",
        duration: 2000,
      });
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-md border-t border-border py-2 px-4 md:px-6 z-10">
      <nav className="max-w-screen-xl mx-auto">
        <ul className="flex justify-between items-center">
          {navItems.map((item) => {
            const isActive = active === item.id;
            return (
              <li key={item.id}>
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "flex flex-col items-center gap-1 h-auto py-2 px-1 rounded-xl transition-all duration-300",
                    isActive 
                      ? "text-primary bg-primary/10 scale-110" 
                      : "text-muted-foreground hover:scale-105"
                  )}
                  onClick={() => handleNavClick(item.id)}
                >
                  <item.icon className={cn(
                    "h-5 w-5 transition-all",
                    isActive && "animate-bounce-small"
                  )} />
                  <span className="text-xs font-medium">{item.name}</span>
                  {isActive && (
                    <div className="w-1 h-1 rounded-full bg-primary mt-1" />
                  )}
                </Button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
