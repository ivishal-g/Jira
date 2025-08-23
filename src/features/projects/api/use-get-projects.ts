import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";


interface UseGetProjectProps {
    workspaceId: string;
}

export const useGetProjects = ({
    workspaceId
}:UseGetProjectProps) => {
    const query = useQuery({
        queryKey: ["workspaces", workspaceId],
        queryFn: async () => {
            const response = await client.api.projects.$get({ 
                query: { workspaceId }
            });

            if(!response.ok){
                throw new Error("Failed to fetch Projects");
            }
            
            const { data } = await response.json();

            return data

        }
    })
    return query;
}