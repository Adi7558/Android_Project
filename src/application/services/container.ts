import { IAuthRepository } from '../../domain/repositories/IAuthRepository';
import { IChatRepository } from '../../domain/repositories/IChatRepository';
import { IContactRepository } from '../../domain/repositories/IContactRepository';
import { IDeviceRepository } from '../../domain/repositories/IDeviceRepository';
import { ISecurityRepository } from '../../domain/repositories/ISecurityRepository';
import { IUserRepository } from '../../domain/repositories/IUserRepository';

import { MockAuthRepository } from '../../infrastructure/repositories/MockAuthRepository';
import { MockChatRepository } from '../../infrastructure/repositories/MockChatRepository';
import { MockContactRepository } from '../../infrastructure/repositories/MockContactRepository';
import { MockDeviceRepository } from '../../infrastructure/repositories/MockDeviceRepository';
import { MockSecurityRepository } from '../../infrastructure/repositories/MockSecurityRepository';
import { MockUserRepository } from '../../infrastructure/repositories/MockUserRepository';

/**
 * ServiceContainer provides singleton instances of repositories to use cases.
 * In Phase 2, swap Mock* repositories with Api* repositories without touching use cases or UI.
 */
class ServiceContainer {
  private static instance: ServiceContainer;

  public readonly authRepository: IAuthRepository;
  public readonly chatRepository: IChatRepository;
  public readonly contactRepository: IContactRepository;
  public readonly deviceRepository: IDeviceRepository;
  public readonly securityRepository: ISecurityRepository;
  public readonly userRepository: IUserRepository;

  private constructor() {
    this.authRepository = new MockAuthRepository();
    this.chatRepository = new MockChatRepository();
    this.contactRepository = new MockContactRepository();
    this.deviceRepository = new MockDeviceRepository();
    this.securityRepository = new MockSecurityRepository();
    this.userRepository = new MockUserRepository();
  }

  public static getInstance(): ServiceContainer {
    if (!ServiceContainer.instance) {
      ServiceContainer.instance = new ServiceContainer();
    }
    return ServiceContainer.instance;
  }
}

export const container = ServiceContainer.getInstance();
