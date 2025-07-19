import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const chat = await prisma.chat.create({
      data: {
        name: "New Chat",
      },
    });

    const formattedChat = {
      id: chat.id,
      name: chat.name,
      date: new Intl.DateTimeFormat("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }).format(chat.createdAt),
    };

    return res.status(200).json({ chat: formattedChat });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong", error });
  }
}
