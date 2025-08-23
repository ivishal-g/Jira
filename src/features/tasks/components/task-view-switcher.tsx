"use client";

import { DottedSeparator } from "@/components/dotted-separator"
import { Button } from "@/components/ui/button"
import { Tabs } from "@/components/ui/tabs"
import { TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs"
import { Loader, PlusIcon } from "lucide-react"
import { useCreateTaskModal } from "../hooks/use-create-task-modal"
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { useGetTasks } from "../api/use-get-tasks";
import { useQueryStates } from "nuqs";
import { DataFilters } from "./data-filters";



export const TaskViewSwitcher = () => {
    const [ view, setView ] = useQueryStates( "task-view", {
        defaultValue: "table"
    })
    const { open } = useCreateTaskModal();
    const workspaceId = useWorkspaceId();

    const { 
        data: tasks, 
        isLoading: isLoadingTasks 
    } = useGetTasks({ workspaceId })


    return (
        <Tabs 
            defaultValue={view}
            onValueChange={setView}
            className="flex-1 w-full border rounded-lg "
        >
            <div className="h-full flex flex-col overflow-auto p-4">
                <div className="flex flex-col gap-y-2 lg:flex-row justify-between items-center ">
                    <TabsList>
                        <TabsTrigger
                            className="h-8 w-full lg:w-auto"
                            value="table"
                        >
                            Tables
                        </TabsTrigger>
                        <TabsTrigger
                            className="h-8 w-full lg:w-auto"
                            value="kanban"
                        >
                            Kanban
                        </TabsTrigger>
                        <TabsTrigger
                            className="h-8 w-full lg:w-auto"
                            value="calendar"
                        >
                            Calendar
                        </TabsTrigger>
                    </TabsList>
                    <Button
                        onClick={open}
                        size="sm"
                        className="w-full lg:w-auto"
                    >
                        <PlusIcon className="size-4 mr-2" />
                        New
                    </Button>
                </div>
                <DottedSeparator className="my-4"/>
                    <DataFilters/>
                <DottedSeparator className="my-4"/>
                {isLoadingTasks ? (
                    <div className="w-full border rounded-lg h-[200px] flex flex-col items-center justify-center ">
                        <Loader />
                    </div>
                ) : (
                    <>
                        <TabsContent value="table" className="mt-0"> 
                            Data table
                        </TabsContent>
                        <TabsContent value="kanban" className="mt-0"> 
                            Data kanban
                        </TabsContent>
                        <TabsContent value="calendar" className="mt-0"> 
                            Data calendar
                        </TabsContent>
                    </>
                    )}
            </div>
        </Tabs>
    )
}