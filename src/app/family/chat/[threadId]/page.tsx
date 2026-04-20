"use client";

import { useParams } from "next/navigation";
import { ChatThread } from "@/components/shared/chat-thread";

export default function FamilyChatThreadPage() {
  const { threadId } = useParams<{ threadId: string }>();
  return <ChatThread threadId={threadId} basePath="/family" />;
}
