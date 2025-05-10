
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, ArrowRight, ArrowLeft } from "lucide-react";

const SmartTips = () => {
  const [currentTip, setCurrentTip] = useState(0);
  const [likedTips, setLikedTips] = useState<number[]>([]);

  const tips = [
    {
      title: "Coffee Savings Hack",
      content: "Making coffee at home instead of buying it daily can save you ~$100/month.",
      tag: "Saving"
    },
    {
      title: "Student Loan Tip",
      content: "Pay a little extra on your student loans each month to reduce the interest paid over time.",
      tag: "Loans"
    },
    {
      title: "Low-Risk Investing",
      content: "New to investing? Start with an S&P 500 index fund for long-term growth.",
      tag: "Investing"
    },
    {
      title: "Subscription Audit",
      content: "Review your subscriptions today. You might be paying for services you don't use.",
      tag: "Budget"
    }
  ];

  const handleLike = (index: number) => {
    if (likedTips.includes(index)) {
      setLikedTips(likedTips.filter((i) => i !== index));
    } else {
      setLikedTips([...likedTips, index]);
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
    <Card className="money-card mb-6 bg-gradient-blue">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Money Tip</CardTitle>
        <CardDescription>Daily financial wisdom just for you</CardDescription>
      </CardHeader>
      <CardContent>
        <h3 className="text-xl font-medium mb-2">{tip.title}</h3>
        <p className="mb-4">{tip.content}</p>
        <div className="flex justify-between items-center">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => handleLike(currentTip)}
            className={likedTips.includes(currentTip) ? "text-accent" : ""}
          >
            <Heart className="h-5 w-5" fill={likedTips.includes(currentTip) ? "#FF6B6B" : "none"} />
          </Button>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" onClick={handlePrevious}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <span className="flex items-center">
              {currentTip + 1}/{tips.length}
            </span>
            <Button variant="ghost" size="icon" onClick={handleNext}>
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SmartTips;
