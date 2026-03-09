import { Calendar, Clock, LinkIcon, X} from "lucide-react";
import { Field, FieldGroup, FieldLabel, FieldSeparator, FieldSet } from "./ui/field";
import { Input } from "./ui/input";
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from "./ui/input-group";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import Link from "next/link";
import { DialogClose } from "./ui/dialog";

function MeetingCreate() {
    return (
        <>
            <h1 className="text-3xl font-bold pb-6 text-center">Set up your meeting</h1>
            <FieldGroup className="pb-6">
                <FieldSet>
                    <FieldGroup>
                        <Field>
                            <FieldLabel>Meeting Title</FieldLabel>
                            <Input className="py-6"/>
                        </Field>
                        <Field className="flex flex-row">
                            <div>
                                <FieldLabel>Date</FieldLabel>
                                <InputGroup className="py-6">
                                    <InputGroupAddon>
                                        <InputGroupText><Calendar/></InputGroupText>
                                    </InputGroupAddon>
                                    <InputGroupInput type="date"/>
                                </InputGroup>
                            </div>
                            <div>
                                <FieldLabel>Time</FieldLabel>
                                <InputGroup className="py-6">
                                    <InputGroupAddon>
                                        <InputGroupText><Clock/></InputGroupText>
                                    </InputGroupAddon>
                                    <InputGroupInput type="time"/>
                                </InputGroup>
                            </div>
                        </Field>
                        <Field>
                            <div className="flex justify-between pb-0">
                                <FieldLabel>Description</FieldLabel>
                                <span className="text-xs text-gray-600">Optional</span>
                            </div>
                            <Textarea className=" h-10 resize-none"/>
                        </Field>
                        <Field>
                            <FieldLabel>Invite people</FieldLabel>
                            <div className="flex flex-row items-center gap-2">
                                <InputGroup className="py-6">
                                    <InputGroupAddon>
                                        <div className="flex gap-1 border py-1 px-1 rounded-full items-center">
                                            <div className="w-6 text-xs aspect-square bg-amber-200 rounded-full flex justify-center items-center">UN</div>
                                            <div className="hidden xl:block">User Name</div>
                                            <Button className="rounded-full hidden xl:block" variant={"ghost"} size={"icon-xs"}><X size={20}/></Button>
                                        </div>
                                        <div className="flex gap-1 border py-1 px-1 rounded-full items-center">
                                            <div className="w-6 text-xs aspect-square bg-green-200 rounded-full flex justify-center items-center">UN</div>
                                            <div className="hidden xl:block">User Name</div>
                                            <Button className="rounded-full hidden xl:block" variant={"ghost"} size={"icon-xs"}><X size={20}/></Button>
                                        </div>
                                        <div className="flex gap-1 border py-1 px-1 rounded-full items-center">
                                            <div className="w-6 text-xs aspect-square bg-red-200 rounded-full flex justify-center items-center">UN</div>
                                            <div className="hidden xl:block">User Name</div>
                                            <Button className="rounded-full hidden xl:flex xl:items-center xl:justify-center" variant={"ghost"} size={"icon-xs"}><X size={20}/></Button>
                                        </div>
                                    </InputGroupAddon>
                                    <InputGroupAddon align={"inline-end"} className="pr-3">
                                        <Button size={"lg"}>Invite</Button>
                                    </InputGroupAddon>
                                    <InputGroupInput/>
                                </InputGroup>
                                <Button className="py-6" variant={"outline"} size={"lg"}><LinkIcon /></Button>
                            </div>
                        </Field>
                    </FieldGroup>
                </FieldSet>
            </FieldGroup>
            <FieldSeparator className=""/>
            <div className="pt-6 flex justify-end gap-1.5">
                <DialogClose asChild>
                    <Button className="py-5 px-4" variant={"outline"}>Cancel</Button>
                </DialogClose>
                <Button asChild className="py-5 px-4" variant={"default"}>
                    <Link href="/meet/000000">Create meeting</Link>
                </Button>
            </div>
        </>
    );
}

export default MeetingCreate;