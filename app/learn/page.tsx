"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Brain, Send } from "lucide-react";

export default function LearnPage() {
  const { user } = useUser();
  const [topic, setTopic] = useState("");
  const [goal, setGoal] = useState("");
  const [gamify, setGamify] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/start-learning", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user?.id,
          topic,
          goal,
          gamify,
        }),
      });

      if (!response.ok) throw new Error("Failed to start learning session");

      // Handle the response and redirect to the learning session
      const data = await response.json();
      window.location.href = `/learn/${data.sessionId}`;
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-center mb-8">
          <Brain className="h-12 w-12 text-primary mr-3" />
          <h1 className="text-3xl font-bold">Start Your Learning Journey</h1>
        </div>

        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="topic">What would you like to learn?</Label>
              <Input
                id="topic"
                placeholder="e.g., Python Programming, Digital Marketing, Guitar..."
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="goal">What's your learning goal?</Label>
              <Textarea
                id="goal"
                placeholder="Tell us what you want to achieve..."
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                required
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="gamify"
                checked={gamify}
                onCheckedChange={setGamify}
              />
              <Label htmlFor="gamify">Gamify my learning experience</Label>
            </div>

            <Button 
              type="submit" 
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                "Creating your learning path..."
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Start Learning
                </>
              )}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}