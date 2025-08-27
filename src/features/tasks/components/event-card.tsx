import { cn } from "@/lib/utils";
import { TaskStatus } from "../types";
import { Project } from "@/features/projects/types";




interface EventCardProps {
    title : string;
    assignee: any;
    project: Project;
    status: TaskStatus;
    id: string;
};

const statusColorMap: Record<TaskStatus, string> = {
    [TaskStatus.BACKLOG]: "border-l-pink-500",
    [TaskStatus.TODO]: "border-l-red-500",
    [TaskStatus.IN_PROGRESS]: "border-l-yelloow-500",
    [TaskStatus.IN_REVIEW]: "border-l-blue-500",
    [TaskStatus.DONE]: "border-l-emerald-500",
}

export const EventCard = ({
    title,
    assignee,
    project,
    status,
    id,
}: EventCardProps) => {


    return (
        <div className="px-2">
            <div className={cn(
                "p-1.5 text-xs bg-white text-primary border rounded-md border-l-4 flex flex-col gap-y-1.5 cursor-pointer hvoer:opacity-75 transition"
            )}>
                <p>{title}</p>
            </div>
        </div>
    )
}