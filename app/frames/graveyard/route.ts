import { NextRequest, NextResponse } from "next/server";

let lastVictim = "personne... pour le moment 👀";

export async function GET() {
  // Retourner du HTML avec les métadonnées Frame
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="https://dummyimage.com/600x400/000/fff&text=💀+Ici+repose+${encodeURIComponent(lastVictim)}" />
        <meta property="fc:frame:button:1" content="💀 Enterrer mon pseudo" />
        <meta property="fc:frame:button:1:action" content="post" />
        <meta property="fc:frame:post_url" content="${process.env.NEXT_PUBLIC_URL}/frames/graveyard" />
        <title>Graveyard Frame</title>
      </head>
      <body>
        <h1>💀 Graveyard Frame</h1>
        <p>Dernier enterré : ${lastVictim}</p>
      </body>
    </html>
  `;
  
  return new NextResponse(html, {
    headers: { 'Content-Type': 'text/html' }
  });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  
  const user = body?.untrustedData?.fid 
    ? `@farcasterUser${body.untrustedData.fid}` 
    : "un inconnu";
  
  lastVictim = user;
  
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="https://dummyimage.com/600x400/000/fff&text=🪦+Ici+repose+${encodeURIComponent(user)}" />
        <meta property="fc:frame:button:1" content="😈 Prendre sa place" />
        <meta property="fc:frame:button:1:action" content="post" />
        <meta property="fc:frame:post_url" content="${process.env.NEXT_PUBLIC_URL}/frames/graveyard" />
        <title>Graveyard Frame</title>
      </head>
      <body>
        <h1>🪦 RIP ${user}</h1>
      </body>
    </html>
  `;
  
  return new NextResponse(html, {
    headers: { 'Content-Type': 'text/html' }
  });
}