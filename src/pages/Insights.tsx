
import { useState } from "react";
import Header from "@/components/Header";
import NavBar from "@/components/NavBar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { Badge } from "@/components/ui/badge";
import { ChartPieIcon, Info, TrendingUp } from "lucide-react";

const Insights = () => {
  const [periodTab, setPeriodTab] = useState("month");
  
  // Sample data
  const spendingData = [
    { name: "Housing", value: 1250, color: "#FF9F7F" },
    { name: "Food", value: 520, color: "#7FCFFF" },
    { name: "Transportation", value: 320, color: "#9AECDB" },
    { name: "Entertainment", value: 250, color: "#FEF7A5" },
    { name: "Shopping", value: 450, color: "#E5DEFF" },
    { name: "Other", value: 180, color: "#FFBDD0" }
  ];
  
  const trendData = [
    { name: "Jan", income: 3200, spending: 2800 },
    { name: "Feb", income: 3400, spending: 2900 },
    { name: "Mar", income: 3100, spending: 3000 },
    { name: "Apr", income: 3500, spending: 2700 },
    { name: "May", income: 3600, spending: 2950 },
    { name: "Jun", income: 3800, spending: 3100 }
  ];
  
  const insightsData = [
    {
      title: "Spending Trend 📉",
      description: "Your food spending was 15% lower this month compared to last month. Great job!",
      category: "spending"
    },
    {
      title: "Opportunity 💰",
      description: "You could save $240/year by consolidating your subscription services.",
      category: "opportunity"
    },
    {
      title: "Alert ⚠️",
      description: "Your entertainment spending is 30% over your budget this month.",
      category: "alert"
    },
    {
      title: "Recommendation 💡",
      description: "Based on your income, consider increasing your emergency fund contributions by $50/month.",
      category: "recommendation"
    }
  ];

  return (
    <div className="min-h-screen bg-background pb-20 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="fixed top-20 right-10 w-40 h-40 bg-money-lavender opacity-5 rounded-full blur-3xl"></div>
      <div className="fixed bottom-40 left-10 w-60 h-60 bg-money-blue opacity-5 rounded-full blur-3xl"></div>
      
      <div className="container max-w-4xl mx-auto px-4 py-6">
        <Header />
        
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold flex items-center">
              <ChartPieIcon className="mr-2 h-6 w-6" />
              Financial Insights
            </h2>
            <p className="text-muted-foreground">
              Understand your money habits better
            </p>
          </div>
          
          <Tabs value={periodTab} onValueChange={setPeriodTab}>
            <TabsList>
              <TabsTrigger value="week">Week</TabsTrigger>
              <TabsTrigger value="month">Month</TabsTrigger>
              <TabsTrigger value="year">Year</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card className="money-card">
            <CardHeader>
              <CardTitle>Spending Breakdown</CardTitle>
              <CardDescription>How your money was spent</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={spendingData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {spendingData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="grid grid-cols-2 gap-2 mt-4">
                {spendingData.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm">{item.name}: ${item.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="money-card">
            <CardHeader>
              <CardTitle>Income vs Spending</CardTitle>
              <CardDescription>6 month trend analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={trendData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => `$${value}`} />
                    <Legend />
                    <Bar dataKey="income" name="Income" fill="#9AECDB" />
                    <Bar dataKey="spending" name="Spending" fill="#FF9F7F" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card className="money-card mb-6">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <Info className="mr-2 h-5 w-5" />
                Smart Insights
              </CardTitle>
              <CardDescription>AI-powered financial observations</CardDescription>
            </div>
            <Badge variant="outline" className="bg-white/50">
              <TrendingUp className="mr-1 h-3 w-3" />
              New insights
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {insightsData.map((insight, index) => (
                <div 
                  key={index} 
                  className="p-4 bg-white/50 rounded-lg border border-border hover:bg-white/80 transition-all"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold">{insight.title}</h3>
                    <Badge 
                      variant="outline" 
                      className={`${
                        insight.category === "spending" ? "bg-blue-100 text-blue-800" :
                        insight.category === "opportunity" ? "bg-green-100 text-green-800" :
                        insight.category === "alert" ? "bg-red-100 text-red-800" : 
                        "bg-purple-100 text-purple-800"
                      } border-none`}
                    >
                      {insight.category}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground">{insight.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <NavBar />
    </div>
  );
};

export default Insights;
