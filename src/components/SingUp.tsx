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
import { useState } from "react";
import { signIn } from "@/lib/auth-client";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

function Main() {
  const route = useRouter();
  const [error, setError] = useState<null | string>(null)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

   async function onSubmit(data: z.infer<typeof formSchema>) {
    setError(null);
    const res = await signIn.email({
        email: data.email,
        password: data.password
    })
    if (res.error) {
        setError(res.error.message! || "Error")
    }
    else {
        route.push("/")
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
                  Sign In
                </FieldLegend>
                <FieldDescription className="text-center pb-4">
                  Please enter your credentials to sign in.
                </FieldDescription>
                <FieldGroup className="pb-4">
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
                  <Controller
                    name="password"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field>
                        <div className="flex justify-between items-end">
                          <FieldLabel>Password</FieldLabel>

                          <Link
                            href="/forgot-password"
                            className="text-xs text-gray-600 hover:underline"
                          >
                            Forgot password?
                          </Link>
                        </div>

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
                      </Field>
                    )}
                  />

                  <Button
                    type="submit"
                    className="py-6 text-md bg-black text-white"
                  >
                    Sign In <ArrowRight />
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
                  Don't have an account?{" "}
                  <Link
                    href="/sign-up"
                    className="text-gray-600 hover:underline"
                  >
                    Sign Up
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
