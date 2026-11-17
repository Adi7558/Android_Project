import { IDeviceRepository } from '../../../domain/repositories/IDeviceRepository';
import { Device } from '../../../domain/entities/Device';
import { container } from '../../services/container';

export class GetDevicesUseCase {
  constructor(private readonly deviceRepository: IDeviceRepository = container.deviceRepository) {}

  async execute(): Promise<Device[]> {
    return this.deviceRepository.getDevices();
  }
}

export class RevokeDeviceUseCase {
  constructor(private readonly deviceRepository: IDeviceRepository = container.deviceRepository) {}

  async execute(deviceId: string): Promise<void> {
    return this.deviceRepository.revokeDevice(deviceId);
  }
}
