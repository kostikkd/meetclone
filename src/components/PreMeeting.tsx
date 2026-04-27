import React, { useState, useEffect, useRef } from "react";
import { LiveKitRoom, VideoConference } from "@livekit/components-react";
import {
    createLocalVideoTrack,
    createLocalAudioTrack,
    LocalVideoTrack,
    LocalAudioTrack,
} from "livekit-client";
import "@livekit/components-styles";
import {
    MicIcon,
    MicOffIcon,
    SettingsIcon,
    VideoIcon,
    VideoOffIcon,
} from "lucide-react";
import { Button } from "./ui/button";
import { useSession } from "@/lib/auth-client";
import MeetBlock from "./MeetBlock";

const SERVER_URL = process.env.NEXT_PUBLIC_LIVEKIT_URL!;
async function fetchToken(participantName: string, room: string) {
    const res = await fetch(
        `/api/livekit-token?name=${encodeURIComponent(participantName)}&room=${room}`,
    );
    const data = await res.json();
    return data.token as string;
}

const PreMeeting = ({ slug }: { slug: string }) => {
    const session = useSession().data;
    const [token, setToken] = useState<string | null>(null);
    const [isJoined, setIsJoined] = useState(false);
    const displayName = session?.user?.email;
    const [videoTrack, setVideoTrack] = useState<LocalVideoTrack | null>(null);
    const [audioTrack, setAudioTrack] = useState<LocalAudioTrack | null>(null);
    const [isVideoEnabled, setIsVideoEnabled] = useState(false);
    const [isAudioEnabled, setIsAudioEnabled] = useState(false);

    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        async function init() {
            try {
                const vt = await createLocalVideoTrack();
                setVideoTrack(vt);
                const at = await createLocalAudioTrack();
                setAudioTrack(at);
            } catch (e) {
                console.error("Error accessing media:", e);
            }
        }
        init();
        return () => {
            videoTrack?.stop();
            audioTrack?.stop();
        };
    }, []);

    useEffect(() => {
        if (videoTrack && videoRef.current && isVideoEnabled) {
            videoTrack.attach(videoRef.current);
        }
    }, [videoTrack, isVideoEnabled]);

    const handleJoin = async () => {
        if (!displayName) return alert("Please enter your name");
        const t = await fetchToken(displayName, slug); // 👈 pass slug
        setToken(t);
        videoTrack?.stop();
        audioTrack?.stop();
        setIsJoined(true);
    };
    if (isJoined && token) {
        return (
            <LiveKitRoom
                token={token}
                serverUrl={SERVER_URL}
                connect={true}
                video={isVideoEnabled}
                audio={isAudioEnabled}
                className="h-screen"
            >
                <div className="min-h-[calc(100vh-1002px)]">
                    <MeetBlock />
                </div>
            </LiveKitRoom>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full max-w-6xl mx-auto items-center p-6 font-sans text-black">
            <div className="relative aspect-video bg-[#F0F0F0] rounded-[32px] overflow-hidden flex items-center justify-center shadow-sm">
                {isVideoEnabled && videoTrack ? (
                    <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-32 h-32 rounded-full bg-[#A8DADC] flex items-center justify-center text-[#1A4D62] font-bold text-3xl">
                        YOU
                    </div>
                )}

                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-white px-5 py-3 rounded-3xl shadow-xl">
                    <Button
                        size={"icon-lg"}
                        variant={"outline"}
                        onClick={() => setIsAudioEnabled(!isAudioEnabled)}
                        className={`p-3 rounded-full transition-colors ${isAudioEnabled ? "bg-white text-black" : "bg-red-100 text-red-400 border-red-200"}`}
                    >
                        {isAudioEnabled ? <MicIcon /> : <MicOffIcon />}
                    </Button>
                    <Button
                        size={"icon-lg"}
                        variant={"outline"}
                        onClick={() => setIsVideoEnabled(!isVideoEnabled)}
                        className={`p-3 rounded-full transition-colors ${isVideoEnabled ? "bg-white text-black" : "bg-red-100 text-red-400 border-red-200"}`}
                    >
                        {isVideoEnabled ? <VideoIcon /> : <VideoOffIcon />}
                    </Button>
                    <Button
                        size={"icon-lg"}
                        variant={"outline"}
                        className={`p-3 rounded-full transition-colors `}
                    >
                        <SettingsIcon />
                    </Button>
                </div>
            </div>
            <div className="flex flex-col gap-8">
                <div>
                    <h1 className="text-4xl font-bold mb-2 tracking-tight">
                        Ready to join?
                    </h1>
                    <p className="text-gray-500 text-lg">
                        Design Sync: Sprint 4 • 10:42 AM
                    </p>
                </div>

                <div className="space-y-3">
                    <p className="text-xs font-bold text-gray-400 tracking-widest uppercase">
                        Already in call (3)
                    </p>
                    <div className="flex items-center gap-4 bg-white border border-gray-100 p-4 rounded-[32px] shadow-sm">
                        <div className="flex -space-x-3">
                            <div className="w-8 h-8 rounded-full bg-[#F7CBD0] border-2 border-white flex items-center justify-center text-[10px] font-bold">
                                AL
                            </div>
                            <div className="w-8 h-8 rounded-full bg-[#F7DDC7] border-2 border-white flex items-center justify-center text-[10px] font-bold">
                                RM
                            </div>
                            <div className="w-8 h-8 rounded-full bg-[#B8F2E6] border-2 border-white flex items-center justify-center text-[10px] font-bold">
                                SJ
                            </div>
                        </div>
                        <p className="text-sm font-medium text-gray-600">
                            Alex, Riley, and Sarah
                        </p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex flex-col gap-3">
                        <Button
                            onClick={handleJoin}
                            className="w-full bg-black text-white py-6 rounded-3xl font-semibold text-lg hover:bg-zinc-800 transition-all"
                        >
                            Join now
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PreMeeting;
