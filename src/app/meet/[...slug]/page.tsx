import Header from "@/components/HeaderMeeting";
import Main from "@/components/MeetingPage";

export default async function Meet({
    params,
}: {
    params: Promise<{ slug: number }>
}) {
    const { slug } = await params
    const preMetting: boolean = false;
    return (
        <div>
            <Header/>
            <Main/>
        </div>
    )
}