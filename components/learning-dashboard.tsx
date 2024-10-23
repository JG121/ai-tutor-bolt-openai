"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export function LearningDashboard() {
  const [interests, setInterests] = useState("");
  const [isGamified, setIsGamified] = useState(false);
  const [isStarted, setIsStarted] = useState(false);

  const handleStart = async () => {
    if (!interests.trim()) return;
    setIsStarted(true);
    // TODO: Implement course generation logic
  };

  return (
    <div className="max-w-4xl mx-auto">
      {!isStarted ? (
        <Card>
          <CardHeader>
            <CardTitle>Let's Start Your Learning Journey</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="interests">What would you like to learn about?</Label>
              <Input
                id="interests"
                placeholder="e.g., Web Development, Machine Learning, Digital Marketing..."
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="gamify"
                checked={isGamified}
                onCheckedChange={setIsGamified}
              />
              <Label htmlFor="gamify">Gamify my learning experience</Label>
            </div>
            <Button onClick={handleStart} className="w-full">
              Generate My Learning Path
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {/* TODO: Add course content and chat interface */}
        </div>
      )}
    </div>
  );
}