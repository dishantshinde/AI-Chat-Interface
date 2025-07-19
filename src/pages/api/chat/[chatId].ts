import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const { chatId } = req.query;
  if (!chatId || typeof chatId !== "string") {
    return res.status(400).json({ error: "Invalid chat ID" });
  }

  try {
    const chat = await prisma.chat.findUnique({
      where: { id: chatId },
      include: { messages: true },
    });

    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
}
