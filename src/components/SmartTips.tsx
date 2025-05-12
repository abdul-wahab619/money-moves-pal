
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, ArrowRight, ArrowLeft, Lightbulb, Bookmark, Share } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Tip {
  id: string;
  title: string;
  content: string;
  tag: string;
  emoji: string;
}

interface UserTip {
  id: string;
  tip_id: string;
  liked: boolean;
  saved: boolean;
}

const SmartTips = () => {
  const [currentTip, setCurrentTip] = useState(0);
  const [tips, setTips] = useState<Tip[]>([]);
  const [userTips, setUserTips] = useState<Record<string, UserTip>>({});
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  // Fetch tips from the database
  useEffect(() => {
    const fetchTips = async () => {
      try {
        const { data, error } = await supabase
          .from('ai_tips')
          .select('*');
        
        if (error) throw error;
        if (data) setTips(data);
      } catch (error) {
        console.error("Error fetching tips:", error);
        toast({
          title: "Error fetching tips",
          description: "Please try again later",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchTips();
  }, []);

  // Fetch user's liked and saved tips
  useEffect(() => {
    if (!user) return;

    const fetchUserTips = async () => {
      try {
        const { data, error } = await supabase
          .from('user_saved_tips')
          .select('*')
          .eq('user_id', user.id);
        
        if (error) throw error;
        
        if (data) {
          const userTipsMap: Record<string, UserTip> = {};
          data.forEach(userTip => {
            userTipsMap[userTip.tip_id] = userTip;
          });
          setUserTips(userTipsMap);
        }
      } catch (error) {
        console.error("Error fetching user tips:", error);
      }
    };

    fetchUserTips();
  }, [user]);

  const handleLike = async (tipId: string) => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to like tips",
      });
      return;
    }

    try {
      const existingUserTip = userTips[tipId];
      
      if (existingUserTip) {
        // Update existing record
        const { error } = await supabase
          .from('user_saved_tips')
          .update({ liked: !existingUserTip.liked })
          .eq('id', existingUserTip.id);
          
        if (error) throw error;
        
        // Update local state
        setUserTips({
          ...userTips,
          [tipId]: { ...existingUserTip, liked: !existingUserTip.liked }
        });
      } else {
        // Create new record
        const { data, error } = await supabase
          .from('user_saved_tips')
          .insert({
            user_id: user.id,
            tip_id: tipId,
            liked: true,
            saved: false
          })
          .select()
          .single();
          
        if (error) throw error;
        
        // Update local state
        if (data) {
          setUserTips({
            ...userTips,
            [tipId]: data
          });
        }
      }
    } catch (error) {
      console.error("Error updating like status:", error);
      toast({
        title: "Error",
        description: "Could not update like status",
      });
    }
  };

  const handleSave = async (tipId: string) => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to save tips",
      });
      return;
    }

    try {
      const existingUserTip = userTips[tipId];
      
      if (existingUserTip) {
        // Update existing record
        const { error } = await supabase
          .from('user_saved_tips')
          .update({ saved: !existingUserTip.saved })
          .eq('id', existingUserTip.id);
          
        if (error) throw error;
        
        // Update local state
        setUserTips({
          ...userTips,
          [tipId]: { ...existingUserTip, saved: !existingUserTip.saved }
        });
      } else {
        // Create new record
        const { data, error } = await supabase
          .from('user_saved_tips')
          .insert({
            user_id: user.id,
            tip_id: tipId,
            liked: false,
            saved: true
          })
          .select()
          .single();
          
        if (error) throw error;
        
        // Update local state
        if (data) {
          setUserTips({
            ...userTips,
            [tipId]: data
          });
        }
      }
    } catch (error) {
      console.error("Error updating save status:", error);
      toast({
        title: "Error",
        description: "Could not update save status",
      });
    }
  };

  const handleNext = () => {
    setCurrentTip((prev) => (prev + 1) % tips.length);
  };

  const handlePrevious = () => {
    setCurrentTip((prev) => (prev - 1 + tips.length) % tips.length);
  };

  const handleShare = async () => {
    if (tips.length === 0) return;
    
    const tip = tips[currentTip];
    
    try {
      await navigator.share({
        title: `Money Moves - ${tip.title}`,
        text: `${tip.emoji} ${tip.content} #${tip.tag} via Money Moves`
      });
    } catch (error) {
      console.error("Error sharing:", error);
      toast({
        title: "Sharing not supported",
        description: "This feature is not supported in your browser",
      });
    }
  };

  if (isLoading) {
    return (
      <Card className="money-card mb-6 bg-gradient-blue relative overflow-hidden">
        <CardHeader className="relative z-10">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-lg font-medium">Money Tip</CardTitle>
              <CardDescription>Loading tips...</CardDescription>
            </div>
            <Lightbulb className="h-5 w-5 text-yellow-300 animate-pulse" />
          </div>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="bg-white/20 p-4 rounded-lg mb-4 h-32 animate-pulse"></div>
        </CardContent>
      </Card>
    );
  }

  if (tips.length === 0) {
    return (
      <Card className="money-card mb-6 bg-gradient-blue relative overflow-hidden">
        <CardHeader className="relative z-10">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-lg font-medium">Money Tip</CardTitle>
              <CardDescription>No tips available</CardDescription>
            </div>
            <Lightbulb className="h-5 w-5 text-yellow-300" />
          </div>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="bg-white/20 p-4 rounded-lg mb-4">
            <p>Check back later for financial tips!</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const tip = tips[currentTip];
  const userTip = userTips[tip.id];
  const isLiked = userTip?.liked || false;
  const isSaved = userTip?.saved || false;

  return (
    <Card className="money-card mb-6 bg-gradient-blue relative overflow-hidden">
      <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mt-10 -mr-10"></div>
      <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full -mb-8 -ml-8"></div>
      
      <CardHeader className="relative z-10">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-lg font-medium">Money Tip</CardTitle>
            <CardDescription>Daily financial wisdom just for you</CardDescription>
          </div>
          <Lightbulb className="h-5 w-5 text-yellow-300" />
        </div>
      </CardHeader>
      
      <CardContent className="relative z-10">
        <div className="bg-white/20 p-4 rounded-lg mb-4 transform hover:scale-102 transition-all">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">{tip.emoji}</span>
            <h3 className="text-xl font-medium">{tip.title}</h3>
          </div>
          <p className="mb-3">{tip.content}</p>
          <div className="flex justify-between items-center">
            <div className="bg-white/20 text-xs px-2 py-1 rounded-full">{tip.tag}</div>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => handleLike(tip.id)}
              className={isLiked ? "text-accent bg-white/10" : ""}
            >
              <Heart className="h-5 w-5" fill={isLiked ? "#FF6B6B" : "none"} />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => handleSave(tip.id)}
              className={isSaved ? "text-primary bg-white/10" : ""}
            >
              <Bookmark className="h-5 w-5" fill={isSaved ? "#9AECDB" : "none"} />
            </Button>
            
            <Button variant="ghost" size="icon" onClick={handleShare}>
              <Share className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="flex gap-2 items-center">
            <Button variant="ghost" size="icon" onClick={handlePrevious} className="bg-white/10 hover:bg-white/20">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <span className="flex items-center text-sm bg-white/20 px-2 rounded-md">
              {currentTip + 1}/{tips.length}
            </span>
            <Button variant="ghost" size="icon" onClick={handleNext} className="bg-white/10 hover:bg-white/20">
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SmartTips;
