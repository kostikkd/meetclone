"use client";

import { TerminalIcon, VideoIcon, XIcon } from "lucide-react";
import { Button } from "./ui/button";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
    InputGroupText,
} from "./ui/input-group";
import Link from "next/link";
import Container2 from "./Container2";
import { Field } from "./ui/field";
import MeetingCreate from "./MeetingCreate";
import UserIcon from "./userDefaultIcon";
import { Avatar, AvatarBadge } from "./ui/avatar";
import { useState } from "react";
import { useRouter } from "next/navigation";

function Main() {
    const router = useRouter();
    const [code, setCode] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    async function handleJoin(e: React.FormEvent) {
        e.preventDefault();
        setError(null);

        const trimmed = code.toString().trim();

        if (!trimmed || trimmed === "") {
            setError("Please enter a meeting code");
            return;
        }

        const parsed = parseInt(trimmed);
        if (isNaN(parsed)) {
            setError("Code must be a number");
            return;
        }

        setIsLoading(true);
        try {
            const res = await fetch(`/api/meets/check?slug=${parsed}`);
            const json = await res.json();

            if (res.ok) {
                router.push(`/meet/${parsed}`);
            } else {
                setError(json.error ?? "Meeting not found");
            }
        } catch (err) {
            console.error("Join error:", err);
            setError("Something went wrong, please try again");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Container2>
            <main className="min-h-[calc(100vh-82px)] flex items-center">
                <div className="flex-4">
                    <div>
                        <h2 className="text-5xl font-bold pb-8">
                            Video calls specifically <br />
                            designed for designers.
                        </h2>
                        <h4 className="text-md text-gray-600 pb-8">
                            Connect, collaborate, and share ideas with premium
                            video quality and <br />
                            distraction-free controls.
                        </h4>
                    </div>
                    <div className="flex gap-2 pb-8 flex-col sm:flex-row">
                        <MeetingCreate />
                        <div>
                            <form className="flex gap-2" onSubmit={handleJoin}>
                                <div className="flex flex-col gap-1">
                                    <Field className="w-full sm:max-w-45">
                                        <InputGroup className="py-5">
                                            <InputGroupInput
                                                placeholder="Enter a code"
                                                type="text"
                                                inputMode="numeric"
                                                pattern="[0-9]*"
                                                value={code}
                                                onChange={(e) => {
                                                    // Strip any non-digit characters
                                                    const val =
                                                        e.target.value.replace(
                                                            /\D/g,
                                                            "",
                                                        );
                                                    setCode(val);
                                                    setError(null);
                                                }}
                                            />
                                            <InputGroupAddon>
                                                <InputGroupText>
                                                    <TerminalIcon />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Field>
                                    {error && (
                                        <p className="text-red-500 text-xs pl-1">
                                            {error}
                                        </p>
                                    )}
                                </div>
                                <Button
                                    className="px-5 py-5 bg-transparent"
                                    variant={"ghost"}
                                    type="submit"
                                    disabled={isLoading || !code}
                                >
                                    {isLoading ? "..." : "Join"}
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="hidden xl:block flex-3">
                    <div className="grid grid-rows-2 grid-cols-2 gap-4">
                        <div className="w-full max-w-full aspect-video rounded-md bg-white border border-gray-200 flex justify-center items-center">
                            <div className="w-1/4 aspect-square rounded-full bg-orange-200 flex justify-center items-center text-gray-600">
                                DS
                            </div>
                        </div>
                        <div className="w-full max-w-full aspect-video rounded-md bg-white border border-gray-200 flex justify-center items-center">
                            <div className="w-1/4 aspect-square rounded-full bg-amber-200 flex justify-center items-center text-gray-600">
                                FD
                            </div>
                        </div>
                        <div className="w-full max-w-full aspect-video rounded-md bg-white border border-gray-200 flex justify-center items-center">
                            <div className="w-1/4 aspect-square rounded-full bg-green-200 flex justify-center items-center text-gray-600">
                                YU
                            </div>
                        </div>
                        <div className="w-full max-w-full aspect-video rounded-md bg-white border border-gray-200 flex justify-center items-center">
                            <div className="w-1/4 aspect-square rounded-full bg-cyan-200 flex justify-center items-center text-gray-600">
                                KR
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </Container2>
    );
}

export default Main;
