"use client"

import { DottedSeparator } from "@/components/dotted-separator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useInviteCode } from "../hooks/use-invite-code";
import { useJoinWorkspace } from "../api/use-join-workspace";
import { useWorkspaceId } from "../hooks/use-workspace-id";
import { useRouter } from "next/navigation";
import Link from "next/link";


interface JoinWorkspaceFormProps {
    initialValues: {
        name: string;
    }
}



export const JoinWorkspaceForm = ({initialValues}: JoinWorkspaceFormProps) => {
    const workspaceId = useWorkspaceId();
    const inviteCode = useInviteCode();
    const { mutate, isPending } = useJoinWorkspace();
    const router = useRouter();


    const onSubmit = () => {
        mutate({ 
            param: { workspaceId },
            json: { code: inviteCode }
        },{
            onSuccess: ({ data }) => {
                router.push(`/workspaces/${data.$id}`);
            }
        })
    }


    return (
        <Card className=" w-full h-full border-none shadow-none ">
            <CardHeader className=" p-7 ">
                <CardTitle className="text-xl font-bold">
                    Join workspce
                </CardTitle>
                <CardDescription>
                    You&apos;ve been invited to join <strong>{initialValues.name} workspce</strong>
                </CardDescription>
            </CardHeader>
            <div className="px-7">
                <DottedSeparator/>
            </div>
            <CardContent>
                <div className="flex flex-col lg:flex-row gap-y-2 gap-x-2 items-center justify-center">
                    <Button
                        variant="secondary"
                        type="button"
                        asChild
                        size="lg"
                        className="w-full lg:w-fit"
                        disabled={isPending}
                    >
                        <Link href="/">
                            Cancel
                        </Link>
                    </Button>
                    <Button
                        className="w-full lg:w-fit"
                        size="lg"
                        type="button"
                        onClick={onSubmit}
                    >
                        Join Workspace
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}