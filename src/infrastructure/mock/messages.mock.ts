import { Message } from '../../domain/entities/Message';

export const INITIAL_MOCK_MESSAGES: Record<string, Message[]> = {
  // Conversation with Rahul Sharma (conv_001)
  conv_001: [
    {
      id: 'msg_100',
      conversationId: 'conv_001',
      senderId: 'system',
      content: 'Messages and calls are end-to-end encrypted. No one outside of this chat can read or listen to them.',
      timestamp: 'Today at 09:30 AM',
      status: 'read',
      type: 'system',
      securityStatus: 'verified',
      systemMessageType: 'e2e_notice',
    },
    {
      id: 'msg_101',
      conversationId: 'conv_001',
      senderId: 'usr_002', // Rahul
      content: 'Hey Alex, did you review the X25519 key exchange parameters?',
      timestamp: '10:38 AM',
      status: 'read',
      type: 'text',
      securityStatus: 'verified',
    },
    {
      id: 'msg_102',
      conversationId: 'conv_001',
      senderId: 'usr_me_001', // Alex (me)
      content: 'Yes! The ephemeral Diffie-Hellman ratchet looks solid. We should confirm the safety number verification flow next.',
      timestamp: '10:40 AM',
      status: 'read',
      type: 'text',
      securityStatus: 'verified',
    },
    {
      id: 'msg_103',
      conversationId: 'conv_001',
      senderId: 'usr_002',
      content: 'Sounds great. Let us run a verification check this afternoon.',
      timestamp: '10:41 AM',
      status: 'read',
      type: 'text',
      securityStatus: 'verified',
    },
    {
      id: 'msg_104',
      conversationId: 'conv_001',
      senderId: 'usr_002',
      content: 'See you tomorrow at the office.',
      timestamp: '10:32 AM',
      status: 'delivered',
      type: 'text',
      securityStatus: 'verified',
    },
  ],

  // Conversation with Priya Patil (conv_002)
  conv_002: [
    {
      id: 'msg_200',
      conversationId: 'conv_002',
      senderId: 'system',
      content: 'Messages are end-to-end encrypted using AES-256-GCM. Identity key verified.',
      timestamp: 'Yesterday at 02:00 PM',
      status: 'read',
      type: 'system',
      securityStatus: 'verified',
      systemMessageType: 'contact_verified',
    },
    {
      id: 'msg_201',
      conversationId: 'conv_002',
      senderId: 'usr_me_001',
      content: 'Hi Priya, I uploaded the threat modeling matrix for our zero-knowledge proof module.',
      timestamp: 'Yesterday at 02:15 PM',
      status: 'read',
      type: 'text',
      securityStatus: 'verified',
    },
    {
      id: 'msg_202',
      conversationId: 'conv_002',
      senderId: 'usr_003',
      content: 'Can you share the project files?',
      timestamp: 'Yesterday at 04:30 PM',
      status: 'read',
      type: 'text',
      securityStatus: 'verified',
    },
  ],

  // Conversation with Elena Rostova (conv_003)
  conv_003: [
    {
      id: 'msg_300',
      conversationId: 'conv_003',
      senderId: 'system',
      content: 'Identity keys verified on both devices. Session established.',
      timestamp: 'Monday at 11:00 AM',
      status: 'read',
      type: 'system',
      securityStatus: 'verified',
      systemMessageType: 'contact_verified',
    },
    {
      id: 'msg_301',
      conversationId: 'conv_003',
      senderId: 'usr_004',
      content: 'The Double Ratchet algorithm implementation is passing all formal test vectors.',
      timestamp: 'Monday at 11:15 AM',
      status: 'read',
      type: 'text',
      securityStatus: 'verified',
    },
    {
      id: 'msg_302',
      conversationId: 'conv_003',
      senderId: 'usr_004',
      content: 'Looking forward to the meeting!',
      timestamp: 'Yesterday at 11:18 AM',
      status: 'read',
      type: 'text',
      securityStatus: 'verified',
    },
  ],

  // Conversation with Marcus Vance (conv_004) - Warning state
  conv_004: [
    {
      id: 'msg_400',
      conversationId: 'conv_004',
      senderId: 'system',
      content: 'Safety number changed. Marcus Vance may have reinstalled the app or changed devices. Tap to verify.',
      timestamp: 'Sunday at 06:12 PM',
      status: 'read',
      type: 'system',
      securityStatus: 'unencrypted',
      systemMessageType: 'key_change',
    },
    {
      id: 'msg_401',
      conversationId: 'conv_004',
      senderId: 'usr_005',
      content: 'That sounds great. Let\'s get started.',
      timestamp: 'Sunday at 06:14 PM',
      status: 'read',
      type: 'text',
      securityStatus: 'unencrypted',
    },
  ],

  // Conversation with Dr. Sarah Chen (conv_005)
  conv_005: [
    {
      id: 'msg_500',
      conversationId: 'conv_005',
      senderId: 'system',
      content: 'Messages are end-to-end encrypted with post-quantum hybrid lattice cryptography simulation.',
      timestamp: 'Oct 14 at 10:00 AM',
      status: 'read',
      type: 'system',
      securityStatus: 'verified',
      systemMessageType: 'e2e_notice',
    },
    {
      id: 'msg_501',
      conversationId: 'conv_005',
      senderId: 'usr_006',
      content: 'The thesis draft looks exceptionally thorough, Alex. The security section is top notch.',
      timestamp: 'Oct 14 at 10:05 AM',
      status: 'read',
      type: 'text',
      securityStatus: 'verified',
    },
  ],
};
