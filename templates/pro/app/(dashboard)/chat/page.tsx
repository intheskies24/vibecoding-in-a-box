import { Chat } from "@/components/chat";

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 px-8 py-10 flex-shrink-0">
        <div className="max-w-3xl">
          <h1 className="text-2xl font-bold text-white mb-1">AI Chat</h1>
          <p className="text-slate-400">Powered by Claude. Replace this with your own AI feature.</p>
        </div>
      </div>
      <div className="flex-1 px-8 py-8 max-w-3xl w-full">
        <Chat />
      </div>
    </div>
  );
}
