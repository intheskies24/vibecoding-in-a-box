import { anthropic } from "@ai-sdk/anthropic";
import { streamText } from "ai";
import { auth } from "@clerk/nextjs/server";

export const maxDuration = 30;

export async function POST(request: Request) {
  const { userId } = await auth();

  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { messages } = await request.json();

  const result = streamText({
    model: anthropic("claude-opus-4-6"),
    system:
      "You are a helpful assistant. Answer concisely and clearly.",
    messages,
  });

  return result.toDataStreamResponse();
}
