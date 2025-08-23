import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";
import { TaskStatus } from "../types";


interface UseGetTasksProps {
    workspaceId: string;
    projecrtId?: string | null;
    status?: TaskStatus | null;
    search?:string | null;
    assigneedId?: string | null;
    dueDate?: string | null;
}

export const useGetTasks = ({
    workspaceId,
    projecrtId,
    search,
    status,
    assigneedId,
    dueDate
}:UseGetTasksProps) => {
    const query = useQuery({
        queryKey: ["tasks", 
            workspaceId,
            projecrtId,
            search,
            status,
            assigneedId,
            dueDate
        ],
        queryFn: async () => {
            const response = await client.api.tasks.$get({ 
                query: { 
                    workspaceId,
                    projectId: projecrtId ?? undefined,
                    status : status ?? undefined,
                    assigneedId : assigneedId ?? undefined,
                    search : search ?? undefined,
                    dueDate : dueDate ?? undefined
                }
            });

            if(!response.ok){
                throw new Error("Failed to fetch Tasks");
            }
            
            const { data } = await response.json();

            return data;

        }
    })
    return query;
}