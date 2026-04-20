"use client";

import { useParams } from "next/navigation";
import { ChatThread } from "@/components/shared/chat-thread";

export default function StudentChatThreadPage() {
  const { threadId } = useParams<{ threadId: string }>();
  return <ChatThread threadId={threadId} basePath="/student" />;
}
