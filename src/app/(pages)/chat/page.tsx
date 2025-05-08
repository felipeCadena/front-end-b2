"use client";

import React from "react";
import MyLogo from "@/components/atoms/my-logo";
import ChatList from "@/components/organisms/chat-list";
import ChatMessages from "@/components/organisms/chat-messages";
import { chatService } from "@/services/api/chats";
import useSearchQueryService from "@/services/use-search-query-service";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { use, useEffect } from "react";
import { useDebounce } from "@/hooks/useDebounce";

export default function Chat() {
  const { params } = useSearchQueryService();
  const queryClient = useQueryClient();
  const [user, setUser] = React.useState<string>("");

  const { data: chats } = useQuery({
    queryKey: ["chats", user],
    queryFn: () => chatService.getMyChats({ name: user }),
  });

  const { data: chat } = useQuery({
    queryKey: ["chat"],
    queryFn: () => chatService.getMyChats({ name: params?.user }),
    enabled: !!params?.user,
  });

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["chat"] });
    queryClient.invalidateQueries({ queryKey: ["messages"] });
  }, [params?.user]);

  return (
    <div className="min-h-[75vh] max-h-screen overflow-auto bg-white">
      <div className="md:hidden">
        <ChatList chats={chats} setUser={setUser} />
      </div>

      <div className="flex min-h-[75vh] max-h-screen max-sm:hidden">
        <div className="w-1/3">
          <ChatList chats={chats} setUser={setUser} />
        </div>
        <div className="w-[2rem] bg-gray-500 mx-4 rounded" />
        <div className="w-2/3">
          {chat ? (
            <ChatMessages chat={chat[0]} user={chat[0]?.userToId} />
          ) : (
            <div className="flex flex-col items-center justify-center gap-4 mt-12">
              <MyLogo variant="web" />
              <p className="">Selecione um chat para começar</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
