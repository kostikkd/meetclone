import { ArrowRight} from "lucide-react";
import Container from "./Container3";
import { Button } from "./ui/button";
import { Field, FieldContent, FieldDescription, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "./ui/field";
import { Input } from "./ui/input";
import Link from "next/link";

function Main() {
    return (
        <Container>
            <div className="min-h-[calc(100vh-82px)] flex items-center">
                <div className="bg-white w-full px-8 py-10 rounded-2xl">
                    <FieldGroup>
                        <FieldSet>
                            <FieldLegend className="text-center text-4xl font-bold">Sing In</FieldLegend>
                            <FieldDescription className="text-center pb-4">Please enter your credentials to sign in.</FieldDescription>
                            <FieldGroup className="pb-4">
                                <Field>
                                    <FieldLabel htmlFor="userEmail">Email address</FieldLabel>
                                    <Input className="py-6 text-3xl bg-white" id="userEmail" name="userEmail"/>
                                </Field>
                                <Field>
                                    <div className="flex justify-between items-end  ">
                                        <FieldLabel htmlFor="userPassword">Password</FieldLabel>
                                        <Link href="/forgot-password" className="text-xs text-gray-600 hover:underline">
                                            Forgot password?
                                        </Link>
                                    </div>
                                    <Input className="py-6 text-3xl" id="userPassword" name="userPassword" type="password"/>
                                </Field>
                                <Button asChild className="py-6 text-md bg-black text-white ">
                                    <Link href="/">Sign In <ArrowRight/></Link>
                                </Button>
                            </FieldGroup>
                            <FieldDescription className="text-center text-xs pb-4">or continue with</FieldDescription>
                            <FieldGroup className="">
                                <Field className="flex flex-row">
                                    <Button className="py-6 bg-white flex-1 " variant={"outline"}>Google</Button>
                                    <Button className="py-6 bg-white flex-1 " variant={"outline"}>GitHub</Button>
                                </Field>
                            </FieldGroup>
                            <FieldDescription className="text-center text-xs">Don't have an account? <Link href="/login" className="text-gray-600 hover:underline">Login</Link></FieldDescription>
                        </FieldSet>
                    </FieldGroup>
                </div>
            </div>
            
        </Container>
    );
}

export default Main;