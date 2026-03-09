import Link from "next/link";
import Container from "./Container";
import Image from "next/image";
import { Button } from "./ui/button";
import { SettingsIcon, UserRoundCheck, UserRoundPlus } from "lucide-react";
import LiveTimer from "./Live";

function Header() {
    return (
        <Container>
            <header className="flex justify-between items-center 9 h-20.5">
                <nav className="flex gap-4 items-center justify-center">
                    <Link className="flex gap-0.5" href="/">
                        <Image src="/logo.svg" alt="Logo" width={24} height={24} /><span className="font-bold text-xl">Connect</span>
                    </Link>
                    <LiveTimer/>
                </nav>
                <nav className="hidden sm:block text-gray-500 text-sm">HH:MM AM • Tue, Oct 24</nav>
                <nav className="flex items-center">
                    <div className="hidden sm:flex gap-2">
                        <Button variant={"ghost"} size={"icon-lg"} className="rounded-full bg-gray-200">
                            <SettingsIcon size={72} className="text-gray-600"/>
                        </Button>
                        <Button variant={"ghost"} size={"icon-lg"} className="rounded-full bg-gray-200">
                            <UserRoundPlus size={72} className="text-gray-600"/>
                        </Button>
                    </div>
                </nav>
            </header>
        </Container>
    );
}

export default Header;