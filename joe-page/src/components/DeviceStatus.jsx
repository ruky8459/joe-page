import React from 'react';

const DeviceStatus = ({ deviceName, status, onRunTest, onStopTest, onInstallApk }) => {
  const isRunning = status === 'Running';
  
  return (
    <div className="card">
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <h3 style={{ margin: 0 }}>{deviceName}</h3>
          <span style={{ 
            color: isRunning ? 'var(--accent-color)' : '#dc3545',
            fontWeight: 500
          }}>
            {isRunning ? 'Running' : 'Stopped'}
          </span>
        </div>
        
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            className="button outline"
            onClick={onRunTest}
          >
            START
          </button>
          <button
            className="button danger"
            onClick={onStopTest}
          >
            STOP
          </button>
          <button
            className="button outline"
            onClick={onInstallApk}
          >
            INSTALL
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeviceStatus; 