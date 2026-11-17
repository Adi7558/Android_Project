import { IDeviceRepository } from '../../domain/repositories/IDeviceRepository';
import { Device } from '../../domain/entities/Device';
import { INITIAL_MOCK_DEVICES } from '../mock/devices.mock';
import { delay } from '../mock/delay';

export class MockDeviceRepository implements IDeviceRepository {
  private devices: Device[] = [...INITIAL_MOCK_DEVICES];

  async getDevices(): Promise<Device[]> {
    await delay(250);
    return [...this.devices];
  }

  async revokeDevice(deviceId: string): Promise<void> {
    await delay(300);
    this.devices = this.devices.filter((d) => d.id !== deviceId);
    // TODO [Phase 2]: Invalidate device session in .NET backend (DELETE /api/v1/devices/{id})
    // TODO [Phase 2]: Broadcast key revocation message to identity chain
  }

  async getCurrentDevice(): Promise<Device> {
    const current = this.devices.find((d) => d.isCurrentDevice);
    if (!current) {
      return this.devices[0];
    }
    return current;
  }
}
