"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import MyIcon from "../atoms/my-icon";
import MyTextInput from "../atoms/my-text-input";
import useSearchQueryService from "@/services/use-search-query-service";
import { useQueries, useQuery, useQueryClient } from "@tanstack/react-query";
import { useDebounce } from "@/hooks/useDebounce";
import { chatService } from "@/services/api/chats";
import { cn } from "@/utils/cn";

interface ChatType {
  id: string;
  openIn: string | null;
  closeIn: string | null;
  type: "admin" | string; // substitua por outros tipos possíveis se houver
  orderAdventureId: string | null;
  userToId: string;
  userToName: string;
  userToPhoto: string;
  session_token: string;
}

interface ChatListProps {
  chats: ChatType[];
  setUser: React.Dispatch<React.SetStateAction<string>>;
}

export default function ChatList({ chats, setUser }: ChatListProps) {
  const router = useRouter();
  const { set } = useSearchQueryService();
  const [localSearch, setLocalSearch] = React.useState<string>("");
  const [selectedChatId, setSelectedChatId] = React.useState<string | null>(
    null
  );

  const debounce = useDebounce(localSearch, 500);

  const handleChatClick = (chat: ChatType) => {
    set({ user: `${chat?.userToName}` });
    setSelectedChatId(chat?.id);
  };

  useEffect(() => {
    if (debounce) {
      setUser(debounce.trim());
    } else {
      setUser("");
    }
  }, [debounce]);

  //   const lastMessagesResults = useQueries({
  //     queries: chats.map((chat) => ({
  //       queryKey: ["lastMessages", chat.id],
  //       queryFn: () => chatService.listMessages(chat.id, chat.session_token),
  //       enabled: !!chat.id && !!chat.session_token,
  //     })),
  //   });

  //   const lastMessage = (chatId: string) => {
  //     const chat = lastMessagesResults.find((result) => console.log(result.data));
  //     return chat.;
  //   };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4">
        <MyTextInput
          placeholder="Procurar"
          leftIcon={<MyIcon name="search" />}
          className="w-full"
          noHintText
          value={localSearch}
          onChange={(e) => {
            setLocalSearch(e.target.value);
          }}
        />
      </div>

      <div className="flex-1 overflow-y-auto">
        {chats &&
          chats.map((chat) => (
            <div
              key={chat?.id}
              className={cn(
                "flex items-center p-4 hover:bg-gray-50 cursor-pointer rounded-lg",
                selectedChatId === chat?.id && "bg-[#72c6eb]"
              )}
              onClick={() => handleChatClick(chat)}
            >
              <div className="relative">
                <Image
                  src={chat?.userToPhoto ?? "/user.png"}
                  alt={chat?.userToName ?? "User avatar"}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                {/* {chat.online && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
              )} */}
              </div>

              <div className="ml-3 flex-1">
                <div className="flex justify-between">
                  <span className="font-medium">{chat?.userToName}</span>
                  {/* <span className="text-sm text-gray-500">{chat.timestamp}</span> */}
                </div>
                {/* <p className="text-sm">
                  {lastMessage(chat?.id) ?? "Nenhuma mensagem"}
                </p> */}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
