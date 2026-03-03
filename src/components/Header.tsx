import Container from "@/components/Container";
import Image from "next/image";
import { Avatar, AvatarBadge, AvatarImage } from "./ui/avatar";
import { SettingsIcon } from "lucide-react";

function Header() {
    return (
        <Container>
            <header className="flex justify-around sm:justify-between items-center 9 h-20.5">
                <nav className="flex gap-0.5"><Image src="/logo.svg" alt="Logo" width={24} height={24}></Image><span className="font-bold text-xl">Connect</span></nav>
                <nav className="hidden sm:block text-gray-500 text-sm">HH:MM AM • Tue, Oct 24</nav>
                <nav className="hidden sm:flex items-center gap-6">
                    <div>
                        <SettingsIcon size={24} className="text-gray-600"/>
                    </div>
                    <div>
                        <Avatar>
                            <AvatarImage src="/user.jpg" alt="Avatar not found"/>
                            <AvatarBadge className="bg-green-500"/>
                        </Avatar>
                    </div>
                    
                </nav>
            </header>
        </Container>
    );
}

export default Header;