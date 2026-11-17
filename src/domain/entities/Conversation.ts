import { User } from './User';
import { Message } from './Message';

export type ConversationSecurityVerificationStatus = 'verified' | 'unverified' | 'key_changed';

export interface Conversation {
  id: string;
  participant: User;
  lastMessage?: Message;
  unreadCount: number;
  isPinned?: boolean;
  isEncrypted: boolean;
  securityVerificationStatus: ConversationSecurityVerificationStatus;
  updatedAt: string;
  isTyping?: boolean;
}
