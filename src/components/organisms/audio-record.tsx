"use client";

import React, { useState, useRef } from "react";
import MyIcon from "../atoms/my-icon";
import X from "../atoms/my-icon/elements/x";
import Check from "../atoms/my-icon/elements/check";

interface AudioRecorderProps {
  onAudioRecorded: (audioFile: File) => void;
}

const MIME_TYPE = "audio/webm";

export default function AudioRecorder({ onAudioRecorded }: AudioRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const resetRecorderState = () => {
    chunksRef.current = [];
    setIsRecording(false);
    if (timerRef.current) clearInterval(timerRef.current);
    setRecordingTime(0);
  };

  const startRecording = async () => {
    if (!MediaRecorder.isTypeSupported(MIME_TYPE)) {
      alert("Este navegador não suporta gravação em WEBM.");
      return;
    }

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    const mediaRecorder = new MediaRecorder(stream, { mimeType: MIME_TYPE });

    mediaRecorderRef.current = mediaRecorder;
    chunksRef.current = [];

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunksRef.current.push(event.data);
      }
    };

    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(chunksRef.current, { type: MIME_TYPE });

      // if (audioBlob.size === 0) {
      //   console.warn("Áudio vazio, cancelando envio.");
      //   return;
      // }

      const audioFile = new File([audioBlob], "audio-message.webm", {
        type: MIME_TYPE,
      });

      onAudioRecorded(audioFile);
      resetRecorderState();
      chunksRef.current = [];
    };

    mediaRecorder.start();

    setIsRecording(true);
    timerRef.current = setInterval(() => {
      setRecordingTime((prev) => prev + 1);
    }, 1000);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const cancelRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.onstop = null; // evita envio automático
      mediaRecorderRef.current.stop(); // para a gravação
    }
    chunksRef.current = [];
    setIsRecording(false);
    if (timerRef.current) clearInterval(timerRef.current);
    setRecordingTime(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  React.useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (mediaRecorderRef.current?.state === "recording") {
        mediaRecorderRef.current.stop();
      }
    };
  }, []);

  return (
    <div className="flex items-center gap-2">
      {isRecording ? (
        <div className="flex items-center gap-2 bg-red-50 px-4 py-2 rounded-full">
          <div className="animate-pulse w-2 h-2 bg-red-500 rounded-full" />
          <span className="text-sm">{formatTime(recordingTime)}</span>
          {/* <MyIcon
            name="x"
            className="cursor-pointer text-red-500"
            onClick={cancelRecording}
          /> */}
          <div
            className="cursor-pointer text-red-500"
            onClick={cancelRecording}
          >
            <X height="24" width="24" stroke="red" />
          </div>
          {/* <MyIcon
            name="check"
            className="cursor-pointer text-green-500"
            onClick={stopRecording}
          /> */}
          <div
            className="cursor-pointer text-green-500"
            onClick={stopRecording}
          >
            <Check height="24" width="24" />
          </div>
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
