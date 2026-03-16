"use client";

import { Calendar, Clock, LinkIcon, VideoIcon, X} from "lucide-react";
import { Field, FieldGroup, FieldLabel, FieldSeparator, FieldSet } from "./ui/field";
import { Input } from "./ui/input";
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from "./ui/input-group";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import Link from "next/link";
import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import * as z from "zod"
import { time } from "console";

const formSchema = z.object({
    title: z.string().min(1, "Title is required"),
    date: z.string().min(1, "Date is required"),
    time: z.string().min(1, "Time is required"),
    description: z.string().optional(),
    invitees: z.string().optional(),
});

export function MeetingCreate() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            date: "",
            time: "",
            description: "",
            invitees: "",
        },
    })

    function onSubmit(data: z.infer<typeof formSchema>) {}
        
        return (
            <>
                <div>
                    <Dialog>
                        <form onSubmit={form.handleSubmit(onSubmit)}>

                            <DialogTrigger asChild>
                                <Button className="w-full px-5 py-5"variant={"default"}><VideoIcon/>Create Meeting</Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-2xl" showCloseButton={false}>
                                <DialogTitle/>
                                <h1 className="text-3xl font-bold pb-6 text-center">Set up your meeting</h1>
                                <FieldGroup className="pb-6">
                                    <FieldSet>
                                        <FieldGroup>
                                            <Controller name="title" control={form.control} render={({field, fieldState}) => (
                                                <Field>
                                                    <FieldLabel>Meeting Title</FieldLabel>
                                                    <Input className="py-6" {...field} aria-invalid={fieldState.invalid}/>
                                                    {fieldState.error && <p className="text-red-500 text-sm">{fieldState.error.message}</p>}
                                                </Field>
                                            )}/>
                                            <Field className="flex flex-row">
                                                <Controller name="date" control={form.control} render={({field, fieldState}) => (
                                                    <div>
                                                        <FieldLabel>Date</FieldLabel>
                                                        <InputGroup className="py-6">
                                                            <InputGroupAddon>
                                                                <InputGroupText><Calendar/></InputGroupText>
                                                            </InputGroupAddon>
                                                            <InputGroupInput type="date" {...field} aria-invalid={fieldState.invalid}/>
                                                        </InputGroup>
                                                    </div>
                                                )}/>
                                                 <Controller name="time" control={form.control} render={({field, fieldState}) => (
                                                    <div>
                                                        <FieldLabel>Time</FieldLabel>
                                                        <InputGroup className="py-6">
                                                            <InputGroupAddon>
                                                                <InputGroupText><Calendar/></InputGroupText>
                                                            </InputGroupAddon>
                                                            <InputGroupInput type="time"/>
                                                        </InputGroup>
                                                    </div>
                                                )}/>
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
                                    <Button  className="py-5 px-4" variant={"default"}>
                                        <Link href="/meet/000000">Create meeting</Link>
                                    </Button>
                                </div>
                            </DialogContent>
                        </form>
                    </Dialog>
                </div>

            </>
        );
    }

export default MeetingCreate;