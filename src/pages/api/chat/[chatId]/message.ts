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
    const { chatId } = req.query;
    const { content, role } = req.body;

    if (!chatId || typeof chatId !== "string") {
      return res.status(400).json({ error: "Invalid chat ID" });
    }
    if (!content || typeof content !== "string") {
      return res.status(400).json({ error: "Invalid message content" });
    }

    // Create the message
    const message = await prisma.message.create({
      data: {
        content,
        role,
        chat: {
          connect: { id: chatId },
        },
      },
    });

    const messageCount = await prisma.message.count({
      where: { chatId },
    });

    if (messageCount === 1) {
      const words = content.trim().split(/\s+/);
      const title = words.slice(0, 5).join(" ");

      await prisma.chat.update({
        where: { id: chatId },
        data: { name: title },
      });
    }

    return res.status(200).json(message);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong", error });
  }
}
