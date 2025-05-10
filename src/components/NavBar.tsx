
import { CircleDollarSign, Wallet, ChartPieIcon, PiggyBank, BadgeDollarSign } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate, useLocation } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  // Set active tab based on current route
  const getActiveTabFromPath = () => {
    const path = location.pathname;
    if (path === "/") return "dashboard";
    if (path === "/budget") return "budget";
    if (path === "/goals") return "goals";
    if (path === "/insights") return "insights";
    if (path === "/rewards") return "rewards";
    return "dashboard";
  };
  
  const [active, setActive] = useState(getActiveTabFromPath());
  
  // Update active tab when route changes
  useEffect(() => {
    setActive(getActiveTabFromPath());
  }, [location.pathname]);

  const navItems = [
    { id: "dashboard", name: "Dashboard", icon: CircleDollarSign, path: "/" },
    { id: "budget", name: "Budget", icon: Wallet, path: "/budget" },
    { id: "goals", name: "Goals", icon: PiggyBank, path: "/goals" },
    { id: "insights", name: "Insights", icon: ChartPieIcon, path: "/insights" },
    { id: "rewards", name: "Rewards", icon: BadgeDollarSign, path: "/rewards" },
  ];

  const handleNavClick = (id: string, path: string) => {
    setActive(id);
    navigate(path);
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
                  onClick={() => handleNavClick(item.id, item.path)}
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
