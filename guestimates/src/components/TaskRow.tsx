import React from 'react';
import './TaskRow.css';
import { TableRow, TableCell, Select, MenuItem, Checkbox } from '@mui/material';
import { Task, TaskTypeConfig } from '../interfaces/Task';


interface TaskRowProps {
  index: number;
  task: Task;
  taskTypeConfig: TaskTypeConfig;
  updateTask: (index: number, updatedTask: Task) => void;
}

const TaskRow: React.FC<TaskRowProps> = ({ index, task, taskTypeConfig, updateTask }) => {
  
  const handleTypeChange = (category: keyof Task, type: keyof TaskTypeConfig) => {
    const updatedTask = { ...task, [category]: {effort: type}};
    updateTask(index, updatedTask);
  };

  const calculateHours = (type: keyof TaskTypeConfig) => {
    debugger
    return taskTypeConfig[type];
  };

  const totalHours = calculateHours(task.feType.effort) + calculateHours(task.beType.effort) + calculateHours(task.analysisType.effort) +
                     calculateHours(task.documentationType.effort) + calculateHours(task.certificationType.effort);

  return (
    <TableRow className={'task-value-row-container '.concat(index % 2 === 0 ? 'light' : 'dark')}>
      <TableCell>
        <input className={"name-input"} type="text" value={task.name} onChange={(e) => updateTask(index, { ...task, name: e.target.value })} />
      </TableCell>
      <TableCell>
        <Select value={task.feType.effort} onChange={(e) => handleTypeChange('feType', e.target.value as keyof TaskTypeConfig)}>
          <MenuItem value="not_aplicaple">N.A.</MenuItem>
          <MenuItem value="small">Small</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="complex">Complex</MenuItem>
        </Select>
        <div className='checkbox_support_container'>
          <span>Support: </span>
          <Checkbox className='support_checkbox'></Checkbox>
        </div>
      </TableCell>
      <TableCell>
        <Select value={task.beType.effort} onChange={(e) => handleTypeChange('beType', e.target.value as keyof TaskTypeConfig)}>
          <MenuItem value="not_aplicaple">N.A.</MenuItem>
          <MenuItem value="small">Small</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="complex">Complex</MenuItem>
        </Select>
        <div className='checkbox_support_container'>
          <span>Support: </span>
          <Checkbox className='support_checkbox'></Checkbox>
        </div>
      </TableCell>
      <TableCell>
        <Select value={task.analysisType.effort} onChange={(e) => handleTypeChange('analysisType', e.target.value as keyof TaskTypeConfig)}>
          <MenuItem value="not_aplicaple">N.A.</MenuItem>
          <MenuItem value="small">Small</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="complex">Complex</MenuItem>
        </Select>
        <div className='checkbox_support_container'>
          <span>Support: </span>
          <Checkbox className='support_checkbox'></Checkbox>
        </div>
      </TableCell>
      <TableCell>
        <Select value={task.documentationType.effort} onChange={(e) => handleTypeChange('documentationType', e.target.value as keyof TaskTypeConfig)}>
          <MenuItem value="not_aplicaple">N.A.</MenuItem>
          <MenuItem value="small">Small</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="complex">Complex</MenuItem>
        </Select>
        <div className='checkbox_support_container'>
          <span>Support: </span>
          <Checkbox className='support_checkbox'></Checkbox>
        </div>
      </TableCell>
      <TableCell>
        <Select value={task.certificationType.effort} onChange={(e) => handleTypeChange('certificationType', e.target.value as keyof TaskTypeConfig)}>
          <MenuItem value="not_aplicaple">N.A.</MenuItem>
          <MenuItem value="small">Small</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="complex">Complex</MenuItem>
        </Select>
        <div className='checkbox_support_container'>
          <span>Support: </span>
          <Checkbox className='support_checkbox'></Checkbox>
        </div>
      </TableCell>
      <TableCell>
        {totalHours}
      </TableCell>
    </TableRow>
  );
};

export default TaskRow;
