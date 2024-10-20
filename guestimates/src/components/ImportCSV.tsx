import React, { useRef } from 'react';
import * as XLSX from 'xlsx';
import { Task, TaskTypeConfig } from '../interfaces/Task';
import { Button } from '@mui/material';

interface ImportExcelProps {
    onImport: (tasks: Task[], config: TaskTypeConfig) => void;
}

const ImportExcel: React.FC<ImportExcelProps> = ({ onImport }) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = new Uint8Array(e.target?.result as ArrayBuffer);
                const workbook = XLSX.read(data, { type: 'array' });

                const tasksSheet = workbook.Sheets['Tasks'];
                const configSheet = workbook.Sheets['Configuration'];

                const tasksData: any[] = XLSX.utils.sheet_to_json(tasksSheet, { header: 1 });
                const configData: any[] = XLSX.utils.sheet_to_json(configSheet, { header: 1 });

                const tasks: Task[] = tasksData.slice(1).map(row => {
                    const [
                        name, 
                        feEffort, feRequiresSupport, 
                        beEffort, beRequiresSupport,
                        analysisEffort, analysisRequiresSupport,
                        documentationEffort, documentationRequiresSupport,
                        certificationEffort, certificationRequiresSupport
                    ] = row;
                    return {
                        name: name as string,
                        feType: { effort: feEffort as keyof TaskTypeConfig, requiresSupport: feRequiresSupport === 'Yes' },
                        beType: { effort: beEffort as keyof TaskTypeConfig, requiresSupport: beRequiresSupport === 'Yes' },
                        analysisType: { effort: analysisEffort as keyof TaskTypeConfig, requiresSupport: analysisRequiresSupport === 'Yes' },
                        documentationType: { effort: documentationEffort as keyof TaskTypeConfig, requiresSupport: documentationRequiresSupport === 'Yes' },
                        certificationType: { effort: certificationEffort as keyof TaskTypeConfig, requiresSupport: certificationRequiresSupport === 'Yes' }
                    };
                });

                const config: TaskTypeConfig = configData.slice(1).reduce((acc, row) => {
                    const [type, effort] = row;
                    acc[type as string] = parseFloat(effort as string);
                    return acc;
                }, {} as TaskTypeConfig);

                onImport(tasks, config);
            };
            reader.readAsArrayBuffer(file);
        }
    };

    return (
        <div>
            <input 
                type="file" 
                accept=".xlsx" 
                ref={fileInputRef} 
                style={{ display: 'none' }} 
                onChange={handleFileUpload} 
            />
            <Button variant="contained" onClick={() => fileInputRef.current?.click()}>Import from Excel</Button>
        </div>
    );
};

export default ImportExcel;
