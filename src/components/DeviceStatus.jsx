import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { theme, colors } from '../theme/theme';

const DeviceStatus = ({ deviceName, status, onRunTest, onStopTest, onInstallApk }) => {
  const isRunning = status === 'Running';
  
  return (
    <ThemeProvider theme={theme}>
      <Box className="card">
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1rem'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Typography variant="h6" sx={{ margin: 0 }}>{deviceName}</Typography>
            <Typography sx={{ 
              color: isRunning ? colors.primary.main : colors.error.main,
              fontWeight: 500
            }}>
              {isRunning ? 'Running' : 'Stopped'}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', gap: '0.5rem' }}>
            <Button
              variant="outlined"
              onClick={onRunTest}
              sx={{
                color: colors.primary.main,
                borderColor: colors.primary.main,
                '&:hover': {
                  borderColor: colors.primary.light,
                  backgroundColor: colors.action.hover
                }
              }}
            >
              START
            </Button>
            <Button
              variant="outlined"
              onClick={onStopTest}
              sx={{
                color: colors.error.main,
                borderColor: colors.error.main,
                '&:hover': {
                  borderColor: colors.error.dark,
                  backgroundColor: colors.action.hover
                }
              }}
            >
              STOP
            </Button>
            <Button
              variant="outlined"
              onClick={onInstallApk}
              sx={{
                color: colors.primary.main,
                borderColor: colors.primary.main,
                '&:hover': {
                  borderColor: colors.primary.light,
                  backgroundColor: colors.action.hover
                }
              }}
            >
              INSTALL
            </Button>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default DeviceStatus; 