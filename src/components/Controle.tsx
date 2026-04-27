"use client";

import {
    EllipsisVerticalIcon,
    MessageCircleIcon,
    MessageCircleXIcon,
    MicIcon,
    MicOffIcon,
    MonitorIcon,
    MonitorXIcon,
    PhoneMissedIcon,
    Presentation,
    PresentationIcon,
    VideoIcon,
    VideoOffIcon,
} from "lucide-react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

function Controle() {
    const status = {
        micro: false,
        camera: true,
        presentation: false,
        chatOpen: false,
    };
    return (
        <div className="h-20 flex justify-center">
            <div className="flex justify-center items-center gap-2.5 bg-gray-200 py-4 w-1/2 border-2 border-gray-300 rounded-3xl h-20">
                <div className="flex gap-1.5">
                    <Button size={"icon-lg"} className="p-6 rounded-full">
                        {status.micro ? <MicIcon /> : <MicOffIcon />}
                    </Button>
                    <Button size={"icon-lg"} className="p-6 rounded-full">
                        {status.camera ? <VideoIcon /> : <VideoOffIcon />}
                    </Button>
                </div>
                <Separator className="bg-gray-300" orientation="vertical" />
                <div className="flex gap-1.5">
                    <Button
                        size={"icon-lg"}
                        className="p-6 rounded-full bg-gray-100"
                    >
                        {status.presentation ? (
                            <MonitorXIcon className="stroke-black" />
                        ) : (
                            <MonitorIcon className="stroke-black" />
                        )}
                    </Button>
                    <Button
                        size={"icon-lg"}
                        className="p-6 rounded-full bg-gray-100"
                    >
                        {status.chatOpen ? (
                            <MessageCircleXIcon className="stroke-black" />
                        ) : (
                            <MessageCircleIcon className="stroke-black" />
                        )}
                    </Button>
                    <Button
                        size={"icon-lg"}
                        className="p-6 rounded-full bg-gray-100"
                    >
                        <EllipsisVerticalIcon className="stroke-black" />
                    </Button>
                </div>
                <Separator className="bg-gray-300" orientation="vertical" />
                <Button size={"lg"} className="p-6 rounded-full bg-red-500">
                    <PhoneMissedIcon />
                    End Call
                </Button>
            </div>
        </div>
    );
}

export default Controle;
