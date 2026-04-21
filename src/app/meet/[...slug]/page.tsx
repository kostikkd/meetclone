import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Main from "@/components/MeetingPage";

export default async function MeetPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    const meet = await prisma.meets.findUnique({
        where: { slug: parseInt(slug) },
    });

    if (!meet) notFound();

    return <Main status="preMeeting" slug={slug} />;
}
