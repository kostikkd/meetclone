import { 
    LiveKitRoom, 
    useParticipants, 
    GridLayout,
    ParticipantTile,
    TrackLoop,
    useTracks
} from "@livekit/components-react";
import { Track } from "livekit-client";
import { Button } from "./ui/button";
import { LogOutIcon, MessageSquareIcon, MicIcon, MicOffIcon } from "lucide-react";

// --- КОМПОНЕНТ ПІСЛЯ JOIN (АКТИВНИЙ ВИКЛИК) ---
const ActiveMeetingUI = () => {
    // Отримуємо всі відео-треки учасників (камери)
    const tracks = useTracks(
        [
            { source: Track.Source.Camera, withPlaceholder: true },
            { source: Track.Source.ScreenShare, withPlaceholder: false },
        ],
        { onlyConnected: true },
    );

    const participants = useParticipants();

    return (
        <div className="flex h-screen bg-zinc-950 text-white overflow-hidden">
            
            {/* Основна область відео (Сітка) */}
            <div className="flex-1 relative p-4">
                {/* GridLayout автоматично створює TrackRefContext для кожного ParticipantTile */}
                <GridLayout tracks={tracks} className="h-full">
                    <ParticipantTile />
                </GridLayout>
            </div>

            {/* Сайдбар з учасниками */}
            <div className="w-80 border-l border-zinc-800 bg-zinc-900/50 backdrop-blur-md p-6 flex flex-col shrink-0">
                <div className="flex items-center gap-2 mb-6 text-zinc-400 uppercase tracking-widest text-xs font-bold">
                    <UsersIcon className="w-4 h-4" />
                    <span>Participants ({participants.length})</span>
                </div>

                <div className="flex-1 overflow-y-auto space-y-4">
                    {participants.map((p) => (
                        <div key={p.identity} className="flex items-center gap-3 p-3 bg-white/5 rounded-2xl border border-white/5">
                            <div className="w-10 h-10 rounded-full bg-zinc-700 flex items-center justify-center font-bold text-sm shrink-0">
                                {p.identity.slice(0, 2).toUpperCase()}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate">
                                    {p.identity === displayName ? "You" : p.identity}
                                </p>
                                <div className="flex items-center gap-2">
                                    {p.isSpeaking && <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />}
                                    <p className="text-[10px] text-zinc-500 uppercase tracking-tight">
                                        {p.isSpeaking ? "Speaking" : "Muted"}
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                {p.isMicrophoneEnabled ? 
                                    <MicIcon size={14} className="text-zinc-400" /> : 
                                    <MicOffIcon size={14} className="text-red-500" />
                                }
                            </div>
                        </div>
                    ))}
                </div>

                {/* Нижня частина сайдбару */}
                <div className="mt-auto pt-6 border-t border-zinc-800 flex flex-col gap-3">
                    <Button variant="outline" className="w-full justify-start gap-3 rounded-2xl border-zinc-700 bg-transparent text-zinc-300 py-6">
                        <MessageSquareIcon size={20} />
                        Chat
                    </Button>
                    <Button 
                        variant="destructive" 
                        className="w-full gap-3 rounded-2xl py-6 font-bold"
                        onClick={() => window.location.reload()}
                    >
                        <LogOutIcon size={20} />
                        Leave Call
                    </Button>
                </div>
            </div>

            {/* Компактні кнопки керування (якщо потрібно) */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-zinc-900/80 border border-white/10 p-3 rounded-3xl backdrop-blur-xl shadow-2xl">
                {/* Тут можна додати ControlBar або власні кнопки */}
            </div>
        </div>
    );
};