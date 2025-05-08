"use client";
import React from "react";

import Image from "next/image";
import { useRouter } from "next/navigation";
import MyIcon from "../atoms/my-icon";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { chatService } from "@/services/api/chats";
import Options from "../atoms/my-icon/elements/options";
import { useEffect } from "react";
import { toast } from "react-toastify";
import MyTextInput from "../atoms/my-text-input";
import { getHora } from "@/utils/formatters";

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

interface ChatMessagesProps {
  chat: ChatType;
  user: string;
}

export default function ChatMessages({ chat, user }: ChatMessagesProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [message, setMessage] = React.useState("");

  const { data: messages } = useQuery({
    queryKey: ["messages", chat?.id],
    queryFn: () =>
      chatService.listMessages(chat?.id ?? "", chat?.session_token ?? ""),
    enabled: !!chat?.id,
    refetchInterval: 5000,
  });

  const handleSendMessage = async () => {
    try {
      await chatService.sendMessage(
        chat?.id ?? "",
        { text: message },
        chat?.session_token ?? ""
      );
      queryClient.invalidateQueries({ queryKey: ["messages"] });
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message");
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center p-4">
        <MyIcon
          name="left"
          className="mr-4 cursor-pointer md:hidden"
          onClick={() => router.back()}
        />

        <Image
          src={chat?.userToPhoto ?? "/user.png"}
          alt="User avatar"
          width={40}
          height={40}
          className="rounded-full"
        />

        <div className="ml-3 flex-1">
          <h2 className="font-medium">{chat?.userToName}</h2>
        </div>

        <Options width="20" height="5" />
      </div>

      <div className="flex-1 flex flex-col-reverse overflow-y-auto p-4 gap-2">
        {messages &&
          messages?.map((message: any, index: number) => (
            <div
              key={index}
              className={`flex ${
                message?.sendedFromUserId === user
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`rounded-lg p-3 max-w-[70%] ${
                  message?.sendedFromUserId === user
                    ? "bg-[#2DADE4] text-white"
                    : "bg-gray-100"
                }`}
              >
                <p>{message?.text}</p>
                <span
                  className={`text-xs ${
                    message?.sendedFromUserId === user
                      ? "opacity-75 flex justify-end"
                      : "text-gray-600"
                  } mt-1`}
                >
                  {getHora(message?.datetime)}
                  {message?.isRead &&
                    message?.sendedFromUserId === user &&
                    " • Visto"}
                </span>
              </div>
            </div>
          ))}
      </div>

      <div className="p-4">
        <div className="flex items-center gap-2">
          <MyIcon name="plus" className="cursor-pointer" />
          <MyTextInput
            type="text"
            placeholder="Digite uma mensagem..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSendMessage();
              }
            }}
          />
          <MyIcon
            name="send-message"
            className="cursor-pointer"
            onClick={handleSendMessage}
            // onKeyDown={(e) => {
            //   if (e.key === "Enter") {
            //     handleSendMessage();
            //   }
            // }}
          />
          {/* <MyIcon name="left" className="cursor-pointer" /> */}
        </div>
      </div>
    </div>
  );
}
