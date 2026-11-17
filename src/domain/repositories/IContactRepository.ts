import { Contact } from '../entities/Contact';

export interface IContactRepository {
  getContacts(): Promise<Contact[]>;
  searchContacts(query: string): Promise<Contact[]>;
  addContact(usernameOrEmail: string): Promise<Contact>;
  blockContact(contactId: string): Promise<void>;
  unblockContact(contactId: string): Promise<void>;
}
