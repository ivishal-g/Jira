"use client";

import { ResponsiveModel } from "@/components/responsive-model";
import { useCreateTaskModal } from "../hooks/use-create-task-modal"
import { CreateTaskFormWrapper } from "./create-task-form-wrapper";


const CreateTaskModal = () => {
    const { isOpen, setIsOpen, close } = useCreateTaskModal();


    return (
        <ResponsiveModel open={isOpen} onOpenChange={setIsOpen} >
            <CreateTaskFormWrapper onCancel={close} />
        </ResponsiveModel>
    )

}

export default CreateTaskModal;