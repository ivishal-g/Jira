import { useQueryState, parseAsBoolean } from "nuqs";




export const useCreateWorkspaceModal = () => {
    const [isOpen, setIsOpen] = useQueryState(
        "create-workspace",
        parseAsBoolean.withDefault(false).withOptions({ clearOnDefault:true })
    )

    return {
        isOpen,
        open,
        close,
        setIsOpen,
    }
}