"use client";

import { ArrowRight } from "lucide-react";
import Container from "./Container3";
import { Button } from "./ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "./ui/field";
import { Input } from "./ui/input";
import Link from "next/link";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { useRouter } from "next/navigation";
import { signUp } from "@/lib/auth-client";
import { useState } from "react";

const formSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

function Main() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const res = await signUp.email({
      email: data.email,
      password: data.password,
      name: data.name
    })
    if (res.error) {
      setError(res.error.message! || "Error");
    } else {
      router.push("/");
    }
  }

  return (
    <Container>
      <div className="min-h-[calc(100vh-82px)] flex items-center">
        <div className="bg-white w-full px-8 py-10 rounded-2xl">
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <FieldSet>
                <FieldLegend className="text-center text-4xl font-bold">
                  Create a new account
                </FieldLegend>

                <FieldDescription className="text-center pb-4">
                  Join the workspace designed for designers.
                </FieldDescription>

                <FieldGroup className="pb-4">
                  <Controller
                    name="name"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field>
                        <FieldLabel>Full Name</FieldLabel>
                        <Input {...field} className="py-6 text-3xl bg-white" />
                        {fieldState.error && (
                          <p className="text-red-500 text-sm">
                            {fieldState.error.message}
                          </p>
                        )}
                      </Field>
                    )}
                  />
                  <Controller
                    name="email"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field>
                        <FieldLabel>Email address</FieldLabel>
                        <Input {...field} className="py-6 text-3xl bg-white" />
                        {fieldState.error && (
                          <p className="text-red-500 text-sm">
                            {fieldState.error.message}
                          </p>
                        )}
                      </Field>
                    )}
                  />
                  <Field className="flex flex-row gap-4">
                    <Controller
                      name="password"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <div className="flex-1">
                          <FieldLabel>Password</FieldLabel>
                          <Input
                            {...field}
                            type="password"
                            className="py-6 text-3xl"
                          />
                          {fieldState.error && (
                            <p className="text-red-500 text-sm">
                              {fieldState.error.message}
                            </p>
                          )}
                        </div>
                      )}
                    />
                    <Controller
                      name="confirmPassword"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <div className="flex-1">
                          <FieldLabel>Confirm Password</FieldLabel>
                          <Input
                            {...field}
                            type="password"
                            className="py-6 text-3xl"
                          />
                          {fieldState.error && (
                            <p className="text-red-500 text-sm">
                              {fieldState.error.message}
                            </p>
                          )}
                        </div>
                      )}
                    />
                  </Field>

                  <Button
                    type="submit"
                    className="py-6 text-md bg-black text-white"
                  >
                    Sign Up <ArrowRight />
                  </Button>
                </FieldGroup>

                <FieldDescription className="text-center text-xs pb-4">
                  or continue with
                </FieldDescription>

                <FieldGroup>
                  <Field className="flex flex-row gap-2">
                    <Button
                      className="py-6 bg-white flex-1"
                      variant={"outline"}
                    >
                      Google
                    </Button>
                    <Button
                      className="py-6 bg-white flex-1"
                      variant={"outline"}
                    >
                      GitHub
                    </Button>
                  </Field>
                </FieldGroup>

                <FieldDescription className="text-center text-xs">
                  Have an account?{" "}
                  <Link
                    href="/sign-in"
                    className="text-gray-600 hover:underline"
                  >
                    Sign In
                  </Link>
                </FieldDescription>
              </FieldSet>
            </FieldGroup>
          </form>
        </div>
      </div>
    </Container>
  );
}

export default Main;
