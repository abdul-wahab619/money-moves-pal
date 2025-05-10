
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, ArrowRight, ArrowLeft, Lightbulb, Bookmark, Share } from "lucide-react";

const SmartTips = () => {
  const [currentTip, setCurrentTip] = useState(0);
  const [likedTips, setLikedTips] = useState<number[]>([]);
  const [savedTips, setSavedTips] = useState<number[]>([]);

  const tips = [
    {
      title: "Coffee Savings Hack",
      content: "Making coffee at home instead of buying it daily can save you ~$100/month.",
      tag: "Saving",
      emoji: "☕"
    },
    {
      title: "Student Loan Tip",
      content: "Pay a little extra on your student loans each month to reduce the interest paid over time.",
      tag: "Loans",
      emoji: "🎓"
    },
    {
      title: "Low-Risk Investing",
      content: "New to investing? Start with an S&P 500 index fund for long-term growth.",
      tag: "Investing",
      emoji: "📈"
    },
    {
      title: "Subscription Audit",
      content: "Review your subscriptions today. You might be paying for services you don't use.",
      tag: "Budget",
      emoji: "🔍"
    }
  ];

  const handleLike = (index: number) => {
    if (likedTips.includes(index)) {
      setLikedTips(likedTips.filter((i) => i !== index));
    } else {
      setLikedTips([...likedTips, index]);
    }
  };

  const handleSave = (index: number) => {
    if (savedTips.includes(index)) {
      setSavedTips(savedTips.filter((i) => i !== index));
    } else {
      setSavedTips([...savedTips, index]);
    }
  };

  const handleNext = () => {
    setCurrentTip((prev) => (prev + 1) % tips.length);
  };

  const handlePrevious = () => {
    setCurrentTip((prev) => (prev - 1 + tips.length) % tips.length);
  };

  const tip = tips[currentTip];

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
              onClick={() => handleLike(currentTip)}
              className={likedTips.includes(currentTip) ? "text-accent bg-white/10" : ""}
            >
              <Heart className="h-5 w-5" fill={likedTips.includes(currentTip) ? "#FF6B6B" : "none"} />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => handleSave(currentTip)}
              className={savedTips.includes(currentTip) ? "text-primary bg-white/10" : ""}
            >
              <Bookmark className="h-5 w-5" fill={savedTips.includes(currentTip) ? "#9AECDB" : "none"} />
            </Button>
            
            <Button variant="ghost" size="icon">
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
