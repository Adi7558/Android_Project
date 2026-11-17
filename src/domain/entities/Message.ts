export type MessageStatus = 'sending' | 'sent' | 'delivered' | 'read' | 'failed';
export type MessageType = 'text' | 'image' | 'file' | 'system';
export type MessageSecurityStatus = 'encrypted' | 'verified' | 'unencrypted';
export type SystemMessageType =
  | 'e2e_notice'
  | 'key_change'
  | 'contact_verified'
  | 'new_device';

export interface MessageReply {
  id: string;
  senderName: string;
  content: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  recipientId?: string;
  content: string;
  timestamp: string;
  status: MessageStatus;
  type: MessageType;
  securityStatus: MessageSecurityStatus;
  replyTo?: MessageReply;
  systemMessageType?: SystemMessageType;
  isDeleted?: boolean;
}
