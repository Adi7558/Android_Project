import { Conversation } from '../entities/Conversation';
import { Message, MessageReply } from '../entities/Message';

export interface SendMessagePayload {
  conversationId: string;
  recipientId: string;
  content: string;
  replyTo?: MessageReply;
}

export interface IChatRepository {
  getConversations(): Promise<Conversation[]>;
  getConversationById(id: string): Promise<Conversation | null>;
  getMessages(conversationId: string): Promise<Message[]>;
  sendMessage(payload: SendMessagePayload): Promise<Message>;
  deleteMessage(messageId: string, conversationId: string): Promise<void>;
  markAsRead(conversationId: string): Promise<void>;
  searchConversations(query: string): Promise<Conversation[]>;
  searchMessages(query: string): Promise<Message[]>;
  createConversation(recipientUserId: string): Promise<Conversation>;
}
