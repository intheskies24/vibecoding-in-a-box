import { Chat } from "@/components/chat";

export default function ChatPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">AI Chat</h1>
        <p className="text-muted-foreground">
          Powered by Claude. Replace this with your own AI feature.
        </p>
      </div>
      <Chat />
    </div>
  );
}
