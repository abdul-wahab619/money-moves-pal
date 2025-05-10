
import { CircleDollarSign, Wallet, ChartPieIcon, PiggyBank, BadgeDollarSign } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const NavBar = () => {
  const [active, setActive] = useState("dashboard");

  const navItems = [
    { id: "dashboard", name: "Dashboard", icon: CircleDollarSign },
    { id: "budget", name: "Budget", icon: Wallet },
    { id: "goals", name: "Goals", icon: PiggyBank },
    { id: "insights", name: "Insights", icon: ChartPieIcon },
    { id: "rewards", name: "Rewards", icon: BadgeDollarSign },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border py-2 px-4 md:px-6 z-10">
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
                    "flex flex-col items-center gap-1 h-auto py-2",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )}
                  onClick={() => setActive(item.id)}
                >
                  <item.icon className={cn("h-5 w-5", isActive && "animate-bounce-small")} />
                  <span className="text-xs">{item.name}</span>
                  {isActive && <div className="w-1 h-1 rounded-full bg-primary mt-1" />}
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
