import { Contact } from '../../domain/entities/Contact';
import { MOCK_USERS } from './users.mock';

export const INITIAL_MOCK_CONTACTS: Contact[] = [
  {
    id: 'cnt_001',
    user: MOCK_USERS[5], // David Kim
    isFavorite: false,
    addedAt: '2025-04-05T19:00:00Z',
  },
  {
    id: 'cnt_002',
    user: MOCK_USERS[4], // Dr. Sarah Chen
    isFavorite: true,
    addedAt: '2025-03-20T10:10:00Z',
  },
  {
    id: 'cnt_003',
    user: MOCK_USERS[2], // Elena Rostova
    isFavorite: true,
    addedAt: '2025-03-01T08:15:00Z',
  },
  {
    id: 'cnt_004',
    user: MOCK_USERS[3], // Marcus Vance
    isFavorite: false,
    addedAt: '2025-03-12T16:50:00Z',
  },
  {
    id: 'cnt_005',
    user: MOCK_USERS[1], // Priya Patil
    isFavorite: true,
    addedAt: '2025-02-18T14:40:00Z',
  },
  {
    id: 'cnt_006',
    user: MOCK_USERS[0], // Rahul Sharma
    isFavorite: true,
    addedAt: '2025-02-10T11:20:00Z',
  },
];
