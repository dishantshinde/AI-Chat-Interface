"use client";
import React, { useState } from "react";
import ChatList from "./Chatlist";
import { Menu } from "lucide-react";

type SidebarProps = {
  onNewChat: () => void;
  chats: { id: string; name: string; date: string }[];
  onSelectChat: (chatId: string) => void;
};

const Sidebar: React.FC<SidebarProps> = ({
  onNewChat,
  chats,
  onSelectChat,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-blue-500 p-2 rounded text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu />
      </button>

      <div
        className={`fixed top-0 left-0 h-full bg-gray-100 p-4 border-r z-40 transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        w-1/2 md:relative md:translate-x-0 md:w-1/4`}
      >
        <button
          type="button"
          onClick={onNewChat}
          className="w-full bg-blue-500 text-white py-2 rounded mb-4"
        >
          New Chat
        </button>
        <ChatList chats={chats} onSelectChat={onSelectChat} />
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-40 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
