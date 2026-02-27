"use client";

type Props = {
  onAction: (action: "summary" | "triage" | "orders") => void;
};

export default function QuickActions({ onAction }: Props) {
  const handleSummary = () => onAction("summary");
  const handleTriage = () => onAction("triage");
  const handleNextOrders = () => onAction("orders");

  return (
    <div className="flex flex-wrap justify-end gap-2 mb-2">
      <button
        type="button"
        onClick={handleSummary}
        className="px-3 py-1.5 rounded-full bg-zinc-100 text-xs text-zinc-700 hover:bg-zinc-200"
      >
        Summarize
      </button>
      <button
        type="button"
        onClick={handleTriage}
        className="px-3 py-1.5 rounded-full bg-zinc-100 text-xs text-zinc-700 hover:bg-zinc-200"
      >
        Triage
      </button>
      <button
        type="button"
        onClick={handleNextOrders}
        className="px-3 py-1.5 rounded-full bg-zinc-100 text-xs text-zinc-700 hover:bg-zinc-200"
      >
        Next 2 orders
      </button>
    </div>
  );
}
