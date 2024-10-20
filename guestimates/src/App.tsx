import React, { useState } from 'react';
import { Container } from '@mui/material';
import { Task, TaskTypeConfig, defaultTaskTypeConfig } from './interfaces/Task';
import './App.css';
import { EditTasksTab } from './components/EditTasksTab';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskTypeConfig, setTaskTypeConfig] = useState<TaskTypeConfig>(defaultTaskTypeConfig);

  const calculateTotalHours = ():number => {
    return tasks.reduce((total, task) => {
      const taskTotal = taskTypeConfig[task.feType.effort] +
                        taskTypeConfig[task.beType.effort] +
                        taskTypeConfig[task.analysisType.effort] +
                        taskTypeConfig[task.documentationType.effort] +
                        taskTypeConfig[task.certificationType.effort];
      return total + taskTotal;
    }, 0);
  };

  return (
    <Container>
      <h1>Guestimates</h1>
      
      <EditTasksTab totalEffort={calculateTotalHours()} tasks={tasks} setTasks={setTasks} taskTypeConfig={taskTypeConfig} setTaskTypeConfig={setTaskTypeConfig}/>
        
    </Container>
  );
};

export default App;
