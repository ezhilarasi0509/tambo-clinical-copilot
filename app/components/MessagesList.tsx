"use client";

import { useEffect, useMemo } from "react";
import { useTamboThread } from "@tambo-ai/react";
import { usePatientContext } from "../PatientContext";

export default function MessagesList() {
  const threadCtx = useTamboThread();
  const { setActivePatientId } = usePatientContext();

  const currentThread = threadCtx?.currentThread;
  const messages = currentThread?.messages ?? [];
  const isLoading = currentThread?.isLoading ?? false;

  const lastPatientIdInAssistant = useMemo(() => {
    for (let i = messages.length - 1; i >= 0; i--) {
      const m = messages[i];
      if (m.role !== "assistant") continue;

      let text = "";
      if (typeof m.content === "string") {
        text = m.content;
      } else if (Array.isArray(m.content)) {
        const textPart = m.content.find(
          (part: any) =>
            part.type === "text" || part.type === "assistant_message",
        );
        text =
          textPart?.text ??
          textPart?.content?.text ??
          JSON.stringify(textPart ?? m.content);
      } else if (m.content?.text) {
        text = m.content.text;
      } else {
        text = JSON.stringify(m.content);
      }

      const idMatch = text.match(/\b[pP][0-9]+\b/);
      if (idMatch) {
        return idMatch[0].toLowerCase();
      }
    }
    return null;
  }, [messages]);

  useEffect(() => {
    if (lastPatientIdInAssistant) {
      setActivePatientId(lastPatientIdInAssistant);
    }
  }, [lastPatientIdInAssistant, setActivePatientId]);

  if (isLoading && messages.length === 0) {
    return (
      <div className="mb-4 text-sm text-zinc-500">
        Loading conversation...
      </div>
    );
  }

  if (!messages || messages.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-2 max-h-64 overflow-y-auto">
      {messages.map((m: any) => {
        if (m.role === "user") {
          let userText = "";

          if (typeof m.content === "string") {
            userText = m.content;
          } else if (Array.isArray(m.content)) {
            const part = m.content.find((p: any) => p.type === "text");
            userText =
              part?.text ??
              part?.content?.text ??
              JSON.stringify(m.content);
          } else if (m.content?.text) {
            userText = m.content.text;
          } else {
            userText = JSON.stringify(m.content);
          }

          userText = userText.replace(/\\n/g, "\n");

          return (
            <div
              key={m.id}
              className="self-end bg-blue-600 text-white rounded-xl px-3 py-2 max-w-md ml-auto whitespace-pre-wrap"
            >
              {userText}
            </div>
          );
        }

        if (m.role !== "assistant") return null;

        let text = "";

        if (typeof m.content === "string") {
          text = m.content;
        } else if (Array.isArray(m.content)) {
          const textPart = m.content.find(
            (part: any) =>
              part.type === "text" || part.type === "assistant_message",
          );
          text =
            textPart?.text ??
            textPart?.content?.text ??
            JSON.stringify(textPart ?? m.content);
        } else if (m.content?.text) {
          text = m.content.text;
        } else {
          text = JSON.stringify(m.content);
        }

        text = text.replace(/\\n/g, "\n");

        return (
          <div
            key={m.id}
            className="flex flex-col gap-2 self-start max-w-md"
          >
            {text && (
              <div className="bg-zinc-100 text-zinc-900 rounded-xl px-3 py-2 whitespace-pre-wrap">
                {text}
              </div>
            )}

            {m.renderedComponent && (
              <div className="mt-1">{m.renderedComponent}</div>
            )}
          </div>
        );
      })}
    </div>
  );
}
