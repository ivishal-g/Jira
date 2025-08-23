"use client";


import { ResponsiveModel } from "@/components/responsive-model";
import { useCreateTaskModal } from "../hooks/use-create-task-modal"



const CreateTaskModal = () => {
    const { isOpen, setIsOpen } = useCreateTaskModal();


    return (
        <ResponsiveModel open={isOpen} onOpenChange={setIsOpen} >
            <div>
                Boom
            </div>
        </ResponsiveModel>
    )

}

export default CreateTaskModal;