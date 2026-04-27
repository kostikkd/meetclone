import Container from "@/components/Container";
import Image from "next/image";
import { Avatar, AvatarBadge, AvatarImage } from "./ui/avatar";
import { SettingsIcon } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTrigger,
} from "./ui/dialog";

function Header() {
    const haveVersion: boolean = false;
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
                </nav>
            </header>
        </Container>
    );
}

export default Header;
