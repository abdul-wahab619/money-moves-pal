
import { CircleDollarSign } from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { useAuth } from "@/contexts/AuthContext";
import UserMenu from "@/components/UserMenu";

const Header = () => {
  const { user } = useAuth();
  
  return (
    <header className="mb-6">
      <div className="flex justify-between items-center">
        <HoverCard>
          <HoverCardTrigger>
            <div className="flex items-center gap-2">
              <CircleDollarSign className="h-5 w-5 md:h-6 md:w-6 text-money-mint" />
              <h1 className="text-lg md:text-xl font-bold">Money Moves</h1>
            </div>
          </HoverCardTrigger>
          <HoverCardContent side="bottom" className="w-80">
            <div className="flex justify-between space-x-4">
              <div>
                <h4 className="text-sm font-semibold">Money Moves</h4>
                <p className="text-sm text-muted-foreground">
                  Your Gen Z financial companion. Track budgets, set goals, and get personalized insights.
                </p>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
        
        {user && <UserMenu />}
      </div>
    </header>
  );
};

export default Header;
