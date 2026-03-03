import { TerminalIcon, VideoIcon } from "lucide-react";
import Container from "./Container";
import { Button } from "./ui/button";
import { Field } from "./ui/field";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, InputGroupText } from "./ui/input-group";
import Link from "next/link";

function Main() {
    return (
        <Container>
            <main className="min-h-[calc(100vh-82px)] flex items-center">
                <div className="flex-4">
                    <div>
                        <h2 className="text-5xl font-bold pb-8">Video calls specifically <br />designed for designers.</h2>
                        <h4 className="text-md text-gray-600 pb-8">Connect, collaborate, and share ideas with premium video quality and <br />distraction-free controls.</h4>
                    </div>
                    <div className="flex gap-2 pb-8 flex-col sm:flex-row">
                        <div>
                            <Button className="w-full px-5 py-5" asChild variant={"default"}>
                                <Link href="/new-meeting"><VideoIcon/> New Meeting</Link>
                            </Button>
                        </div>
                        <div className="flex gap-2">
                            <Field className="w-full sm:max-w-45 ">
                                <InputGroup className="py-5">
                                    <InputGroupInput placeholder="Enter a code" type="number"></InputGroupInput>
                                    <InputGroupAddon>
                                        <InputGroupText><TerminalIcon/></InputGroupText>
                                    </InputGroupAddon>
                                </InputGroup>
                            </Field>
                            <Button className="px-5 py-5 bg-transparent" asChild variant={"outline"}>
                                <Link href="/meeting-code">Join</Link>
                            </Button>
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
        </Container>
    );
}

export default Main;