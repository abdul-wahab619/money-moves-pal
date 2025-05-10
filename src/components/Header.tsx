
import { useState, useEffect } from "react";
import { Bell, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const Header = () => {
  const { toast } = useToast();
  const [notificationCount, setNotificationCount] = useState(3);
  const [greeting, setGreeting] = useState("Good day");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);

  const handleNotificationClick = () => {
    toast({
      title: "New money-saving tip!",
      description: "Try the 50/30/20 rule: 50% needs, 30% wants, 20% savings.",
      duration: 5000,
    });
    
    if (notificationCount > 0) {
      setNotificationCount(notificationCount - 1);
    }
  };

  const handleUserClick = () => {
    toast({
      title: "Login feature coming soon!",
      description: "We're working on user accounts to save your progress.",
      duration: 3000,
    });
  };

  return (
    <header className="relative">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-mint opacity-20 rounded-full blur-xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-coral opacity-20 rounded-full blur-xl -z-10"></div>
      
      <div className="flex justify-between items-center mb-8 relative z-10">
        <div>
          <h1 className="text-3xl font-bold flex flex-wrap items-center">
            <span className="gradient-text bg-gradient-mint mr-1">Money</span>
            <span className="gradient-text bg-gradient-coral mr-1">Moves</span>
            <span className="gradient-text bg-gradient-blue">Pal</span>
          </h1>
          <p className="text-muted-foreground">{greeting}, friend! 💸</p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="relative bg-white/10 hover:bg-white/20 rounded-xl"
            onClick={handleNotificationClick}
          >
            <Bell className="h-5 w-5" />
            {notificationCount > 0 && (
              <Badge 
                className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-accent animate-pulse-soft"
              >
                {notificationCount}
              </Badge>
            )}
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="bg-white/10 hover:bg-white/20 rounded-xl"
            onClick={handleUserClick}
          >
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
