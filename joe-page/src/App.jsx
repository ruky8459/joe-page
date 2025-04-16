import { useState } from 'react'
import './App.css'
import DeviceStatus from './components/DeviceStatus'
import TestConfigModal from './components/TestConfigModal'
import ApkInstallModal from './components/ApkInstallModal'
import MessageBox from './components/MessageBox'
import { mockDevices } from './api/mockData'

function App() {
  const [devices, setDevices] = useState(mockDevices)
  const [testConfigOpen, setTestConfigOpen] = useState(false)
  const [apkInstallOpen, setApkInstallOpen] = useState(false)
  const [selectedDevice, setSelectedDevice] = useState(null)
  const [message, setMessage] = useState({ open: false, text: '', severity: 'info' })

  const handleRunTest = (deviceName) => {
    setSelectedDevice(deviceName)
    setTestConfigOpen(true)
  }

  const handleStopTest = (deviceName) => {
    setMessage({
      open: true,
      text: `Test stopped on ${deviceName}`,
      severity: 'info'
    })
  }

  const handleInstallApk = (deviceName) => {
    setSelectedDevice(deviceName)
    setApkInstallOpen(true)
  }

  const handleTestConfigSubmit = (deviceName, config) => {
    setTestConfigOpen(false)
    setMessage({
      open: true,
      text: `Test started on ${deviceName} with config: ${JSON.stringify(config)}`,
      severity: 'success'
    })
  }

  const handleApkInstall = (apkName) => {
    setApkInstallOpen(false)
    setMessage({
      open: true,
      text: `Installing ${apkName} on ${selectedDevice}`,
      severity: 'success'
    })
  }

  return (
    <div className="app-container" style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <div style={{ marginBottom: '1rem', textAlign: 'center' }}>
        <h1>Device Status</h1>
        <div className="text-secondary" style={{ marginBottom: '2rem' }}>
          Current using mock data for demonstration
        </div>
      </div>

      <div className="device-list">
        {devices.map(device => (
          <DeviceStatus
            key={device.name}
            deviceName={device.name}
            status={device.status}
            onRunTest={() => handleRunTest(device.name)}
            onStopTest={() => handleStopTest(device.name)}
            onInstallApk={() => handleInstallApk(device.name)}
          />
        ))}
      </div>

      <TestConfigModal
        open={testConfigOpen}
        onClose={() => setTestConfigOpen(false)}
        onSubmit={handleTestConfigSubmit}
        targetDevice={selectedDevice}
      />

      <ApkInstallModal
        open={apkInstallOpen}
        onClose={() => setApkInstallOpen(false)}
        onSubmit={handleApkInstall}
      />

      <MessageBox
        open={message.open}
        message={message.text}
        severity={message.severity}
        onClose={() => setMessage({ ...message, open: false })}
      />
    </div>
  )
}

export default App
