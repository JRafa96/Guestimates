type TaskType = {
  [key: string]: number;
};


export type Task = {
  name: string;
  feType: { effort: keyof TaskTypeConfig, requiresSupport?: boolean };
  beType: { effort: keyof TaskTypeConfig, requiresSupport?: boolean };
  analysisType: { effort: keyof TaskTypeConfig, requiresSupport?: boolean };
  documentationType: { effort: keyof TaskTypeConfig, requiresSupport?: boolean };
  certificationType: { effort: keyof TaskTypeConfig, requiresSupport?: boolean };
}

export interface TaskTypeConfig {
  not_aplicaple: number;
  small: number;
  medium: number;
  complex: number;
}

export const defaultTaskTypeConfig: TaskTypeConfig = {
  not_aplicaple: 0,
  small: 4,
  medium: 8,
  complex: 12,
};