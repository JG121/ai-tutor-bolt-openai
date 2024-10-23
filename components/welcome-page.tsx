"use client";

import { SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Brain, Rocket, Sparkles } from "lucide-react";

export function WelcomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
      <Brain className="h-16 w-16 mb-8 text-primary animate-pulse" />
      <h1 className="text-4xl font-bold mb-4">Welcome to AI Learning Assistant</h1>
      <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
        Your personalized AI-powered learning companion. Get started on your learning journey with customized courses and interactive lessons.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-4xl">
        <FeatureCard
          icon={Brain}
          title="Smart Learning"
          description="AI-powered personalized learning paths tailored to your goals and preferences"
        />
        <FeatureCard
          icon={Sparkles}
          title="Interactive"
          description="Engage with dynamic content and real-time feedback for better understanding"
        />
        <FeatureCard
          icon={Rocket}
          title="Progress Tracking"
          description="Monitor your learning journey with detailed progress analytics"
        />
      </div>
      <SignInButton mode="modal">
        <Button size="lg" className="text-lg">
          Get Started
        </Button>
      </SignInButton>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description }: { icon: any; title: string; description: string }) {
  return (
    <div className="p-6 border rounded-lg bg-card">
      <Icon className="h-8 w-8 mb-4 text-primary mx-auto" />
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}