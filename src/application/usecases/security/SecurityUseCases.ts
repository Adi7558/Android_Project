import {
  ISecurityRepository,
  SecurityOverview,
} from '../../../domain/repositories/ISecurityRepository';
import { SecurityIdentity } from '../../../domain/entities/SecurityIdentity';
import { SecurityActivity } from '../../../domain/entities/SecurityActivity';
import { container } from '../../services/container';

export class GetSecurityOverviewUseCase {
  constructor(private readonly securityRepository: ISecurityRepository = container.securityRepository) {}

  async execute(): Promise<SecurityOverview> {
    return this.securityRepository.getSecurityOverview();
  }
}

export class GetSecurityIdentityUseCase {
  constructor(private readonly securityRepository: ISecurityRepository = container.securityRepository) {}

  async execute(userId: string): Promise<SecurityIdentity> {
    return this.securityRepository.getSecurityIdentityForUser(userId);
  }
}

export class VerifyContactIdentityUseCase {
  constructor(private readonly securityRepository: ISecurityRepository = container.securityRepository) {}

  async execute(userId: string): Promise<void> {
    return this.securityRepository.verifyContactIdentity(userId);
  }
}

export class GetSecurityActivitiesUseCase {
  constructor(private readonly securityRepository: ISecurityRepository = container.securityRepository) {}

  async execute(): Promise<SecurityActivity[]> {
    return this.securityRepository.getSecurityActivities();
  }
}

export class RotateIdentityKeysUseCase {
  constructor(private readonly securityRepository: ISecurityRepository = container.securityRepository) {}

  async execute(): Promise<SecurityIdentity> {
    return this.securityRepository.regenerateIdentityKeys();
  }
}
