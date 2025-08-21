"use client";

import { RiAddCircleFill } from "react-icons/ri"
import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
import { Select, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { SelectContent } from "@radix-ui/react-select";
import { WorkspaceAvatar } from "@/features/workspaces/components/workspace-avatar";


export const WorkspaceSwitcher = () => {
    const { data: workspaces } = useGetWorkspaces();



    return (
        <div className="flex flex-col gap-y-2">
            <div className="flex items-center justify-between">
                <p className="text-xs uppercase text-neutral-500 ">Workspaces</p>
                <RiAddCircleFill className="size-5 text-neutral-500 cursor-pointer hover:opacity-75 transition " />
            </div>
            <Select>
                <SelectTrigger className="w-full bg-neutral-200 font-medium p-2">
                    <SelectValue placeholder="No workspace selected" />
                </SelectTrigger>
                <SelectContent>
                    {workspaces?.documents.map((workspacce) => (
                        <SelectItem key={workspacce.$id} value={workspacce.$id}>
                            <div className="flex justify-start items-center gap-3 font-medium ">
                                <WorkspaceAvatar name={workspacce.name} image={workspacce.imageUrl}/>
                            </div>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>  
    )
}