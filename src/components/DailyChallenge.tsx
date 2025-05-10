
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Rocket } from "lucide-react";

const CHALLENGES = [
  {
    id: 1,
    title: "Skip the coffee shop",
    description: "Make coffee at home today instead of buying out",
    reward: "Save ~$5",
    difficulty: "easy",
    tag: "Saving"
  },
  {
    id: 2,
    title: "Review subscriptions",
    description: "Check for any subscriptions you don't use",
    reward: "Potential monthly savings",
    difficulty: "medium",
    tag: "Budget"
  },
  {
    id: 3,
    title: "Pack lunch tomorrow",
    description: "Prep your lunch tonight instead of eating out",
    reward: "Save $10-15",
    difficulty: "easy",
    tag: "Saving"
  }
];

const DailyChallenge = () => {
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [completed, setCompleted] = useState(false);

  const handleComplete = () => {
    setCompleted(true);
  };

  const handleNext = () => {
    setCurrentChallenge((prev) => (prev + 1) % CHALLENGES.length);
    setCompleted(false);
  };

  const challenge = CHALLENGES[currentChallenge];

  const difficultyColor = {
    easy: "bg-green-500",
    medium: "bg-yellow-500",
    hard: "bg-red-500"
  };

  return (
    <Card className="money-card overflow-hidden">
      <div className="bg-gradient-coral h-1" />
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium">Money Mission</CardTitle>
          <Badge variant="outline">{challenge.tag}</Badge>
        </div>
        <CardDescription>Complete daily challenges to earn rewards</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-start gap-4">
          <div className="bg-money-coral/20 p-3 rounded-full">
            <Rocket className="h-6 w-6 text-money-coral" />
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-lg">{challenge.title}</h3>
            <p className="text-muted-foreground text-sm mt-1">{challenge.description}</p>
            <div className="flex items-center gap-2 mt-3">
              <Badge className={difficultyColor[challenge.difficulty as keyof typeof difficultyColor]}>
                {challenge.difficulty}
              </Badge>
              <span className="text-sm font-medium">Reward: {challenge.reward}</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        {!completed ? (
          <Button onClick={handleComplete} className="w-full">Complete Challenge</Button>
        ) : (
          <>
            <Badge variant="outline" className="bg-green-500/20 text-green-700 border-green-500">
              Completed! +10 points
            </Badge>
            <Button onClick={handleNext} variant="outline">
              Next Challenge
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default DailyChallenge;
