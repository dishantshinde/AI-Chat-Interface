export async function streamOllamaResponse(
  prompt: string,
  onChunk: (text: string) => void,
  controller: AbortController // <-- NEW
) {
  const response = await fetch("/api/ollama/stream", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt }),
    signal: controller.signal, // <-- Attach abort signal
  });

  if (!response.ok || !response.body) {
    throw new Error("Failed to connect to stream");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const text = decoder.decode(value, { stream: true });
      const lines = text.split("\n").filter((line) => line.startsWith("data:"));

      for (const line of lines) {
        const json = line.replace(/^data:\s*/, "");
        try {
          const parsed = JSON.parse(json);
          onChunk(parsed.message?.content || "");
        } catch (e) {
          console.error("Failed to parse chunk", json, e);
        }
      }
    }
  } catch (err) {
    if (controller.signal.aborted) {
      console.log("Fetch aborted");
    } else {
      console.error("Stream error", err);
    }
  }
}
