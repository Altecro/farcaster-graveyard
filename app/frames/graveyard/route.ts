import { NextResponse } from "next/server";
import NextRequest, NextResponse from "next/server";

let lastVictim = "personne... pour le moment 👀";

export async function GET() {
  const frame: NextResponse = {
    image: `https://dummyimage.com/600x400/000/fff&text=💀+Ici+repose+${encodeURIComponent(lastVictim)}`,
    buttons: [{ label: "💀 Enterrer mon pseudo", action: "post" }],
    postUrl: "/frames/graveyard"
  };
  return NextResponse.json(frame);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const user = body?.untrustedData?.fid ? `@farcasterUser${body.untrustedData.fid}` : "un inconnu";

  lastVictim = user;

  const frame: NextResponse = {
    image: `https://dummyimage.com/600x400/000/fff&text=🪦+Ici+repose+${encodeURIComponent(user)}`,
    buttons: [{ label: "😈 Prendre sa place", action: "post" }],
    postUrl: "/frames/graveyard"
  };

  return NextResponse.json(frame);
}
