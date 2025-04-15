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

const ApkInstallModal = ({ open, onClose, onSubmit }) => {
  const [apkName, setApkName] = useState('101002.apk');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(apkName);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Install APK</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box sx={{ width: 300 }}>
            <TextField
              fullWidth
              label="APK Name"
              value={apkName}
              onChange={(e) => setApkName(e.target.value)}
              margin="normal"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            Install
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ApkInstallModal; 