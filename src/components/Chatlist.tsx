"use client";
import { useEffect, useMemo, useState } from "react";

type ChatType = { id: string; name: string; date: string };

type ChatListProps = {
  chats: { id: string; name: string; date: string }[];
  onSelectChat: (chatId: string) => void;
};

const ChatList: React.FC<ChatListProps> = ({ chats = [], onSelectChat }) => {
  return (
    <ul>
      {chats.map((chat) => (
        <li
          key={chat.id}
          className="mb-2 cursor-pointer hover:bg-gray-200 p-2 rounded"
          onClick={() => onSelectChat(chat.id)}
        >
          <div className="font-semibold">{chat.name}</div>
          <div className="text-xs text-gray-500">{chat.date}</div>
        </li>
      ))}
    </ul>
  );
};

export default ChatList;
