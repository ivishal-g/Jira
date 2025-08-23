import { getCurrent } from "@/features/auth/queries";
import { getProject } from "@/features/projects/queries";
import { redirect } from "next/navigation";




interface ProjectIdSettingsPageProps{
    params: {
        projectId: string;
    }
}


const ProjectIdSettingsPage =  async ({ params }: ProjectIdSettingsPageProps) => {
    const user = await getCurrent();
    if(!user) redirect("/sign-in")


    const initialValues = await getProject({
        projectId: params.projectId,
    });

    return (
        <div>
            Settins Page 
        </div>
    )
}

export default ProjectIdSettingsPage;