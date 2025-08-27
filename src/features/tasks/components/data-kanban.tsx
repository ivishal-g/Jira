import { useCallback, useEffect, useState } from "react";
import { Task, TaskStatus } from "../types";
import {
    DragDropContext,
    Draggable,
    Droppable,
    DropResult
} from "@hello-pangea/dnd";
import { KanbanColumnHeader } from "./kanban-column-header";
import { KanbanCard } from "./kanban-card";


const boards: TaskStatus[] = [
    TaskStatus.BACKLOG,
    TaskStatus.TODO,
    TaskStatus.IN_PROGRESS,
    TaskStatus.IN_REVIEW,
    TaskStatus.DONE,
];

type TasksState = {
    [key in TaskStatus]: Task[];
};

interface DataKanbanProps {
    data: Task[];
    onChange: (tasks: { $id: string; status: TaskStatus; position: number }[]) => void;
}


export const DataKanban = ({
    data,
    onChange
}: DataKanbanProps) => {
    const [tasks, setTasks] = useState<TasksState>(() => {
        const initialTasks: TasksState = {
            [TaskStatus.BACKLOG]: [],
            [TaskStatus.TODO]: [],
            [TaskStatus.IN_PROGRESS]: [],
            [TaskStatus.IN_REVIEW]: [],
            [TaskStatus.DONE]: [],
        };

        data.forEach((task) => {
            initialTasks[task.status].push(task);
        })

        Object.keys(initialTasks).forEach((status) => {
            initialTasks[status as TaskStatus].sort((a, b) => a.position - b.position)
        });

        return initialTasks
    });

    useEffect(() => {
        const newTasks: TasksState = {
            [TaskStatus.BACKLOG]: [],
            [TaskStatus.TODO]: [],
            [TaskStatus.IN_PROGRESS]: [],
            [TaskStatus.IN_REVIEW]: [],
            [TaskStatus.DONE]: [],
        };


        data.forEach((task) => {
            newTasks[task.status].push(task);
        });

        Object.keys(newTasks).forEach((status) => {
            newTasks[status as TaskStatus].sort((a, b) => a.position = b.position);
        }, [data])

        setTasks(newTasks)

    }, [data]);

    const onDragEng = useCallback((result: DropResult) => {
        if(!result.destination) return;

        const { source, destination } = result;
        const sourceStatus = source.droppableId as TaskStatus;
        const destStatus = destination.droppableId as TaskStatus;

        let updatsPayload: { $id: string; status: TaskStatus; position: number; }[]

        setTasks((prevTasks) => {
            const newTasks = { ...prevTasks};

            // Safely remove the task from the source column
            const sourceColumn = [...newTasks[sourceStatus]];
            const [movedTask] = sourceColumn.splice(source.index, 1);

            // agar koi task hila nhi toh nhi hoga yaa return error
            if(!movedTask) {
                console.error("No task foun at the source index");
            }
            const updatedMovedTask = sourceStatus !== destStatus
                ? { ...movedTask, status: destStatus}
                : movedTask;

            newTasks[sourceStatus] = sourceColumn;

            const destColumn = [...newTasks[destStatus]];
            destColumn.splice(destination.index, 0, updatedMovedTask);
            newTasks[destStatus] = destColumn;

            updatsPayload = [];

            // Always update the moved task
            updatsPayload.push({
                $id: updatedMovedTask.$id,
                status: destStatus,
                position: Math.min((destination.index + 1) * 10000, 1_000_000)
            })

            //Update positions for affected tasks in the destination column

            newTasks[destStatus].forEach((task, index) => {
                if(task && task.$id !== updatedMovedTask.$id){
                    const newPosition = Math.min((index + 1) * 1000, 1_000_000);

                    if(task.position !== newPosition){
                        updatsPayload.push({
                            $id: task.$id,
                            status: destStatus,
                            position: newPosition,
                        })
                    }
                }
            })

            //Id the task moved between columns, update positons in the source
            if(sourceStatus !== destStatus){
                newTasks[sourceStatus].forEach((task, index) => {
                    if(task) {
                        const newPosition = Math.min((index + 1 ) * 1000, 1_000_000);
                        if(task.position !== newPosition){
                            updatsPayload.push({
                                $id: task.$id,
                                status: sourceStatus,
                                position: newPosition,
                            })
                        }
                    }
                })
            }

            return newTasks;
        });

        onChange(updatsPayload);
    },[onChange]);

    return (
        <DragDropContext onDragEnd={onDragEng}>
            <div className="flex overflow-x-auto">
                {boards.map((board) => {
                    return (
                        <div key={board} className=" flex-1 mx-2 bg-muted p-1.5 rounded-md min-w-[200px]">
                            <KanbanColumnHeader
                                board={board}
                                taskCount={tasks[board].length}
                            />
                            <Droppable droppableId={board}>
                                {(provided) => (
                                    <div
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                        className="min-h-[200px] py-1.5"
                                    >
                                        {tasks[board].map((task, index) => (
                                            <Draggable
                                                key={task.$id}
                                                draggableId={task.$id}
                                                index={index}
                                            >
                                                {(provided) => (
                                                    <div
                                                        {...provided.draggableProps}
                                                        {...provided.draggableProps}
                                                    >
                                                        <KanbanCard task={task} />
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </div>  
                    )
                })}
            </div>
        </DragDropContext >
    )
}