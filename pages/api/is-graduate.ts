import { PrismaClient } from ".prisma/client";

// Fetch all posts (in /pages/api/posts.ts)
const prisma = new PrismaClient();
export default async function handle(req, res) {
  const user = await prisma.user.findMany();
  res.json(user);
}
