
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/rpc"
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.member[":memberId"]["$patch"], 200>
type RequestType = InferRequestType<typeof client.api.member[":memberId"]["$patch"]>

export const useUpdateMember = () => {
    const queryClient = useQueryClient();

    const Mutation = useMutation<   
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async({ param, json }) => {
            const response = await client.api.member[":memberId"]["$patch"]({ param , json});

             if(!response.ok){
                throw new Error("Failed to update member")
            }

            return await response.json();
        },
        onSuccess: () => {
            toast.success("Member updated")
            queryClient.invalidateQueries({ queryKey: ["members"] });
        },
        onError: () => {
            toast.error("Failed to update Member")
        }
    })

    return Mutation;
};