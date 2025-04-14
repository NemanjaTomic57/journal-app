export enum Status {
    Backlog,
    "To Do",
    "In Progress",
    Done,
}

export enum Priority {
    Low,
    Medium,
    High,
}

export interface Task {
    title: string;
    description: string;
    priority: Priority;
    status?: Status;
    tags: string[];
    createdAt: Date;
    effortEstimate: string;
}
