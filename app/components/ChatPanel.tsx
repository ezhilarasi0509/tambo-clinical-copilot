"use client";

import { useState } from "react";

type Props = {
  onSend: (text: string) => void;
};

export default function ChatPanel({ onSend }: Props) {
  const [value, setValue] = useState("");
  const [isPending, setIsPending] = useState(false);

  const handleSend = async () => {
    const trimmed = value.trim();
    if (!trimmed || isPending) return;
    setIsPending(true);
    try {
      onSend(trimmed);
      setValue("");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="flex items-center gap-2 pt-2 border-t border-zinc-200">
      <input
        className="flex-1 rounded-xl border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
        placeholder="Ask about clinical data, patients, or diagnostics..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
          }
        }}
      />
      <button
        type="button"
        onClick={handleSend}
        className="px-4 py-2 rounded-xl bg-blue-500 text-white text-sm font-medium hover:bg-blue-600 disabled:opacity-50"
        disabled={!value.trim() || isPending}
      >
        Send
      </button>
    </div>
  );
}
