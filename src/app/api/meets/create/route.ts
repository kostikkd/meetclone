import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth"; // 👈 adjust to your auth import
import { headers } from "next/headers";

export async function POST(req: NextRequest) {
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { title, date, time } = await req.json();

    if (!title || !date || !time) {
        return NextResponse.json(
            { error: "Missing required fields" },
            { status: 400 },
        );
    }

    let slug: number;
    let exists = true;
    do {
        slug = Math.floor(100000 + Math.random() * 900000);
        const found = await prisma.meets.findUnique({ where: { slug } });
        exists = !!found;
    } while (exists);

    const meet = await prisma.meets.create({
        data: {
            id: slug,
            slug,
            meetStart: new Date(`${date}T${time}`),
            creatorId: session.user.id,
        },
    });

    return NextResponse.json({ slug: meet.slug });
}
