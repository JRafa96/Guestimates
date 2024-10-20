import { Task, TaskTypeConfig } from '../interfaces/Task';

export interface EditTaskTabProps {
    tasks: Task[];
    taskTypeConfig: TaskTypeConfig;
    setTasks: (tasks: Task[]) => void;
    setTaskTypeConfig: (config: TaskTypeConfig) => void;
    totalEffort: number;
}