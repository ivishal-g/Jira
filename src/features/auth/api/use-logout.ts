import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferResponseType } from "hono";

import { client } from "@/lib/rpc"
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.auth.logout["$post"]>

export const useLogout = () => {
    const router = useRouter()
    const queryClinet = useQueryClient();

    const mutation = useMutation<
        ResponseType,
        Error
    >({
        mutationFn: async() => {
            const response = await client.api.auth.logout["$post"]();

            if(!response.ok){
                throw new Error("Failed to logout")
            }

            return await response.json();
        },
        onSuccess: () => {
            toast.success("Logged out")
            router.refresh();
            queryClinet.invalidateQueries({ queryKey: ["current"] });
        },
        onError: () => {
            toast.error("failed to logged out");
        }
    }) 

    return mutation;
};  