"use client";

import React, { useRef, useState } from "react";
import MyIcon from "../atoms/my-icon";
import MySpinner from "../atoms/my-spinner";
import AudioWaveform from "./audio-wave";

interface AudioMessageProps {
  id: string;
  url: string;
  mimetype: string;
  timestamp?: string; // opcional
  isOwn?: boolean; // opcional
}

export default function AudioMessage({
  id,
  url,
  mimetype,
  timestamp = new Date().toLocaleTimeString(), // valor default
  isOwn = false, // valor default
}: AudioMessageProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const getAudioDuration = async () => {
    try {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      const audioContext = new AudioContext();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
      setDuration(audioBuffer.duration);
    } catch (error) {
      console.error("Erro ao obter duração:", error);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current && url) {
      //   setDuration(audioRef.current.duration);
      setIsLoading(false);

      getAudioDuration();
    }
  };

  const handleError = () => {
    setIsLoading(false);
    console.error("Erro ao carregar áudio:", url);
    // Você pode adicionar um toast.error aqui se quiser
  };

  const formatTime = (time: number) => {
    const minutes = Math.round(time / 60);
    const seconds = Math.round(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className={`flex w-full ${isOwn ? "justify-end" : "justify-start"}`}>
      <div
        className={`rounded-lg p-3 w-full ${
          isOwn ? "bg-[#2DADE4] text-white" : "bg-gray-400"
        }`}
      >
        <div className="flex items-center gap-1">
          {isLoading ? (
            <div className="w-8 h-8 flex items-center justify-center">
              <MySpinner />
            </div>
          ) : (
            <button
              onClick={togglePlay}
              className="w-8 h-8 flex items-center justify-center rounded-full"
            >
              <MyIcon
                name={isPlaying ? "pause" : "play"}
                className={isOwn ? "bg-[#2DADE4] text-white" : "bg-gray-400"}
              />
            </button>
          )}

          {/* <div className="flex-1">
            <div
              className={`h-1 ${
                isOwn ? "bg-[#2DADE4] text-white" : "bg-gray-400"
              } rounded`}
            >
              <div
                className={`h-full ${
                  isOwn ? "bg-[#2DADE4] text-white" : "bg-gray-400"
                } rounded transition-all duration-300`}
                style={{
                  width: `${(currentTime / duration) * 100}%`,
                }}
              />
            </div>
          </div> */}

          <span className="text-xs text-white  text-right">
            {formatTime(isPlaying ? currentTime : duration)}
          </span>
        </div>

        <div className="flex-1">
          <AudioWaveform
            duration={Math.round(duration)}
            currentTime={currentTime}
            isPlaying={isPlaying}
          />
        </div>

        <audio
          ref={audioRef}
          src={url}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onError={handleError}
          onEnded={() => setIsPlaying(false)}
        />

        {/* <div className="flex justify-end mt-1">
          <span
            className={`text-xs ${
              isOwn ? "bg-[#2DADE4] text-white" : "bg-gray-100"
            }`}
          >
            {timestamp}
          </span>
        </div> */}
      </div>
    </div>
  );
}
