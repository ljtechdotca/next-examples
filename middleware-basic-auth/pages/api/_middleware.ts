import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  try {
    const auth = req.headers.get("authorization");
    if (!auth) throw new Error("Authorization is Undefined");
    const token = auth.split(" ")[1];
    const [user, pwd] = Buffer.from(token, "base64").toString().split(":");
    console.log({ user, pwd });
    if (user !== "ljtech" || pwd !== "ljtech") throw new Error("Bad Credentials");
    return NextResponse.next();
  } catch (error) {
    let message = "Bad Credentials";
    if (error instanceof Error) message = error.message;
    return NextResponse.json({ message });
  }
}
