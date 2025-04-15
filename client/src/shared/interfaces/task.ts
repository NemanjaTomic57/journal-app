export interface Task {
    title: string;
    description: string;
    priority: Priority;
    status: Status;
    tags: string[];
    createdAt: Date;
    effortEstimate: string;
    dueDate: Date;
}

export enum Status {
    Backlog = "Backlog",
    ToDo = "To Do",
    InProgress = "In Progress",
    Done = "Done",
}

export enum Priority {
    Low,
    Medium,
    High,
}

export const priorityIconMap: Record<Priority, string> = {
    [Priority.Low]: "prioLow",
    [Priority.Medium]: "prioMedium",
    [Priority.High]: "prioHigh",
}