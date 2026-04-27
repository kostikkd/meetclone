import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
    const slug = req.nextUrl.searchParams.get("slug");

    if (!slug) {
        return NextResponse.json(
            { error: "slug is required" },
            { status: 400 },
        );
    }

    const parsed = parseInt(slug);
    if (isNaN(parsed)) {
        return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
    }

    const meet = await prisma.meets.findUnique({
        where: { slug: parsed },
    });

    if (!meet) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ slug: meet.slug });
}
