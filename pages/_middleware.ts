import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const session = await getToken({ req, secret: process.env.SECRET });
  console.log("SESSION HERE: ", session.email);

  // app.
  //   res.json(posts);get("/feed", async (req, res) => {
  //   const posts = await prisma.user.findMany({
  //     where: { published: true },
  //     include: { author: true },
  //   });
  //   res.json(posts);
  // });
  // You could also check for any property on the session object,

  // like rolec === “admin” or name === "John Doe", etc.

  // if (!session) return NextResponse.redirect("/api/auth/signin");

  // If user is authenticated, continue.
  return NextResponse.next();
}
