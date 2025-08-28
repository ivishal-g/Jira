import { getCurrent } from "@/features/auth/queries"
import { EditWorkspaceForm } from "@/features/workspaces/components/edit-workspace-form";
import { getWorkspace } from "@/features/workspaces/queries";
import { redirect } from "next/navigation";



const WorkspaceIdPage = async ({ params }) => {
    const user = await getCurrent();
    if(!user) redirect("/sign-in")
        
    const initialValues = await getWorkspace({  workspaceId })
    
    return (
        <div>
            <EditWorkspaceForm initialValues={initialValues} />
        </div>
    )
}

export default WorkspaceIdPage