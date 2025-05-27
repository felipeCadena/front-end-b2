"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import MyIcon from "../atoms/my-icon";
import MyTextInput from "../atoms/my-text-input";
import { useDebounce } from "@/hooks/useDebounce";
import { cn } from "@/utils/cn";
import { formatSmartDateTime, getData } from "@/utils/formatters";
import MyButton from "../atoms/my-button";
import useChat from "@/store/useChat";
import useSearchQueryService from "@/services/use-search-query-service";
import { format, parseISO } from "date-fns";
import {
  MySelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../atoms/my-select";

interface ChatMessage {
  datetime: string;
  chatId: string;
  text: string;
  mediaId: string | null;
  sendedFromUserId: string;
  toUserId: string;
  isRead: boolean;
}

interface OrderScheduleAdventure {
  id: string;
  adventure: {
    id: string;
    title: string;
  };
  schedule: {
    id: string;
    datetime: string;
  };
}
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
  lastMessage?: ChatMessage | null;
  userToLastOnline?: string;
  orderScheduleAdventure: OrderScheduleAdventure | null; // substitua "any" pela tipagem correta se souber
}

interface ChatListProps {
  chats: ChatType[];
  setUser: React.Dispatch<React.SetStateAction<string>>;
}

export default function ChatList({ chats, setUser }: ChatListProps) {
  const router = useRouter();
  const [localSearch, setLocalSearch] = React.useState<string>("");
  const [selectedChatId, setSelectedChatId] = React.useState<string | null>(
    null
  );
  const [sortOption, setSortOption] = React.useState<"active" | "unread">(
    "unread"
  );

  const [mobile, setMobile] = React.useState<boolean>(false);
  const { setChat } = useChat();
  const { params, clear } = useSearchQueryService();

  const debounce = useDebounce(localSearch, 500);

  const handleChatClick = (chat: ChatType) => {
    clear();
    setChat({
      userToName: chat?.userToName,
      id: chat?.id,
      session_token: chat?.session_token,
      userToPhoto: chat?.userToPhoto,
      userToId: chat?.userToId,
    });
    setSelectedChatId(chat?.id);

    if (mobile) {
      router.push(`chat/${chat?.id}`);
    }
  };

  useEffect(() => {
    if (debounce) {
      setUser(debounce.trim());
    } else {
      setUser("");
    }

    if (params?.id) {
      setSelectedChatId(params?.id);
    }
  }, [debounce, params]);

  useEffect(() => {
    if (window) {
      const isMobile = window.innerWidth < 768;
      setMobile(isMobile);
    }
  }, []);

  const sortedChats = React.useMemo(() => {
    if (!chats) return [];

    if (sortOption === "active") {
      return [...chats].sort(
        (a, b) => (b.session_token ? 1 : 0) - (a.session_token ? 1 : 0)
      );
    }

    if (sortOption === "unread") {
      return [...chats].sort((a, b) => {
        const aUnread = a.lastMessage && !a.lastMessage.isRead ? 1 : 0;
        const bUnread = b.lastMessage && !b.lastMessage.isRead ? 1 : 0;
        return bUnread - aUnread;
      });
    }

    return chats;
  }, [chats, sortOption]);

  return (
    <div className="h-screen flex flex-col">
      <div className="px-4 py-6 space-y-4 border-b">
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
        <div className="">
          <MySelect
            label="Ordernar por"
            className="text-base text-black"
            value={sortOption}
            onValueChange={(value) => {
              setSortOption(value as "active" | "unread");
            }}
          >
            <SelectTrigger className="py-6">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem key="Não lidas" value="unread">
                Não lidas
              </SelectItem>
              <SelectItem key="Mais Recentes" value="active">
                Mais Recentes
              </SelectItem>
            </SelectContent>
          </MySelect>
        </div>
      </div>

      {chats?.length === 0 && (
        <div className="md:hidden flex flex-col items-center justify-center gap-4 mt-12">
          <p className="text-center font-bold">
            Você ainda não tem chats ativos
          </p>
          <MyButton
            variant="default"
            borderRadius="squared"
            className=""
            onClick={() => router.back()}
          >
            Voltar
          </MyButton>
        </div>
      )}

      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {sortedChats &&
          sortedChats.map((chat) => (
            <div
              key={chat?.id}
              className={cn(
                "flex items-center p-4 hover:bg-gray-50 cursor-pointer rounded-lg mr-1 border-b",
                selectedChatId === chat?.id && "bg-[#2DADE4]/20"
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
              </div>

              <div className="ml-3 flex-1 space-y-1">
                <div className="flex justify-between gap-4">
                  <span className="font-medium">{chat?.userToName}</span>
                </div>

                {chat?.openIn && chat?.closeIn && chat?.session_token && (
                  <span className="text-xs">
                    <span className="font-semibold">Chat ativo: </span>
                    {`${format(parseISO(chat.openIn), "dd/MM")} de ${format(parseISO(chat.openIn), "HH:mm")} às ${format(parseISO(chat.closeIn), "HH:mm")}`}
                  </span>
                )}

                {chat?.lastMessage && chat?.lastMessage?.text ? (
                  <p className="text-sm font-bold">
                    {chat?.lastMessage?.text.slice(0, 40).concat("...")}
                  </p>
                ) : (
                  !chat?.session_token && (
                    <p className="text-gray-400 text-xs">Chat encerrado</p>
                  )
                )}

                {chat?.userToLastOnline && chat?.session_token && (
                  <p className="text-xs opacity-70">
                    Visto por último{" "}
                    {formatSmartDateTime(chat?.userToLastOnline)}
                  </p>
                )}
                {chat?.orderScheduleAdventure && (
                  <p className="text-gray-600 text-xs">
                    <span className="font-bold">Atividade:</span>{" "}
                    {chat?.orderScheduleAdventure?.adventure?.title}
                  </p>
                )}
              </div>
              {chat?.lastMessage && !chat?.lastMessage?.isRead && (
                <div className="w-3 h-3 bg-[#2DADE4] rounded-full" />
              )}
            </div>
          ))}
      </div>
    </div>
  );
}
