import React, { useState, useEffect } from "react";
import {
    useLocalParticipant,
    useRoomContext,
    VideoTrack,
    useTracks,
    RoomAudioRenderer,
    isTrackReference,
} from "@livekit/components-react";
import { ConnectionState, Track, RoomEvent } from "livekit-client";
import {
    Mic,
    MicOff,
    Video,
    VideoOff,
    MessageSquare,
    MoreVertical,
    PhoneOff,
    Loader2,
} from "lucide-react";
import { Button } from "./ui/button";
import Header from "./HeaderMeeting";

const MeetBlock = () => {
    const room = useRoomContext();
    const [isReady, setIsReady] = useState(false);

    const tracks = useTracks(
        [
            { source: Track.Source.Camera, withPlaceholder: true },
            { source: Track.Source.ScreenShare, withPlaceholder: false },
        ],
        { onlySubscribed: false },
    );

    const { localParticipant, isMicrophoneEnabled, isCameraEnabled } =
        useLocalParticipant();

    useEffect(() => {
        if (room.state === ConnectionState.Connected) {
            setIsReady(true);
            return;
        }

        const handleConnected = () => setIsReady(true);
        const handleDisconnected = () => setIsReady(false);

        room.on(RoomEvent.Connected, handleConnected);
        room.on(RoomEvent.Disconnected, handleDisconnected);

        return () => {
            room.off(RoomEvent.Connected, handleConnected);
            room.off(RoomEvent.Disconnected, handleDisconnected);
        };
    }, [room]);

    const handleToggleMic = async () => {
        if (!isReady) return;
        try {
            await localParticipant.setMicrophoneEnabled(!isMicrophoneEnabled);
        } catch (err) {
            console.error("Mic toggle error:", err);
        }
    };

    const handleToggleCamera = async () => {
        if (!isReady) return;
        try {
            await localParticipant.setCameraEnabled(!isCameraEnabled);
        } catch (err) {
            console.error("Camera toggle error:", err);
        }
    };

    const leaveCall = () => {
        room.disconnect();
    };

    if (room.state === ConnectionState.Connecting || !isReady) {
        return (
            <div className="h-screen w-full flex flex-col items-center justify-center bg-white">
                <Loader2 className="w-12 h-12 animate-spin text-black mb-4" />
                <p className="text-xl font-medium tracking-tight">
                    Joining the synchronization...
                </p>
            </div>
        );
    }

    return (
        <div>
            <div className="relative w-full flex flex-col overflow-hidden h-[calc(100vh-0px)]">
                <RoomAudioRenderer />

                <div className="flex-1 p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr overflow-y-auto pb-32">
                    {tracks.map((trackRef) => {
                        const isLocal =
                            trackRef.participant.identity ===
                            localParticipant.identity;

                        return (
                            <div
                                key={`${trackRef.participant.identity}_${trackRef.source}`}
                                className="relative bg-white rounded-[32px] overflow-hidden shadow-sm border border-gray-100 group transition-all aspect-video"
                            >
                                {isTrackReference(trackRef) &&
                                trackRef.publication.kind === "video" ? (
                                    <VideoTrack
                                        trackRef={trackRef}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-[#F0F0F0]">
                                        <div className="w-24 h-24 rounded-full bg-[#A8DADC] flex items-center justify-center text-[#1A4D62] font-bold text-2xl shadow-inner">
                                            {trackRef.participant.identity
                                                .slice(0, 2)
                                                .toUpperCase()}
                                        </div>
                                    </div>
                                )}

                                <div className="absolute bottom-4 left-4 flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-md rounded-2xl shadow-sm border border-gray-50">
                                    <span className="text-sm font-semibold text-black">
                                        {isLocal
                                            ? "You"
                                            : trackRef.participant.identity}
                                    </span>
                                    {!trackRef.participant
                                        .isMicrophoneEnabled && (
                                        <MicOff
                                            size={14}
                                            className="text-red-500"
                                        />
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-white px-6 py-4 rounded-[40px] border border-gray-100 z-[9999]">
                    <Button
                        onClick={handleToggleMic}
                        disabled={!isReady}
                        className={`w-14 h-14 rounded-full flex items-center justify-center transition-all active:scale-90 ${
                            isMicrophoneEnabled
                                ? "bg-zinc-100 text-black hover:bg-zinc-200"
                                : "bg-red-100 text-red-500 border border-red-200 hover:bg-red-200"
                        }`}
                    >
                        {isMicrophoneEnabled ? (
                            <Mic size={22} />
                        ) : (
                            <MicOff size={22} />
                        )}
                    </Button>

                    <Button
                        onClick={handleToggleCamera}
                        disabled={!isReady}
                        className={`w-14 h-14 rounded-full flex items-center justify-center transition-all active:scale-90 ${
                            isCameraEnabled
                                ? "bg-zinc-100 text-black hover:bg-zinc-200"
                                : "bg-red-100 text-red-500 border border-red-200 hover:bg-red-200"
                        }`}
                    >
                        {isCameraEnabled ? (
                            <Video size={22} />
                        ) : (
                            <VideoOff size={22} />
                        )}
                    </Button>

                    <div className="w-[1px] h-8 bg-gray-200 mx-1" />

                    <Button className="w-14 h-14 rounded-full bg-white text-gray-500 hover:bg-gray-50 border border-gray-100 transition-colors">
                        <MessageSquare size={22} />
                    </Button>

                    <Button className="w-14 h-14 rounded-full bg-white text-gray-500 hover:bg-gray-50 border border-gray-100 transition-colors">
                        <MoreVertical size={22} />
                    </Button>

                    <div className="w-[1px] h-8 bg-gray-200 mx-1" />

                    <Button
                        onClick={leaveCall}
                        className="h-14 px-8 rounded-full bg-[#FF4B4B] hover:bg-[#E64444] text-white flex items-center gap-3 font-bold transition-all shadow-lg shadow-red-100 active:scale-95"
                    >
                        <PhoneOff size={20} />
                        <span className="hidden sm:inline">End Sync</span>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default MeetBlock;
