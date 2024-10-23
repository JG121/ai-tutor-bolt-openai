import { auth } from "@clerk/nextjs";
import { LearningDashboard } from "@/components/learning-dashboard";
import { WelcomePage } from "@/components/welcome-page";

export default async function Home() {
  const { userId } = auth();
  
  return userId ? <LearningDashboard /> : <WelcomePage />;
}