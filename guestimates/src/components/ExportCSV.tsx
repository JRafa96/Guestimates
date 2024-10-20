import React from 'react';
import * as XLSX from 'xlsx';
import { Task, TaskTypeConfig } from '../interfaces/Task';
import { Button } from '@mui/material';

interface ExportExcelProps {
    tasks: Task[];
    config: TaskTypeConfig;
}

const ExportExcel: React.FC<ExportExcelProps> = ({ tasks, config }) => {
    const handleExport = () => {
        const taskHeaders = [
            'Task Name',
            'FE Effort', 'FE Requires Support',
            'BE Effort', 'BE Requires Support',
            'Analysis Effort', 'Analysis Requires Support',
            'Documentation Effort', 'Documentation Requires Support',
            'Certification Effort', 'Certification Requires Support',
            'Total Effort'
        ];

        const taskRows = tasks.map(task => {
            const totalEffort = calculateTotalEffort(task, config);
            return [
                task.name,
                task.feType.effort, task.feType.requiresSupport ? 'Yes' : 'No',
                task.beType.effort, task.beType.requiresSupport ? 'Yes' : 'No',
                task.analysisType.effort, task.analysisType.requiresSupport ? 'Yes' : 'No',
                task.documentationType.effort, task.documentationType.requiresSupport ? 'Yes' : 'No',
                task.certificationType.effort, task.certificationType.requiresSupport ? 'Yes' : 'No',
                totalEffort
            ];
        });

        const configHeaders = ['Type', 'Effort'];
        const configRows = Object.entries(config).map(([type, effort]) => [type, effort]);

        const worksheetTasks = XLSX.utils.aoa_to_sheet([taskHeaders, ...taskRows]);
        const worksheetConfig = XLSX.utils.aoa_to_sheet([configHeaders, ...configRows]);

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheetTasks, 'Tasks');
        XLSX.utils.book_append_sheet(workbook, worksheetConfig, 'Configuration');

        XLSX.writeFile(workbook, 'estimates.xlsx');
    };

    const calculateTotalEffort = (task: Task, config: TaskTypeConfig) => {
        const feEffort = task.feType.requiresSupport
            ? config[task.feType.effort] * 1.2
            : config[task.feType.effort];
        const beEffort = task.beType.requiresSupport
            ? config[task.beType.effort] * 1.2
            : config[task.beType.effort];
        const analysisEffort = task.analysisType.requiresSupport
            ? config[task.analysisType.effort] * 1.2
            : config[task.analysisType.effort];
        const documentationEffort = task.documentationType.requiresSupport
            ? config[task.documentationType.effort] * 1.2
            : config[task.documentationType.effort];
        const certificationEffort = task.certificationType.requiresSupport
            ? config[task.certificationType.effort] * 1.2
            : config[task.certificationType.effort];
        return feEffort + beEffort + analysisEffort + documentationEffort + certificationEffort;
    };

    return <div className='export-button-container'>
                <Button variant="contained" onClick={handleExport}>Export to Excel</Button>
            </div>
};

export default ExportExcel;
