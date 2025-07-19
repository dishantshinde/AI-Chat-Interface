import React, { useState } from "react";

interface InputBoxProps {
  onSend: (prompt: string) => void;
  isStreaming: boolean;
  onStop: () => void;
}

const InputBox: React.FC<InputBoxProps> = ({ onSend, isStreaming, onStop }) => {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    onSend(input);
    setInput("");
  };

  return (
    <div className="flex items-center p-4 border-t">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-1 border rounded px-3 py-2 resize-none"
        rows={1}
        placeholder="Type your message..."
      />
      <button
        onClick={handleSend}
        className="ml-2 bg-green-500 text-white px-4 py-2 rounded"
        disabled={isStreaming}
      >
        Send
      </button>
      {isStreaming && (
        <button
          onClick={onStop}
          className="ml-2 bg-red-500 text-white px-4 py-2 rounded"
        >
          Stop
        </button>
      )}
    </div>
  );
};

export default InputBox;
