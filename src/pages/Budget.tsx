
import Header from "@/components/Header";
import NavBar from "@/components/NavBar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useState } from "react";
import { Check } from "lucide-react";

const Budget = () => {
  const [monthlyIncome, setMonthlyIncome] = useState(3500);
  const [budgetType, setBudgetType] = useState("recommended");
  
  const categories = [
    { name: "Housing", recommended: 35, custom: 0, icon: "🏠" },
    { name: "Food", recommended: 15, custom: 0, icon: "🍕" },
    { name: "Transportation", recommended: 10, custom: 0, icon: "🚗" },
    { name: "Entertainment", recommended: 5, custom: 0, icon: "🎮" },
    { name: "Shopping", recommended: 10, custom: 0, icon: "🛍️" },
    { name: "Savings", recommended: 20, custom: 0, icon: "💰" },
    { name: "Other", recommended: 5, custom: 0, icon: "📦" },
  ];
  
  const [customCategories, setCustomCategories] = useState(
    categories.map(cat => ({ ...cat, custom: cat.recommended }))
  );
  
  const handleCustomChange = (index: number, value: number) => {
    const newCategories = [...customCategories];
    newCategories[index].custom = value;
    setCustomCategories(newCategories);
  };
  
  const totalCustomPercentage = customCategories.reduce((sum, cat) => sum + cat.custom, 0);
  
  return (
    <div className="min-h-screen bg-background pb-20 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="fixed top-20 right-10 w-40 h-40 bg-money-mint opacity-5 rounded-full blur-3xl"></div>
      <div className="fixed bottom-40 left-10 w-60 h-60 bg-money-coral opacity-5 rounded-full blur-3xl"></div>
      
      <div className="container max-w-4xl mx-auto px-4 py-6">
        <Header />
        
        <Card className="money-card mb-6 bg-gradient-to-br from-white to-muted">
          <CardHeader>
            <CardTitle className="text-2xl font-medium">Budget Planner</CardTitle>
            <CardDescription>Create a budget that works for you 💸</CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="mb-6">
              <Label htmlFor="income">Monthly Income</Label>
              <div className="flex items-center gap-2">
                <span className="text-xl">$</span>
                <Input 
                  id="income" 
                  type="number"
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                  className="text-xl font-medium"
                />
              </div>
            </div>
            
            <Tabs defaultValue="recommended" onValueChange={setBudgetType}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="recommended">Recommended</TabsTrigger>
                <TabsTrigger value="custom">Custom</TabsTrigger>
              </TabsList>
              
              <TabsContent value="recommended" className="space-y-4">
                {categories.map((category, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white/50 rounded-lg hover:bg-white/80 transition-all">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{category.icon}</span>
                      <div>
                        <p className="font-medium">{category.name}</p>
                        <p className="text-muted-foreground text-sm">{category.recommended}% of income</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">${(monthlyIncome * category.recommended / 100).toFixed(0)}</p>
                      <p className="text-xs text-muted-foreground">per month</p>
                    </div>
                  </div>
                ))}
                
                <Button className="w-full mt-4">
                  <Check className="mr-2" /> Use Recommended Budget
                </Button>
              </TabsContent>
              
              <TabsContent value="custom" className="space-y-4">
                {customCategories.map((category, index) => (
                  <div key={index} className="p-3 bg-white/50 rounded-lg hover:bg-white/80 transition-all">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{category.icon}</span>
                        <p className="font-medium">{category.name}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">${(monthlyIncome * category.custom / 100).toFixed(0)}</p>
                        <p className="text-xs text-muted-foreground">per month</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={category.custom}
                        onChange={(e) => handleCustomChange(index, Number(e.target.value))}
                        className="accent-primary"
                      />
                      <span className="min-w-[45px] text-right">{category.custom}%</span>
                    </div>
                  </div>
                ))}
                
                <div className="flex justify-between items-center p-3 bg-white/50 rounded-lg">
                  <p className="font-medium">Total Allocation</p>
                  <p className={`font-bold ${totalCustomPercentage !== 100 ? 'text-destructive' : 'text-green-600'}`}>
                    {totalCustomPercentage}%
                  </p>
                </div>
                
                <Button 
                  className="w-full mt-4" 
                  disabled={totalCustomPercentage !== 100}
                >
                  <Check className="mr-2" /> Save Custom Budget
                </Button>
                {totalCustomPercentage !== 100 && (
                  <p className="text-destructive text-xs text-center">
                    Your budget allocations should add up to exactly 100%
                  </p>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
      
      <NavBar />
    </div>
  );
};

export default Budget;
