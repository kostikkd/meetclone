import { TerminalIcon, VideoIcon, XIcon } from "lucide-react";
import { Button } from "./ui/button";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, InputGroupText } from "./ui/input-group";
import Link from "next/link";
import Container2 from "./Container2";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Field } from "./ui/field";
import MeetingCreate from "./MeetingCreate";
import UserIcon from "./UserDefaultIcon";
import { Avatar, AvatarBadge } from "./ui/avatar";

function Main() {
    return (
        <Container2>
            <main className="min-h-[calc(100vh-82px)] flex items-center">
                <div className="flex-4">
                    <div>
                        <h2 className="text-5xl font-bold pb-8">Video calls specifically <br />designed for designers.</h2>
                        <h4 className="text-md text-gray-600 pb-8">Connect, collaborate, and share ideas with premium video quality and <br />distraction-free controls.</h4>
                    </div>
                    <div className="flex gap-2 pb-8 flex-col sm:flex-row">
                        <MeetingCreate/>
                        <div className="">
                            <form className="flex gap-2">
                                <Field className="w-full sm:max-w-45 ">
                                    <InputGroup className="py-5">
                                        <InputGroupInput placeholder="Enter a code" type="number"></InputGroupInput>
                                        <InputGroupAddon>
                                            <InputGroupText><TerminalIcon/></InputGroupText>
                                        </InputGroupAddon>
                                    </InputGroup>
                                </Field>
                                <Button className="px-5 py-5 bg-transparent" variant={"ghost"} type="submit">
                                    Join
                                </Button>
                            </form>
                        </div>
                    </div>
                    <div className="flex gap-1.5">
                        <div className="w-2/7 border border-gray-300 rounded-2xl py-1 px-1.5 flex justify-between items-center">
                            <div className="flex gap-1.5">
                                <Avatar size="sm">
                                    {/* <AvatarImage src="/user.jpg" alt="Avatar not found"/>*/}
                                    <UserIcon userName={"K T"} color="#F1c1A9"/>
                                </Avatar>
                                <span>Meet Name</span>
                            </div>
                            <XIcon size={20}/>
                        </div>
                        <div className="w-2/7 border border-gray-300 rounded-2xl py-1 px-1.5 flex justify-between items-center">
                            <div className="flex gap-1.5">
                                <Avatar size="sm">
                                    {/* <AvatarImage src="/user.jpg" alt="Avatar not found"/>*/}
                                    <UserIcon userName={"G S"} color="#1Fc1F9"/>
                                </Avatar>
                                <span>Meet Name</span>
                            </div>
                            <XIcon size={20}/>
                        </div>
                        <div className="w-2/7 border border-gray-300 rounded-2xl py-1 px-1.5 flex justify-between items-center">
                            <div className="flex gap-1.5">
                                <Avatar size="sm">
                                    {/* <AvatarImage src="/user.jpg" alt="Avatar not found"/>*/}
                                    <UserIcon userName={"K F"} color="#f1c119"/>
                                </Avatar>
                                <span>Meet Name</span>
                            </div>
                            <XIcon size={20}/>
                        </div>
                    </div>
                </div>
                <div className="hidden xl:block flex-3">
                    <div className="grid grid-rows-2 grid-cols-2 gap-4">
                        <div className="w-full max-w-full aspect-video rounded-md bg-white border border-gray-200 flex justify-center items-center">
                            <div className="w-1/4 aspect-square rounded-full bg-orange-200 flex justify-center items-center text-gray-600">DS</div>
                        </div>
                        <div className="w-full max-w-full aspect-video rounded-md bg-white border border-gray-200 flex justify-center items-center">
                            <div className="w-1/4 aspect-square rounded-full bg-amber-200 flex justify-center items-center text-gray-600">FD</div>
                        </div>
                        <div className="w-full max-w-full aspect-video rounded-md bg-white border border-gray-200 flex justify-center items-center">
                            <div className="w-1/4 aspect-square rounded-full bg-green-200 flex justify-center items-center text-gray-600">YU</div>
                        </div>
                        <div className="w-full max-w-full aspect-video rounded-md bg-white border border-gray-200 flex justify-center items-center">
                            <div className="w-1/4 aspect-square rounded-full bg-cyan-200 flex justify-center items-center text-gray-600">KR</div>
                        </div>
                    </div>
                </div>
            </main>
        </Container2>
    );
}

export default Main;