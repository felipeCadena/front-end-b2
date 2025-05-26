"use client";

import React from "react";
import MyLogo from "@/components/atoms/my-logo";
import ChatList from "@/components/organisms/chat-list";
import ChatMessages from "@/components/organisms/chat-messages";
import { chatService } from "@/services/api/chats";
import useSearchQueryService from "@/services/use-search-query-service";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import MyButton from "@/components/atoms/my-button";
import { useRouter } from "next/navigation";
import useChat from "@/store/useChat";
import MyIcon from "@/components/atoms/my-icon";
import MyTypography from "@/components/atoms/my-typography";

export default function Chat() {
  const { params } = useSearchQueryService();
  const queryClient = useQueryClient();
  const [user, setUser] = React.useState<string>("");
  const router = useRouter();
  const { chat, setChat } = useChat();

  const { data: chats } = useQuery({
    queryKey: ["chats", user],
    queryFn: () => chatService.getMyChats({ name: user, limit: 50 }),
    refetchInterval: 5000,
  });

  // const { data: chatById } = useQuery({
  //   queryKey: ["chatById", params?.id],
  //   queryFn: () =>
  //     chatService.listMessages(params?.id ?? "", chat?.session_token ?? ""),
  //   enabled: !!params?.id,
  //   refetchInterval: 5000,
  // });

  // useEffect(() => {
  //   queryClient.invalidateQueries({ queryKey: ["chat"] });
  //   queryClient.invalidateQueries({ queryKey: ["messages"] });
  // }, [params?.user]);

  return (
    <main>
      <div className="px-4 flex gap-1 items-center md:mb-4">
        <MyIcon
          name="voltar-black"
          className=""
          onClick={() => router.back()}
        />
        <MyTypography
          variant="subtitle3"
          weight="bold"
          className="text-lg md:text-xl"
        >
          Chat
        </MyTypography>
      </div>

      <div className="min-h-[75vh] max-h-screen overflow-y-hidden bg-white md:border rounded-2xl shadow-md px-4 mb-6">
        <div className="md:hidden">
          <ChatList chats={chats} setUser={setUser} />
        </div>

        <div className="flex min-h-[75vh] max-h-screen max-sm:hidden">
          <div className="w-1/3">
            <ChatList chats={chats} setUser={setUser} />
          </div>
          <div className="w-[2rem] bg-gray-500 mx-4 rounded" />
          <div className="w-2/3">
            {chat?.id ? (
              <ChatMessages chat={chat} />
            ) : (
              <div className="flex flex-col items-center justify-center gap-4 mt-12">
                <MyLogo variant="web" />
                {chats && chats?.length > 0 ? (
                  <p className="font-bold">Selecione um chat para começar</p>
                ) : (
                  <div className="flex flex-col items-center justify-center gap-4 mt-2">
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
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
