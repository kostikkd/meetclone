import { Room } from "livekit-client";

export const room = new Room({
    adaptiveStream: true,
    dynacast: true,
});
