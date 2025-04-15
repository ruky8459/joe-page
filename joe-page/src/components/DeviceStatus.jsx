import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const DeviceStatus = ({ deviceName, status, onRunTest, onStopTest, onInstallApk }) => {
  const isRunning = status === 'Running';
  
  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      p: 2,
      borderBottom: '1px solid #eee',
      '&:last-child': {
        borderBottom: 'none'
      }
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography variant="h6" component="div">
          {deviceName}
        </Typography>
        <Typography 
          sx={{ 
            color: isRunning ? 'success.main' : 'error.main',
            fontWeight: 500
          }}
        >
          {isRunning ? 'Running' : 'Stopped'}
        </Typography>
      </Box>
      
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Button
          variant="outlined"
          color="primary"
          onClick={onRunTest}
          sx={{
            bgcolor: 'background.paper',
            minWidth: '80px'
          }}
        >
          Start
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={onStopTest}
          sx={{
            minWidth: '80px'
          }}
        >
          Stop
        </Button>
        <Button
          variant="outlined"
          color="info"
          onClick={onInstallApk}
          sx={{
            bgcolor: 'background.paper',
            minWidth: '80px'
          }}
        >
          Install
        </Button>
      </Box>
    </Box>
  );
};

export default DeviceStatus; 