"use client";
import React, { useState, useRef } from "react";
import Message from "./Message";
import InputBox from "./InputBox";
import { streamOllamaResponse } from "@/lib/ollama";
import { v4 as uuidv4 } from "uuid";

type MessageType = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

type ChatAreaProps = {
  messages: MessageType[];
  setMessages: React.Dispatch<React.SetStateAction<MessageType[]>>;
  isStreaming: boolean;
  onStop: () => void;
  activeChatId: string | null;
  fetchChats?: () => void;
};

const ChatArea: React.FC<ChatAreaProps> = ({
  messages,
  setMessages,
  isStreaming,
  onStop,
  activeChatId,
  fetchChats,
}) => {
  const [streaming, setStreaming] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const handleSend = async (prompt: string) => {
    if (!prompt.trim()) return;

    const userMessage = {
      id: uuidv4(),
      role: "user" as const,
      content: prompt,
    };

    setMessages((prev) => [...prev, userMessage]);

    const assistantMessage = {
      id: uuidv4(),
      role: "assistant" as const,
      content: "",
    };

    setMessages((prev) => [...prev, assistantMessage]);

    const controller = new AbortController();
    abortControllerRef.current = controller;
    setStreaming(true);

    let fullResponse = "";

    try {
      await streamOllamaResponse(
        prompt,
        (chunk: string) => {
          fullResponse += chunk;
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantMessage.id
                ? { ...msg, content: fullResponse }
                : msg
            )
          );
        },
        controller
      );

      await fetch(`/api/chat/${activeChatId}/message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          role: "user",
          content: prompt,
        }),
      });
      await fetch(`/api/chat/${activeChatId}/message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          role: "assistant",
          content: fullResponse,
        }),
      });
      if (messages.length <= 4) {
        fetchChats?.();
      }
    } catch (error) {
      if (controller.signal.aborted) {
        console.log("Stream aborted.");
      } else {
        console.error("Failed to save messages:", error);
      }
    } finally {
      setStreaming(false);
    }
  };

  const handleStop = () => {
    abortControllerRef.current?.abort();
    setStreaming(false);
  };

  return (
    <>
      {activeChatId && (
        <div className="flex-1 flex flex-col overflow-y-auto overflow-x-hidden max-w-full">
          <div className="flex-1 p-4 space-y-4 break-words">
            {messages.map((message) => (
              <Message
                key={message.id}
                sender={message.role}
                content={message.content}
              />
            ))}
          </div>
          <InputBox
            onSend={handleSend}
            isStreaming={streaming}
            onStop={handleStop}
          />
        </div>
      )}
    </>
  );
};

export default ChatArea;
