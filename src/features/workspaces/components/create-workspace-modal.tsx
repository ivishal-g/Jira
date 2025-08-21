"use client";

import { ResponsiveModel } from "@/components/responsive-model"
import { CreateWorkspaceForm } from "./create-workspace-form"
import { useCreateWorkspaceModal } from "../hooks/use-create-workspace-modal";




export const CreateWorkspaceModal = () => {
    const {isOpen, setIsOpen, close} = useCreateWorkspaceModal();



    return (
        <ResponsiveModel open={isOpen} onOpenChange={setIsOpen}>
            <CreateWorkspaceForm onCancel={close} />
        </ResponsiveModel>
    )
};