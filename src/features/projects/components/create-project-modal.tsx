"use client";

import { ResponsiveModel } from "@/components/responsive-model"
import { CreateProjectForm } from "./create-project-form"
import { useCreateProjectModal } from "../hooks/use-create-project-modal";




export const CreateProjectModal = () => {
    const {isOpen, setIsOpen, close} = useCreateProjectModal();



    return (
        <ResponsiveModel open={isOpen} onOpenChange={setIsOpen}>
            <CreateProjectForm onCancel={close} />
        </ResponsiveModel>
    )
};