import { IContactRepository } from '../../../domain/repositories/IContactRepository';
import { Contact } from '../../../domain/entities/Contact';
import { container } from '../../services/container';

export class GetContactsUseCase {
  constructor(private readonly contactRepository: IContactRepository = container.contactRepository) {}

  async execute(): Promise<Contact[]> {
    return this.contactRepository.getContacts();
  }
}

export class SearchContactsUseCase {
  constructor(private readonly contactRepository: IContactRepository = container.contactRepository) {}

  async execute(query: string): Promise<Contact[]> {
    return this.contactRepository.searchContacts(query);
  }
}

export class AddContactUseCase {
  constructor(private readonly contactRepository: IContactRepository = container.contactRepository) {}

  async execute(usernameOrEmail: string): Promise<Contact> {
    return this.contactRepository.addContact(usernameOrEmail);
  }
}
