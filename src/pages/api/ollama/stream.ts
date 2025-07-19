// pages/api/ollama/stream.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { PassThrough } from "stream";

// Disable default body parsing for streaming
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end("Method Not Allowed");
  }

  try {
    const chunks: Uint8Array[] = [];

    req.on("data", (chunk) => chunks.push(chunk));
    req.on("end", async () => {
      const body = JSON.parse(Buffer.concat(chunks).toString());
      const { prompt } = body;

      const fetchRes = await fetch("http://localhost:11434/api/chat", {
        method: "POST",
        body: JSON.stringify({
          model: "gemma3:1b",
          messages: [{ role: "user", content: prompt }],
          stream: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const reader = fetchRes.body!.getReader();
      const decoder = new TextDecoder();

      // Set streaming headers
      res.writeHead(200, {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
        "X-Accel-Buffering": "no",
      });
      const stream = new PassThrough();
      stream.pipe(res);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const text = decoder.decode(value);
        const lines = text.split("\n").filter((line) => line.trim() !== "");

        for (const line of lines) {
          if (line === "[DONE]") continue;

          stream.write(`data: ${line}\n\n`);
        }
      }

      stream.end();
    });
  } catch (err) {
    console.error("Stream error:", err);
    res.status(500).end("Internal Server Error");
  }
}
