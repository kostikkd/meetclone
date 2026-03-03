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
                <div className="flex-2">
                    <div>
                        <h2 className="text-5xl font-bold pb-8">Video calls specifically <br />designed for designers.</h2>
                        <h4 className="text-md text-gray-600 pb-8">Connect, collaborate, and share ideas with premium video quality and <br />distraction-free controls.</h4>
                    </div>
                    <div className="flex gap-2 pb-8">
                        <Button className="px-5 py-5" asChild variant={"default"}>
                            <Link href="/new-meeting"><VideoIcon/> New Meeting</Link>
                        </Button>
                        <Field className="max-w-45 ">
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
                <div className="flex-1">
                    imgfdgfd
                </div>
            </main>
        </Container>
    );
}

export default Main;