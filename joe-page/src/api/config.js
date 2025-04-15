import axios from 'axios';
import { mockTestStatus } from './mockData';

export const API_BASE_URL = 'http://172.16.60.53:5000';

// 创建真实API实例
const realApi = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// 创建模拟API实例
const mockApi = {
  get: async (url) => {
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 500));
    
    switch (url) {
      case '/test_status':
        return { data: mockTestStatus };
      default:
        throw new Error('Not found');
    }
  },
  
  post: async (url, data) => {
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 500));
    
    switch (url) {
      case '/run_test':
        return {
          data: {
            task_id: Math.floor(Math.random() * 10000).toString(),
            device_id: data.device_id
          }
        };
      case '/stop_test':
        return {
          data: {
            device_id: data.device_id,
            message: `Successfully stopped 1 task(s) on device ${data.device_id}`,
            status: 'success',
            stopped_tasks: [Math.floor(Math.random() * 1000).toString()],
            timestamp: new Date().toISOString()
          }
        };
      case '/install_apk':
        return {
          data: {
            apk_name: data.apk_name,
            device_id: data.device_id,
            message: 'Uninstalled existing APK and APK installed successfully',
            status: 'success',
            timestamp: new Date().toISOString()
          }
        };
      default:
        throw new Error('Not found');
    }
  }
};

// 创建一个智能API代理
class ApiProxy {
  constructor() {
    this.useMock = false;
    this.checkRealApi();
  }

  async checkRealApi() {
    try {
      await realApi.get('/test_status');
      this.useMock = false;
    } catch (error) {
      this.useMock = true;
      console.log('Real API not available, using mock data');
    }
  }

  async get(url) {
    try {
      if (!this.useMock) {
        return await realApi.get(url);
      }
    } catch (error) {
      this.useMock = true;
      console.log('Falling back to mock data');
    }
    return mockApi.get(url);
  }

  async post(url, data) {
    try {
      if (!this.useMock) {
        return await realApi.post(url, data);
      }
    } catch (error) {
      this.useMock = true;
      console.log('Falling back to mock data');
    }
    return mockApi.post(url, data);
  }

  isMockMode() {
    return this.useMock;
  }
}

export const api = new ApiProxy();

export const DEVICE_MAPPING = {
  'device1': '',
  'device2': ''
}; 