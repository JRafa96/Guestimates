import React, { useState } from 'react';
import { Container, Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material';
import ExportCSV from './ExportCSV';
import ImportExcel from './ImportCSV';
import TaskRow from './TaskRow';
import ConfigModal from './ConfigModal';
import { EditTaskTabProps } from '../interfaces/EditTaskTabProps';
import { Task, TaskTypeConfig } from '../interfaces/Task';

export const EditTasksTab: React.FC<EditTaskTabProps> = ({ tasks, taskTypeConfig, totalEffort, setTasks, setTaskTypeConfig }) => {
    const [isConfigOpen, setIsConfigOpen] = useState(false);

    const handleImport = (importedTasks: Task[], importedConfig: TaskTypeConfig) => {
        setTasks(importedTasks);
        setTaskTypeConfig(importedConfig);
    };

    const addTask = () => {
    setTasks([...tasks, { name: '', feType: {effort: 'small'}, beType: {effort: 'small'}, analysisType: {effort: 'small'}, documentationType: {effort: 'small'}, certificationType: {effort: 'small'} }]);
    };

    const updateTask = (index: number, updatedTask: Task) => {
        debugger
        const updatedTasks = tasks.map((task, i) => (i === index ? updatedTask : task));
        setTasks(updatedTasks);
    };

    return <Container>
        <div className='header-buttons'>
            <Button variant="contained" onClick={() => setIsConfigOpen(true)}>Configurar tempos de tarefa</Button>
            <div className='import-feature-buttons'>
                <ExportCSV config={taskTypeConfig} tasks={tasks} />
                <ImportExcel onImport={handleImport} />
            </div>
        </div>
        <Table>
            <TableHead>
                <TableRow className='task-table-header'>
                    <TableCell>Tarefa</TableCell>
                    <TableCell>FE Dev</TableCell>
                    <TableCell>BE Dev</TableCell>
                    <TableCell>Análise</TableCell>
                    <TableCell>Documentação</TableCell>
                    <TableCell>Certificação</TableCell>
                    <TableCell>Total Horas</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {tasks.map((task, index) => (
                    <TaskRow key={index} index={index} task={task} taskTypeConfig={taskTypeConfig} updateTask={updateTask} />
                ))}
                <TableRow>
                    <TableCell colSpan={6}>Total de horas de todas as tarefas</TableCell>
                    <TableCell>{totalEffort}</TableCell>
                </TableRow>
            </TableBody>
        </Table>
        <Button variant="contained" onClick={addTask}>Add Task</Button>
        <ConfigModal isOpen={isConfigOpen} taskTypeConfig={taskTypeConfig} setTaskTypeConfig={setTaskTypeConfig} onClose={() => setIsConfigOpen(false)} />
    </Container>
}