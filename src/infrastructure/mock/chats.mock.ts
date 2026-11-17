import { Conversation } from '../../domain/entities/Conversation';
import { MOCK_USERS } from './users.mock';
import { INITIAL_MOCK_MESSAGES } from './messages.mock';

export const INITIAL_MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv_001',
    participant: MOCK_USERS[0], // Rahul Sharma
    lastMessage: INITIAL_MOCK_MESSAGES.conv_001[INITIAL_MOCK_MESSAGES.conv_001.length - 1],
    unreadCount: 2,
    isPinned: true,
    isEncrypted: true,
    securityVerificationStatus: 'verified',
    updatedAt: '10:32 AM',
  },
  {
    id: 'conv_002',
    participant: MOCK_USERS[1], // Priya Patil
    lastMessage: INITIAL_MOCK_MESSAGES.conv_002[INITIAL_MOCK_MESSAGES.conv_002.length - 1],
    unreadCount: 0,
    isPinned: false,
    isEncrypted: true,
    securityVerificationStatus: 'verified',
    updatedAt: 'Yesterday',
  },
  {
    id: 'conv_003',
    participant: MOCK_USERS[2], // Elena Rostova
    lastMessage: INITIAL_MOCK_MESSAGES.conv_003[INITIAL_MOCK_MESSAGES.conv_003.length - 1],
    unreadCount: 0,
    isPinned: false,
    isEncrypted: true,
    securityVerificationStatus: 'verified',
    updatedAt: 'Yesterday',
  },
  {
    id: 'conv_004',
    participant: MOCK_USERS[3], // Marcus Vance
    lastMessage: INITIAL_MOCK_MESSAGES.conv_004[INITIAL_MOCK_MESSAGES.conv_004.length - 1],
    unreadCount: 1,
    isPinned: false,
    isEncrypted: true,
    securityVerificationStatus: 'key_changed', // Triggers warning badge
    updatedAt: 'Sunday',
  },
  {
    id: 'conv_005',
    participant: MOCK_USERS[4], // Dr. Sarah Chen
    lastMessage: INITIAL_MOCK_MESSAGES.conv_005[INITIAL_MOCK_MESSAGES.conv_005.length - 1],
    unreadCount: 0,
    isPinned: false,
    isEncrypted: true,
    securityVerificationStatus: 'verified',
    updatedAt: 'Oct 14',
  },
];
