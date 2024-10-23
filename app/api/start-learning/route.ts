import { NextResponse } from "next/server";
import { OpenAI } from "openai";
import clientPromise from "@/lib/mongodb";
import { auth } from "@clerk/nextjs";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { topic, goal, gamify } = await req.json();

    const client = await clientPromise;
    const db = client.db("learning-platform");

    // Create initial message for the AI
    const systemMessage = `You are an expert AI tutor. Create a personalized learning path for a student interested in ${topic}. 
    Their goal is: ${goal}. ${gamify ? 'Include gamification elements in the learning experience.' : ''}
    Format the response as a structured learning plan with clear objectives and milestones.`;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: systemMessage }],
      model: "gpt-4",
    });

    const learningPlan = completion.choices[0].message.content;

    // Create a new learning session
    const session = await db.collection("learning-sessions").insertOne({
      userId,
      topic,
      goal,
      gamify,
      learningPlan,
      createdAt: new Date(),
      messages: [{
        role: "system",
        content: systemMessage
      }, {
        role: "assistant",
        content: learningPlan
      }],
    });

    return NextResponse.json({ 
      sessionId: session.insertedId.toString(),
      learningPlan 
    });

  } catch (error) {
    console.error("Error:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}