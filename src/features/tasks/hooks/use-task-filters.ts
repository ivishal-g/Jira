import { parseAsString, parseAsStringEnum, useQueryState } from "nuqs"
import { TaskStatus } from "../types"




export const useTaskFilters = () => {

    
    return useQueryState({
        projectId: parseAsString,
        status: parseAsStringEnum(Object.values(TaskStatus)),
        assigneeId: parseAsString,
        search: parseAsString,
        dueDate: parseAsString,
    })
}   