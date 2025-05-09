export interface Task {
    id: number;
    title: string;
    description: string;
    priority: Priority;
    status?: Status;
    tags?: string[];
    attachments?: File[];
    createdAt?: Date;
    effortEstimate?: string;
    dueDate: Date;
}

export enum Status {
    Backlog = "Backlog",
    ToDo = "To Do",
    InProgress = "In Progress",
    Done = "Done",
}

export enum Priority {
    High = "High",
    Medium = "Medium",
    Low = "Low",
}

export const priorityIconMap: Record<Priority, string> = {
    [Priority.Low]: "prioLow",
    [Priority.Medium]: "prioMedium",
    [Priority.High]: "prioHigh",
}

export const priorityListDd = Object.values(Priority).map((priority) => ({
    text: priority,
    icon: priorityIconMap[priority],
}))