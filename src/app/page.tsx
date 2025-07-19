"use client";

import React, { useState, useEffect, useRef } from "react";
import Sidebar from "@/components/Sidebar";
import ChatArea from "@/components/ChatArea";
import { MessageType } from "@/types";
import { streamOllamaResponse } from "@/lib/ollama";

type ChatType = {
  id: string;
  name: string;
  date: string;
};

export default function Home() {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [chats, setChats] = useState<ChatType[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);

  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchChats = () => {
    fetch("/api/chats")
      .then((res) => res.json())
      .then((data) => setChats(data))
      .catch((err) => console.error("Failed to fetch chats", err));
  };
  useEffect(() => {
    fetchChats();
  }, []);

  const onNewChat = async () => {
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`API error: ${res.status} - ${errorText}`);
      }

      const data = await res.json();
      if (data?.chat) {
        setActiveChatId(data.chat.id);
        setMessages([]);
      }
      fetchChats();
    } catch (error) {
      console.error("New chat creation failed:", error);
    }
  };

  const handleSelectChat = async (chatId: string) => {
    setActiveChatId(chatId);
    try {
      const res = await fetch(`/api/chat/${chatId}`);
      const data = await res.json();
      setMessages(data.messages);
    } catch (error) {
      console.error("Failed to fetch messages", error);
    }
  };

  const onStop = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setIsStreaming(false);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden max-w-[100vw]">
      <Sidebar
        onNewChat={onNewChat}
        chats={chats}
        onSelectChat={handleSelectChat}
      />
      <div className="flex-1 flex flex-col min-h-0 overflow-x-hidden">
        <ChatArea
          messages={messages}
          setMessages={setMessages}
          activeChatId={activeChatId}
          isStreaming={isStreaming}
          onStop={onStop}
          fetchChats={fetchChats}
        />
      </div>
    </div>
  );
}
