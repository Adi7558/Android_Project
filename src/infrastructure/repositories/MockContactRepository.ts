import { IContactRepository } from '../../domain/repositories/IContactRepository';
import { Contact } from '../../domain/entities/Contact';
import { INITIAL_MOCK_CONTACTS } from '../mock/contacts.mock';
import { MOCK_USERS } from '../mock/users.mock';
import { NotFoundFailure } from '../../domain/failures/Failures';
import { delay } from '../mock/delay';

export class MockContactRepository implements IContactRepository {
  private contacts: Contact[] = [...INITIAL_MOCK_CONTACTS];

  async getContacts(): Promise<Contact[]> {
    await delay(250);
    // Sort alphabetically by contact user's full name
    return [...this.contacts].sort((a, b) =>
      a.user.fullName.localeCompare(b.user.fullName)
    );
  }

  async searchContacts(query: string): Promise<Contact[]> {
    await delay(150);
    const lower = query.toLowerCase().trim();
    if (!lower) return this.getContacts();

    return this.contacts.filter(
      (c) =>
        c.user.fullName.toLowerCase().includes(lower) ||
        c.user.username.toLowerCase().includes(lower) ||
        c.user.email.toLowerCase().includes(lower)
    );
  }

  async addContact(usernameOrEmail: string): Promise<Contact> {
    await delay(400);
    const target = usernameOrEmail.toLowerCase().trim();

    const matchedUser = MOCK_USERS.find(
      (u) => u.username.toLowerCase() === target || u.email.toLowerCase() === target
    );

    if (!matchedUser) {
      throw new NotFoundFailure(`No user found matching "${usernameOrEmail}".`);
    }

    const existing = this.contacts.find((c) => c.user.id === matchedUser.id);
    if (existing) {
      return existing;
    }

    const newContact: Contact = {
      id: `cnt_${Date.now()}`,
      user: matchedUser,
      isFavorite: false,
      addedAt: new Date().toISOString(),
    };

    this.contacts.push(newContact);
    // TODO [Phase 2]: Request contact's public key bundle from .NET API (POST /api/v1/contacts)
    return newContact;
  }

  async blockContact(contactId: string): Promise<void> {
    const contact = this.contacts.find((c) => c.id === contactId);
    if (contact) {
      contact.isBlocked = true;
    }
    // TODO [Phase 2]: Notify backend of block list update (POST /api/v1/contacts/block)
  }

  async unblockContact(contactId: string): Promise<void> {
    const contact = this.contacts.find((c) => c.id === contactId);
    if (contact) {
      contact.isBlocked = false;
    }
    // TODO [Phase 2]: Notify backend of unblock list update
  }
}
