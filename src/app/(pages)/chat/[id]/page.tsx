"use client";

import React from "react";
import ChatMessages from "@/components/organisms/chat-messages";
import useChat from "@/store/useChat";

export default function ChatRoom() {
  const { chat } = useChat();

  return chat && <ChatMessages chat={chat} />;
}
