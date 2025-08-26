import { z }  from "zod";
import { TaskStatus } from "./types";




export const createTaskSchema = z.object({
  name: z.string(),
  status: z.nativeEnum(TaskStatus),
  workspaceId: z.string(),
  projectId: z.string(),
  dueDate: z.date(),
  assigneedId: z.string(),
  description: z.string().optional(),
  image: z.any().optional(),
});
