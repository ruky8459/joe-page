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
import { ThemeProvider } from '@mui/material/styles';
import { theme, colors } from '../theme/theme';

const ApkInstallModal = ({ open, onClose, onSubmit }) => {
  const [apkName, setApkName] = useState('101002.apk');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(apkName);
  };

  return (
    <ThemeProvider theme={theme}>
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
                color: colors.text.secondary,
                '&:hover': {
                  color: colors.text.primary,
                  backgroundColor: colors.action.hover
                }
              }}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              variant="contained"
              sx={{
                backgroundColor: colors.primary.main,
                '&:hover': {
                  backgroundColor: colors.primary.light
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