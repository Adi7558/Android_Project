import {
  IChatRepository,
  SendMessagePayload,
} from '../../domain/repositories/IChatRepository';
import { Conversation } from '../../domain/entities/Conversation';
import { Message } from '../../domain/entities/Message';
import { INITIAL_MOCK_CONVERSATIONS } from '../mock/chats.mock';
import { INITIAL_MOCK_MESSAGES } from '../mock/messages.mock';
import { MOCK_USERS, CURRENT_MOCK_USER } from '../mock/users.mock';
import { delay } from '../mock/delay';

export class MockChatRepository implements IChatRepository {
  private conversations: Conversation[] = [...INITIAL_MOCK_CONVERSATIONS];
  private messages: Record<string, Message[]> = { ...INITIAL_MOCK_MESSAGES };

  async getConversations(): Promise<Conversation[]> {
    await delay(350);
    // Sort pinned first, then by latest
    return [...this.conversations].sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return 0;
    });
  }

  async getConversationById(id: string): Promise<Conversation | null> {
    await delay(150);
    return this.conversations.find((c) => c.id === id) || null;
  }

  async getMessages(conversationId: string): Promise<Message[]> {
    await delay(300);
    const list = this.messages[conversationId] || [];
    return [...list];
  }

  async sendMessage(payload: SendMessagePayload): Promise<Message> {
    await delay(250);

    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newMessage: Message = {
      id: `msg_${Date.now()}`,
      conversationId: payload.conversationId,
      senderId: CURRENT_MOCK_USER.id,
      recipientId: payload.recipientId,
      content: payload.content,
      timestamp: timeString,
      status: 'sent', // Will transition to delivered in UI
      type: 'text',
      securityStatus: 'verified',
      replyTo: payload.replyTo,
    };

    if (!this.messages[payload.conversationId]) {
      this.messages[payload.conversationId] = [];
    }
    this.messages[payload.conversationId].push(newMessage);

    // Update conversation last message and timestamp
    const convIndex = this.conversations.findIndex((c) => c.id === payload.conversationId);
    if (convIndex >= 0) {
      this.conversations[convIndex] = {
        ...this.conversations[convIndex],
        lastMessage: newMessage,
        updatedAt: timeString,
      };
    }

    // TODO [Phase 2]: Encrypt message content with recipient's ratchet session key (AES-256-GCM)
    // TODO [Phase 2]: Broadcast ciphertext envelope via SignalR /api/hub/chat
    return newMessage;
  }

  async deleteMessage(messageId: string, conversationId: string): Promise<void> {
    await delay(200);
    if (this.messages[conversationId]) {
      this.messages[conversationId] = this.messages[conversationId].filter(
        (m) => m.id !== messageId
      );
    }
    // TODO [Phase 2]: Send tombstone / message delete notification to SignalR hub
  }

  async markAsRead(conversationId: string): Promise<void> {
    const conv = this.conversations.find((c) => c.id === conversationId);
    if (conv) {
      conv.unreadCount = 0;
    }
    // TODO [Phase 2]: Emit read receipt packet to remote participant via SignalR
  }

  async searchConversations(query: string): Promise<Conversation[]> {
    await delay(200);
    const lower = query.toLowerCase().trim();
    if (!lower) return this.conversations;

    return this.conversations.filter(
      (c) =>
        c.participant.fullName.toLowerCase().includes(lower) ||
        c.participant.username.toLowerCase().includes(lower) ||
        (c.lastMessage && c.lastMessage.content.toLowerCase().includes(lower))
    );
  }

  async searchMessages(query: string): Promise<Message[]> {
    await delay(200);
    const lower = query.toLowerCase().trim();
    if (!lower) return [];

    const matched: Message[] = [];
    Object.values(this.messages).forEach((msgList) => {
      msgList.forEach((msg) => {
        if (msg.content.toLowerCase().includes(lower) && msg.type !== 'system') {
          matched.push(msg);
        }
      });
    });
    return matched;
  }

  async createConversation(recipientUserId: string): Promise<Conversation> {
    await delay(300);

    // Check if exists
    const existing = this.conversations.find((c) => c.participant.id === recipientUserId);
    if (existing) {
      return existing;
    }

    const user = MOCK_USERS.find((u) => u.id === recipientUserId);
    if (!user) {
      throw new Error('User not found.');
    }

    const newConv: Conversation = {
      id: `conv_${Date.now()}`,
      participant: user,
      unreadCount: 0,
      isPinned: false,
      isEncrypted: true,
      securityVerificationStatus: user.securityStatus === 'verified' ? 'verified' : 'unverified',
      updatedAt: 'Just now',
    };

    this.conversations.unshift(newConv);
    this.messages[newConv.id] = [
      {
        id: `msg_init_${Date.now()}`,
        conversationId: newConv.id,
        senderId: 'system',
        content: `Conversation initiated with ${user.fullName}. End-to-end encryption active.`,
        timestamp: 'Just now',
        status: 'read',
        type: 'system',
        securityStatus: 'verified',
        systemMessageType: 'e2e_notice',
      },
    ];

    // TODO [Phase 2]: Initiate X3DH key agreement with recipient prekey bundle from backend
    return newConv;
  }
}
