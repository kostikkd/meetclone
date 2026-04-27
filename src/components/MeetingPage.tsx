"use client";

import { CameraIcon, MicIcon, ScreenShareIcon, VideoIcon } from "lucide-react";
import Container from "./Container2";
import Controle from "./Controle";
import { Button } from "./ui/button";
import UsersBlock from "./MeetBlock";
import { ControlBar, PreJoin, RoomContext } from "@livekit/components-react";
import UserIcon from "./UserDefaultIcon";
import { room } from "@/lib/livekitRoom";
import PreMeeting from "./PreMeeting";
import Header from "./HeaderMeeting";

function Main({
    status,
    slug,
}: {
    status: "preMeeting" | "meeting" | "postMeeting";
    slug: string;
}) {
    return (
        <div className=" ">
            <Container>
                <Header status="preMeeting" />
            </Container>

            {status === "preMeeting" && (
                <div className="min-h-[calc(100vh-102px)] flex items-center justify-center">
                    <PreMeeting slug={slug} />
                </div>
            )}
        </div>
    );
}

export default Main;
