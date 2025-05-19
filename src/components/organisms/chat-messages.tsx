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
import Plus from "../atoms/my-icon/elements/plus";
import AudioRecorder from "./audio-record";
import AudioMessage from "./audio-message";
import { Dropzone } from "../molecules/drop-zone";
import MyBadge from "../atoms/my-badge";

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
  chat: any;
}

export default function ChatMessages({ chat }: ChatMessagesProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [message, setMessage] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [file, setFile] = React.useState<File[] | null>(null);

  const handleClickUpload = () => {
    inputRef.current?.click();
  };

  const handleAudioRecorded = async (audioFile: File) => {
    const audioBuffer = await audioFile.arrayBuffer();
    const audioBlob = new Blob([audioBuffer]);
    try {
      await chatService.sendMedia(chat?.id, audioBlob, chat?.session_token, {
        text: message,
        media: {
          mimetype: audioFile.type,
          filename: audioFile.name,
        },
      });
      queryClient.invalidateQueries({ queryKey: ["messages"] });
      setMessage("");
      console.log("Áudio gravado:", audioFile);
    } catch (error) {
      console.error("Erro ao enviar áudio:", error);
      toast.error("Erro ao enviar mensagem de áudio");
    }
  };

  const { data: messages } = useQuery({
    queryKey: ["messages", chat?.id],
    queryFn: () =>
      chatService.listMessages(chat?.id ?? "", chat?.session_token ?? ""),
    enabled: !!chat?.id,
    refetchInterval: 5000,
  });

  const uploadImage = async (file: File) => {
    if (file) {
      const imageBuffer = await file.arrayBuffer();
      const imageBlob = new Blob([imageBuffer]);
      try {
        await chatService.sendMedia(chat?.id, imageBlob, chat?.session_token, {
          text: message,
          media: {
            mimetype: file.type,
            filename: file.name,
          },
        });
        setMessage("");
        setFile(null);
        queryClient.invalidateQueries({ queryKey: ["messages"] });
        console.log("Imagem enviada:", file);
      } catch (error) {
        console.error("Erro ao enviar imagem:", error);
        toast.error("Erro ao enviar imagem");
      }
    }
  };

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

  // useEffect(() => {
  //   if (window && document) {
  //     window.scrollTo(0, document.body.scrollHeight);
  //   }
  // }, []);

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center p-4">
        <MyIcon
          name="left"
          className="mr-4 cursor-pointer md:hidden z-30"
          onClick={() => router.back()}
        />

        <Image
          src={chat?.userToPhoto ?? "/user.png"}
          alt="User avatar"
          width={40}
          height={40}
          className="rounded-full"
        />

        <div className="ml-3 flex gap-4 items-center">
          <h2 className="font-medium">{chat?.userToName}</h2>
          {!chat?.session_token && (
            <MyBadge variant="error">Chat encerrado</MyBadge>
          )}
        </div>

        {/* <Options width="20" height="5" /> */}
      </div>

      <div className="flex-1 flex flex-col-reverse overflow-y-auto scrollbar-thin p-4 gap-2">
        {messages &&
          messages?.map((message: any, index: number) => (
            <div
              key={index}
              className={`flex ${
                message?.sendedFromUserId === chat?.userToId
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`rounded-lg p-3 md:max-w-[70%] ${
                  message?.sendedFromUserId === chat?.userToId
                    ? "bg-[#2DADE4] text-white"
                    : "bg-gray-100"
                }`}
              >
                {message?.media &&
                message?.media?.mimetype?.includes("audio") ? (
                  <AudioMessage
                    key={message?.media?.id}
                    id={message?.media?.id}
                    url={message?.media?.url}
                    mimetype={message?.media?.mimetype}
                    timestamp={
                      message.createdAt
                        ? new Date(message.createdAt).toLocaleTimeString()
                        : undefined
                    }
                    isOwn={message.senderId === chat?.userToId}
                  />
                ) : (
                  message?.media?.url && (
                    <Image
                      src={message?.media?.url}
                      alt="Imagem"
                      width={600}
                      height={600}
                      className="w-full h-[20rem] md:w-[30rem] rounded-lg object-cover"
                    />
                  )
                )}
                <p className="mt-1">{message?.text}</p>
                <span
                  className={`text-xs ${
                    message?.sendedFromUserId === chat?.userToId
                      ? "opacity-75 flex justify-end"
                      : "text-gray-600"
                  } mt-1`}
                >
                  {getHora(message?.datetime)}
                  {message?.isRead &&
                    message?.sendedFromUserId === chat?.userToId &&
                    " • Visto"}
                </span>
              </div>
            </div>
          ))}
      </div>

      {chat?.session_token ? (
        <div className="flex items-center gap-3 p-4 mb-4">
          <MyTextInput
            type="text"
            placeholder="Digite uma mensagem..."
            value={message}
            className="border-0 bg-gray-200"
            onChange={(e) => setMessage(e.target.value)}
            rightIcon={
              <Dropzone
                ref={inputRef}
                small
                className="cursor-pointer"
                onChange={(fileList) => {
                  if (fileList) {
                    uploadImage(fileList[0]);
                    setFile(Array.from(fileList));
                  }
                }}
                multiple
                accept="jpg, png, image/*"
              >
                <div onClick={handleClickUpload}>
                  <Plus fill="#2DADE4" className="cursor-pointer" />
                </div>
              </Dropzone>
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSendMessage();
              }
            }}
          />
          <AudioRecorder onAudioRecorded={handleAudioRecorded} />
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
        </div>
      ) : (
        <p className="text-gray-400 text-center text-xl my-4">Chat encerrado</p>
      )}
    </div>
  );
}
