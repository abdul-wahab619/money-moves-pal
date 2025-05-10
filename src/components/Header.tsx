
import { useState } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";

const Header = () => {
  const { toast } = useToast();
  const [notificationCount, setNotificationCount] = useState(3);

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

  return (
    <header className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold">
          <span className="gradient-text bg-gradient-mint">Money</span>{" "}
          <span className="gradient-text bg-gradient-coral">Moves</span>{" "}
          <span className="gradient-text bg-gradient-blue">Pal</span>
        </h1>
        <p className="text-muted-foreground">Let's grow your money, friend! 💸</p>
      </div>
      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="icon" 
          className="relative"
          onClick={handleNotificationClick}
        >
          <Bell className="h-5 w-5" />
          {notificationCount > 0 && (
            <Badge 
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-accent"
            >
              {notificationCount}
            </Badge>
          )}
        </Button>
      </div>
    </header>
  );
};

export default Header;
