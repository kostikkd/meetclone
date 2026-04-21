"use client";

import { Calendar, Clock, LinkIcon, VideoIcon, X } from "lucide-react";
import {
    Field,
    FieldGroup,
    FieldLabel,
    FieldSeparator,
    FieldSet,
} from "./ui/field";
import { Input } from "./ui/input";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
    InputGroupText,
} from "./ui/input-group";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { useState } from "react";

const formSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    date: z.string().min(1, "Date is required"),
    time: z.string().min(1, "Time is required"),
    description: z.string().max(500).optional(),
    invitees: z.string().optional(),
});

export function MeetingCreate() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [serverError, setServerError] = useState<string | null>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            date: "",
            time: "",
            description: "",
            invitees: "",
        },
    });

    async function onSubmit(data: z.infer<typeof formSchema>) {
        setIsLoading(true);
        setServerError(null);

        try {
            const res = await fetch("/api/meets/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const json = await res.json();

            if (!res.ok) {
                setServerError(json.error ?? "Something went wrong");
                return;
            }

            // Redirect to the newly created meeting room
            router.push(`/meet/${json.slug}`);
        } catch (e) {
            setServerError("Network error, please try again");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="w-full px-5 py-5" variant={"default"}>
                        <VideoIcon /> Create Meeting
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-2xl" showCloseButton={false}>
                    <DialogTitle />
                    <h1 className="text-3xl font-bold pb-6 text-center">
                        Set up your meeting
                    </h1>

                    {serverError && (
                        <p className="text-red-500 text-sm text-center pb-4">
                            {serverError}
                        </p>
                    )}

                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FieldGroup className="pb-6">
                            <FieldSet>
                                <FieldGroup>
                                    <Controller
                                        name="title"
                                        control={form.control}
                                        render={({ field, fieldState }) => (
                                            <Field>
                                                <FieldLabel>
                                                    Meeting Title
                                                </FieldLabel>
                                                <Input
                                                    className="py-6"
                                                    {...field}
                                                    aria-invalid={
                                                        fieldState.invalid
                                                    }
                                                />
                                                {fieldState.error && (
                                                    <p className="text-red-500 text-sm">
                                                        {
                                                            fieldState.error
                                                                .message
                                                        }
                                                    </p>
                                                )}
                                            </Field>
                                        )}
                                    />
                                    <Field className="flex flex-row gap-4">
                                        <Controller
                                            name="date"
                                            control={form.control}
                                            render={({ field, fieldState }) => (
                                                <div>
                                                    <FieldLabel>
                                                        Date
                                                    </FieldLabel>
                                                    <InputGroup className="py-6">
                                                        <InputGroupAddon>
                                                            <InputGroupText>
                                                                <Calendar />
                                                            </InputGroupText>
                                                        </InputGroupAddon>
                                                        <InputGroupInput
                                                            type="date"
                                                            {...field}
                                                            aria-invalid={
                                                                fieldState.invalid
                                                            }
                                                        />
                                                    </InputGroup>
                                                    {fieldState.error && (
                                                        <p className="text-red-500 text-sm">
                                                            {
                                                                fieldState.error
                                                                    .message
                                                            }
                                                        </p>
                                                    )}
                                                </div>
                                            )}
                                        />
                                        <Controller
                                            name="time"
                                            control={form.control}
                                            render={({ field, fieldState }) => (
                                                <div>
                                                    <FieldLabel>
                                                        Time
                                                    </FieldLabel>
                                                    <InputGroup className="py-6">
                                                        <InputGroupAddon>
                                                            <InputGroupText>
                                                                <Clock />
                                                            </InputGroupText>
                                                        </InputGroupAddon>
                                                        <InputGroupInput
                                                            type="time"
                                                            {...field}
                                                            aria-invalid={
                                                                fieldState.invalid
                                                            }
                                                        />
                                                    </InputGroup>
                                                    {fieldState.error && (
                                                        <p className="text-red-500 text-sm">
                                                            {
                                                                fieldState.error
                                                                    .message
                                                            }
                                                        </p>
                                                    )}
                                                </div>
                                            )}
                                        />
                                    </Field>
                                    <Controller
                                        name="description"
                                        control={form.control}
                                        render={({ field }) => (
                                            <Field>
                                                <div className="flex justify-between pb-0">
                                                    <FieldLabel>
                                                        Description
                                                    </FieldLabel>
                                                    <span className="text-xs text-gray-600">
                                                        Optional
                                                    </span>
                                                </div>
                                                <Textarea
                                                    {...field}
                                                    className="h-10 resize-none"
                                                />
                                            </Field>
                                        )}
                                    />
                                    <Controller
                                        name="invitees"
                                        control={form.control}
                                        render={({ field }) => (
                                            <Field>
                                                <FieldLabel>
                                                    Invite people
                                                </FieldLabel>
                                                <div className="flex flex-row gap-2 items-center">
                                                    <InputGroup className="py-6 flex-9">
                                                        <InputGroupAddon>
                                                            <div className="flex gap-1 border py-1 px-1 rounded-full items-center">
                                                                <div className="w-6 text-xs aspect-square bg-amber-200 rounded-full flex justify-center items-center">
                                                                    UN
                                                                </div>
                                                                <div className="hidden xl:block">
                                                                    User Name
                                                                </div>
                                                                <Button
                                                                    className="rounded-full hidden xl:block"
                                                                    variant={"ghost"}
                                                                    size={"icon-xs"}
                                                                >
                                                                    <X size={20} />
                                                                </Button>
                                                            </div>
                                                        </InputGroupAddon>
                                                        <InputGroupInput
                                                            {...field}
                                                            placeholder="Enter emails separated by comma"
                                                        />
                                                        <InputGroupAddon
                                                            align={"inline-end"}
                                                            className="pr-3"
                                                        >
                                                            <Button size={"lg"}>
                                                                Invite
                                                            </Button>
                                                        </InputGroupAddon>
                                                    </InputGroup>
                                                    <Button
                                                        className="py-6 flex-1"
                                                        variant={"outline"}
                                                        size={"lg"}
                                                    >
                                                        <LinkIcon />
                                                    </Button>
                                                </div>
                                            </Field>
                                        )}
                                    />
                                </FieldGroup>
                            </FieldSet>
                        </FieldGroup>
                        <FieldSeparator />
                        <div className="pt-6 flex justify-end gap-1.5">
                            <DialogClose asChild>
                                <Button
                                    className="py-5 px-4"
                                    variant={"outline"}
                                    disabled={isLoading}
                                >
                                    Cancel
                                </Button>
                            </DialogClose>
                            <Button
                                type="submit"
                                className="py-5 px-4"
                                variant={"default"}
                                disabled={isLoading}
                            >
                                {isLoading ? "Creating..." : "Create meeting"}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default MeetingCreate;