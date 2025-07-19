import React from "react";
import ReactMarkdown from "react-markdown";

type MessageProps = {
  sender: "user" | "assistant";
  content: string;
};

const Message: React.FC<MessageProps> = ({ sender, content }) => {
  const isUser = sender === "user";
  return (
    <div className={`mb-4 ${isUser ? "text-right" : "text-left"}`}>
      <div
        className={`inline-block px-4 py-2 rounded-lg ${
          isUser ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
        } whitespace-pre-wrap break-words max-w-[100%] overflow-hidden`}
      >
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
};

export default Message;
