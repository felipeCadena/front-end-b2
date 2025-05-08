"use client";

import React from "react";
import ChatMessages from "@/components/organisms/chat-messages";
import { useQuery } from "@tanstack/react-query";
import { chatService } from "@/services/api/chats";
import useSearchQueryService from "@/services/use-search-query-service";

export default function ChatRoom() {
  const { params } = useSearchQueryService();

  const { data: chat } = useQuery({
    queryKey: ["chat"],
    queryFn: () => chatService.getMyChats({ name: params?.user }),
    enabled: !!params?.user,
  });

  return chat && <ChatMessages chat={chat[0]} user={chat[0]?.userToId} />;
}
