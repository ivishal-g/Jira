"use client";

import { ResponsiveModel } from "@/components/responsive-model";
import { useCreateTaskModal } from "../hooks/use-create-task-modal"
import { CreateTaskFormWrapper } from "./create-task-form-wrapper";


const EditTaskModal = () => {
    const { taskId, close } = useCreateTaskModal();


    return (
        <ResponsiveModel open={!!taskId} onOpenChange={close} >
            {taskId && (
                <CreateTaskFormWrapper onCancel={close} />
            )}
        </ResponsiveModel>
    )

}

export default EditTaskModal;