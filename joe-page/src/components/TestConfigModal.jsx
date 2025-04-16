import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
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

const TestConfigModal = ({ open, onClose, onSubmit, targetDevice }) => {
  const [formData, setFormData] = React.useState({
    testType: 'photos',
    priority: 'P0 or P1 or P2 or P3',
    repeatCount: 1
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(targetDevice, formData);
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
        <DialogTitle>Test Configuration</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: '300px' }}>
              <FormControl fullWidth>
                <InputLabel>Test Type</InputLabel>
                <Select
                  name="testType"
                  value={formData.testType}
                  onChange={handleChange}
                  label="Test Type"
                >
                  <MenuItem value="photos">Photos</MenuItem>
                  <MenuItem value="albums">Albums</MenuItem>
                  <MenuItem value="explore">Explore</MenuItem>
                  <MenuItem value="app">App</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Priority</InputLabel>
                <Select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  label="Priority"
                >
                  <MenuItem value="P0">P0</MenuItem>
                  <MenuItem value="P1">P1</MenuItem>
                  <MenuItem value="P2">P2</MenuItem>
                  <MenuItem value="P3">P3</MenuItem>
                  <MenuItem value="P0 or P1 or P2 or P3">All</MenuItem>
                </Select>
              </FormControl>

              <TextField
                name="repeatCount"
                label="Repeat Count"
                type="number"
                value={formData.repeatCount}
                onChange={handleChange}
                inputProps={{ min: 1 }}
                fullWidth
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
              Start Test
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </ThemeProvider>
  );
};

export default TestConfigModal; 