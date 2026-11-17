import { Device } from '../entities/Device';

export interface IDeviceRepository {
  getDevices(): Promise<Device[]>;
  revokeDevice(deviceId: string): Promise<void>;
  getCurrentDevice(): Promise<Device>;
}
