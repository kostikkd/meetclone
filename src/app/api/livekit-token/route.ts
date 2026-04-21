// app/api/livekit-token/route.ts
import { AccessToken } from "livekit-server-sdk";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
    const participantName = req.nextUrl.searchParams.get("name");
    const slug = req.nextUrl.searchParams.get("room");

    if (!participantName || !slug) {
        return NextResponse.json(
            { error: "name and room are required" },
            { status: 400 },
        );
    }

    // Validate that this meeting actually exists in DB
    const meet = await prisma.meets.findUnique({
        where: { slug: parseInt(slug) },
    });

    if (!meet) {
        return NextResponse.json(
            { error: "Meeting not found" },
            { status: 404 },
        );
    }

    const at = new AccessToken(
        process.env.LIVEKIT_API_KEY!,
        process.env.LIVEKIT_API_SECRET!,
        { identity: participantName },
    );

    // Use the slug as the unique room name
    at.addGrant({
        roomJoin: true,
        room: `meet-${slug}`, // 👈 each slug = its own room
        canPublish: true,
        canSubscribe: true,
    });

    return NextResponse.json({ token: await at.toJwt() });
}
