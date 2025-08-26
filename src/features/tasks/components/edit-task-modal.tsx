"use client";

import { ResponsiveModel } from "@/components/responsive-model";
import { useCreateTaskModal } from "../hooks/use-create-task-modal"

import { EditTaskFormWrapper } from "./edit-task-form-wrapper";


const EditTaskModal = () => {
    const { taskId, close } = useCreateTaskModal();


    return (
        <ResponsiveModel open={!!taskId} onOpenChange={close} >
            {taskId && (
                <EditTaskFormWrapper id={taskId} onCancel={close} />
            )}
        </ResponsiveModel>
    )

}

export default EditTaskModal;