"use client";

import React, { useState, useRef } from "react";
import MyIcon from "../atoms/my-icon";

interface AudioRecorderProps {
  onAudioRecorded: (audioFile: File) => void;
}

export default function AudioRecorder({ onAudioRecorded }: AudioRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(chunksRef.current, { type: "audio/webm" });
        const audioFile = new File([audioBlob], "audio-message.webm", {
          type: "audio/webm",
        });
        onAudioRecorded(audioFile);

        // Limpa o timer e reseta o tempo
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
        setRecordingTime(0);

        // Para todas as tracks do stream
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);

      // Inicia o timer
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } catch (error) {
      console.error("Erro ao iniciar gravação:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const cancelRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      chunksRef.current = [];
      setIsRecording(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      setRecordingTime(0);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex items-center gap-2">
      {isRecording ? (
        <div className="flex items-center gap-2 bg-red-50 px-4 py-2 rounded-full">
          <div className="animate-pulse w-2 h-2 bg-red-500 rounded-full" />
          <span className="text-sm">{formatTime(recordingTime)}</span>
          <MyIcon
            name="x"
            className="cursor-pointer text-red-500"
            onClick={cancelRecording}
          />
          <MyIcon
            name="check"
            className="cursor-pointer text-green-500"
            onClick={stopRecording}
          />
        </div>
      ) : (
        <MyIcon
          name="audio"
          className="cursor-pointer"
          onClick={startRecording}
        />
      )}
    </div>
  );
}
