import { useState, useEffect } from 'react';
import { Container, Typography, Box, Paper, Alert } from '@mui/material';
import DeviceStatus from './components/DeviceStatus';
import TestConfigModal from './components/TestConfigModal';
import ApkInstallModal from './components/ApkInstallModal';
import MessageBox from './components/MessageBox';
import { api, DEVICE_MAPPING } from './api/config';

function App() {
  const [devices, setDevices] = useState([]);
  const [testModalOpen, setTestModalOpen] = useState(false);
  const [apkModalOpen, setApkModalOpen] = useState(false);
  const [targetDevice, setTargetDevice] = useState(null);
  const [message, setMessage] = useState({ open: false, text: '', severity: 'info' });

  useEffect(() => {
    loadDeviceStatus();
    const interval = setInterval(loadDeviceStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  const loadDeviceStatus = async () => {
    try {
      const response = await api.get('/test_status');
      const data = response.data;
      
      // 将API返回的活动任务转换为设备列表
      const deviceList = data.active_tasks.map((task, index) => ({
        id: `device${index + 1}`,
        name: task?.device_name || `Device ${index + 1}`,
        status: task ? 'Running' : 'Stopped',
        deviceId: task?.device_id || ''
      }));

      setDevices(deviceList);
      
      // 更新设备映射
      deviceList.forEach(device => {
        if (device.deviceId) {
          DEVICE_MAPPING[device.id] = device.deviceId;
        }
      });
    } catch (error) {
      showMessage('Failed to load device status', 'error');
    }
  };

  const handleRunTest = (deviceId) => {
    setTargetDevice(deviceId);
    setTestModalOpen(true);
  };

  const handleStopTest = async (deviceId) => {
    const deviceIdValue = DEVICE_MAPPING[deviceId];
    if (!deviceIdValue) {
      showMessage('No active task on this device', 'error');
      return;
    }

    try {
      const response = await api.post('/stop_test', { device_id: deviceIdValue });
      if (response.data.status === 'success') {
        showMessage(response.data.message, 'success');
        loadDeviceStatus();
      } else {
        showMessage('Failed to stop test', 'error');
      }
    } catch (error) {
      showMessage('Failed to stop test', 'error');
    }
  };

  const handleInstallApk = (deviceId) => {
    setTargetDevice(deviceId);
    setApkModalOpen(true);
  };

  const handleApkInstall = async (apkName) => {
    const deviceId = targetDevice;
    const deviceIdValue = DEVICE_MAPPING[deviceId];

    try {
      const response = await api.post('/install_apk', {
        device_id: deviceIdValue,
        apk_name: apkName
      });

      if (response.data.status === 'success') {
        showMessage(response.data.message, 'success');
      } else {
        showMessage('Failed to install APK', 'error');
      }
      setApkModalOpen(false);
    } catch (error) {
      showMessage('Failed to install APK', 'error');
    }
  };

  const handleTestSubmit = async (deviceId, formData) => {
    try {
      const response = await api.post('/run_test', {
        device_id: DEVICE_MAPPING[deviceId] || '',
        type: formData.testType,
        priority: formData.priority,
        count: formData.repeatCount
      });

      const device = devices.find(d => d.id === deviceId);
      showMessage(
        `Test started on ${device?.name || deviceId}`,
        'success'
      );
      setTestModalOpen(false);
      loadDeviceStatus();
    } catch (error) {
      showMessage('Failed to start test', 'error');
    }
  };

  const showMessage = (text, severity = 'info') => {
    setMessage({ open: true, text, severity });
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {api.isMockMode() && (
        <Alert 
          severity="info" 
          sx={{ 
            mb: 2,
            '& .MuiAlert-message': {
              width: '100%',
              textAlign: 'center'
            }
          }}
        >
          Current using mock data for demonstration
        </Alert>
      )}
      
      <Paper sx={{ borderRadius: 2, overflow: 'hidden' }}>
        <Box sx={{ p: 3, bgcolor: '#f8f9fa' }}>
          <Typography variant="h5" component="h1" gutterBottom>
            Device Status
          </Typography>
        </Box>
        
        <Box>
          {devices.length === 0 ? (
            <Box sx={{ p: 3, textAlign: 'center', color: 'text.secondary' }}>
              No devices available
            </Box>
          ) : (
            devices.map(device => (
              <DeviceStatus
                key={device.id}
                deviceName={device.name}
                status={device.status}
                onRunTest={() => handleRunTest(device.id)}
                onStopTest={() => handleStopTest(device.id)}
                onInstallApk={() => handleInstallApk(device.id)}
              />
            ))
          )}
        </Box>
      </Paper>

      <TestConfigModal
        open={testModalOpen}
        onClose={() => setTestModalOpen(false)}
        onSubmit={handleTestSubmit}
        targetDevice={targetDevice}
      />

      <ApkInstallModal
        open={apkModalOpen}
        onClose={() => setApkModalOpen(false)}
        onSubmit={handleApkInstall}
      />

      <MessageBox
        open={message.open}
        message={message.text}
        severity={message.severity}
        onClose={() => setMessage(prev => ({ ...prev, open: false }))}
      />
    </Container>
  );
}

export default App;
