"use client"

import { createContext, Dispatch, SetStateAction, useState } from "react";
import { Task } from "../models/task";

export interface ContextProps {
    tasks: Task[],
    setTasks: Dispatch<SetStateAction<Task[]>>,
    activeTask: Task | null,
    setActiveTask: Dispatch<SetStateAction<Task | null>>,
}

export const KanbanTaskContext = createContext<ContextProps>({
    tasks: [],
    setTasks: () => {},
    activeTask: null,
    setActiveTask: () => {},
});

interface Props {
    existingTasks: Task[]
    children: React.ReactNode
}

export default function KanbanTaskProvider({existingTasks, children}: Props) {
    const [tasks, setTasks] = useState<Task[]>(existingTasks);
    const [activeTask, setActiveTask] = useState<Task | null>(null);

    return (
        <KanbanTaskContext.Provider value={{tasks, setTasks, activeTask, setActiveTask}}>
            {children}
        </KanbanTaskContext.Provider>
    )
}