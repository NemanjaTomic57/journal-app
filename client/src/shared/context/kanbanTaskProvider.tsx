"use client"

import { createContext, Dispatch, SetStateAction, useState } from "react";
import { Task } from "../models/task";

export interface ContextProps {
    currentTasks: Task[],
    setCurrentTasks: Dispatch<SetStateAction<Task[]>>,
}

export const KanbanTaskContext = createContext<ContextProps>({
    currentTasks: [],
    setCurrentTasks: () => {},
});

interface Props {
    tasks: Task[]
    children: React.ReactNode
}

export default function KanbanTaskProvider({tasks, children}: Props) {
    const [currentTasks, setCurrentTasks] = useState<Task[]>(tasks);

    return (
        <KanbanTaskContext.Provider value={{currentTasks, setCurrentTasks}}>
            {children}
        </KanbanTaskContext.Provider>
    )
}