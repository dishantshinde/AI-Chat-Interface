// pages/api/chats.ts
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const chats = await prisma.chat.findMany({
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
}
