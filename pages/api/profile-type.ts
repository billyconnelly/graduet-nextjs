import type { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const ProfileType = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "PATCH") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const isGraduate: boolean = JSON.parse(req.body);
    const savedIsGraduate = await prisma.user.update({
      where: { email: "billyconnelly1998@gmail.com" },
      data: isGraduate,
    });
    res.status(200).json(savedIsGraduate);
  } catch (err) {
    res.status(400).json({ message: "Something went wrong" });
  }
};

export default ProfileType;
