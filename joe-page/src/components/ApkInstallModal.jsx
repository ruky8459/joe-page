import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      paper: '#243141',
    },
    primary: {
      main: '#00BFA5',
    },
  },
  components: {
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: '#243141',
          color: '#FFFFFF',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& fieldset': {
            borderColor: 'rgba(255, 255, 255, 0.23)',
          },
          '&:hover fieldset': {
            borderColor: '#00BFA5',
          },
        },
      },
    },
  },
});

const ApkInstallModal = ({ open, onClose, onSubmit }) => {
  const [apkName, setApkName] = useState('101002.apk');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(apkName);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Dialog 
        open={open} 
        onClose={onClose}
        PaperProps={{
          style: {
            borderRadius: '8px',
          },
        }}
      >
        <DialogTitle>Install APK</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Box sx={{ minWidth: '300px' }}>
              <TextField
                fullWidth
                label="APK Name"
                value={apkName}
                onChange={(e) => setApkName(e.target.value)}
                margin="normal"
              />
            </Box>
          </DialogContent>
          <DialogActions sx={{ padding: 2 }}>
            <Button 
              onClick={onClose}
              sx={{ 
                color: 'rgba(255, 255, 255, 0.7)',
                '&:hover': {
                  color: '#fff',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)'
                }
              }}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              variant="contained"
              sx={{
                backgroundColor: '#00BFA5',
                '&:hover': {
                  backgroundColor: '#00A693'
                }
              }}
            >
              Install
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </ThemeProvider>
  );
};

export default ApkInstallModal; 