"use client";
import Container from "@/components/Container";
import Image from "next/image";
import { Avatar, AvatarBadge, AvatarImage } from "./ui/avatar";
import { SettingsIcon } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import UserIcon from "./UserDefaultIcon";
import { useSession } from "@/lib/auth-client";
import LocalTime from "./Time";

function Header() {
    let haveVersion: boolean = false;
    const session = useSession().data;
    if (session) {
        haveVersion = true;
    }
    return (
        <Container>
            <header className="flex justify-between items-center 9 h-20.5">
                <nav className="">
                    <Link className="flex gap-0.5" href="/">
                        <Image
                            src="/logo.svg"
                            alt="Logo"
                            width={24}
                            height={24}
                        />
                        <span className="font-bold text-xl">Connect</span>
                    </Link>
                </nav>
                <nav className="hidden sm:block text-gray-500 text-sm">
                    <LocalTime />
                </nav>
                <nav className="flex items-center gap-6">
                    <div className="hidden sm:block">
                        <Button
                            variant={"ghost"}
                            size={"icon-lg"}
                            className="rounded-full"
                        >
                            <SettingsIcon size={72} className="text-gray-600" />
                        </Button>
                    </div>
                    {haveVersion && (
                        <div>
                            <Avatar>
                                {/* <AvatarImage src="/user.jpg" alt="Avatar not found"/>*/}
                                <UserIcon
                                    userName={session?.user.name as string}
                                    color="#11c179"
                                />
                                <AvatarBadge className="bg-green-500" />
                            </Avatar>
                        </div>
                    )}
                    {!haveVersion && (
                        <div className="flex gap-1.5">
                            <Button asChild variant={"default"} size={"lg"}>
                                <Link href="/sign-in">Sing In</Link>
                            </Button>
                            <Button
                                className="bg-transparent"
                                asChild
                                variant={"outline"}
                                size={"lg"}
                            >
                                <Link href="/sign-up">Sign Up</Link>
                            </Button>
                        </div>
                    )}
                </nav>
            </header>
        </Container>
    );
}

export default Header;
