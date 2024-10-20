import React, { useState } from 'react';
import { Modal, Box, Button, TextField } from '@mui/material';
import { TaskTypeConfig } from '../interfaces/Task';

interface ConfigModalProps {
  isOpen: boolean;
  taskTypeConfig: TaskTypeConfig;
  setTaskTypeConfig: (config: TaskTypeConfig) => void;
  onClose: () => void;
}

const ConfigModal: React.FC<ConfigModalProps> = ({ isOpen, taskTypeConfig, setTaskTypeConfig, onClose }) => {
  const [localConfig, setLocalConfig] = useState<TaskTypeConfig>({ ...taskTypeConfig });

  const handleChange = (type: keyof TaskTypeConfig, value: number) => {
    setLocalConfig(prevConfig => ({
      ...prevConfig,
      [type]: value,
    }));
  };

  const handleSave = () => {
    setTaskTypeConfig(localConfig);
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={{ padding: 4, backgroundColor: 'white', width: 400, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <h2>Task Type Configuration</h2>
        <TextField
          label="Small Task (hours)"
          type="number"
          value={localConfig.small}
          onChange={(e) => handleChange('small', parseInt(e.target.value))}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Medium Task (hours)"
          type="number"
          value={localConfig.medium}
          onChange={(e) => handleChange('medium', parseInt(e.target.value))}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Complex Task (hours)"
          type="number"
          value={localConfig.complex}
          onChange={(e) => handleChange('complex', parseInt(e.target.value))}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" onClick={handleSave}>Save</Button>
      </Box>
    </Modal>
  );
};

export default ConfigModal;
