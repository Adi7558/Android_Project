import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Conversation } from '../../../domain/entities/Conversation';
import { Message } from '../../../domain/entities/Message';
import { INITIAL_MOCK_CONVERSATIONS } from '../../../infrastructure/mock/chats.mock';
import { INITIAL_MOCK_MESSAGES } from '../../../infrastructure/mock/messages.mock';

interface ChatState {
  conversations: Conversation[];
  messages: Record<string, Message[]>;
  activeConversationId: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: ChatState = {
  conversations: INITIAL_MOCK_CONVERSATIONS,
  messages: INITIAL_MOCK_MESSAGES,
  activeConversationId: null,
  isLoading: false,
  error: null,
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setConversations: (state, action: PayloadAction<Conversation[]>) => {
      state.conversations = action.payload;
    },
    setActiveConversationId: (state, action: PayloadAction<string | null>) => {
      state.activeConversationId = action.payload;
    },
    setMessagesForConversation: (
      state,
      action: PayloadAction<{ conversationId: string; messages: Message[] }>
    ) => {
      state.messages[action.payload.conversationId] = action.payload.messages;
    },
    addMessage: (state, action: PayloadAction<Message>) => {
      const msg = action.payload;
      if (!state.messages[msg.conversationId]) {
        state.messages[msg.conversationId] = [];
      }
      state.messages[msg.conversationId].push(msg);

      // Update conversation in list
      const conv = state.conversations.find((c) => c.id === msg.conversationId);
      if (conv) {
        conv.lastMessage = msg;
        conv.updatedAt = msg.timestamp;
      }
    },
    deleteMessage: (
      state,
      action: PayloadAction<{ conversationId: string; messageId: string }>
    ) => {
      const { conversationId, messageId } = action.payload;
      if (state.messages[conversationId]) {
        state.messages[conversationId] = state.messages[conversationId].filter(
          (m) => m.id !== messageId
        );
        // Update last message if needed
        const remaining = state.messages[conversationId];
        const conv = state.conversations.find((c) => c.id === conversationId);
        if (conv && remaining.length > 0) {
          conv.lastMessage = remaining[remaining.length - 1];
        }
      }
    },
    markConversationAsRead: (state, action: PayloadAction<string>) => {
      const conv = state.conversations.find((c) => c.id === action.payload);
      if (conv) {
        conv.unreadCount = 0;
      }
    },
    setConversationVerified: (
      state,
      action: PayloadAction<{ userId: string; verified: boolean }>
    ) => {
      state.conversations.forEach((conv) => {
        if (conv.participant.id === action.payload.userId) {
          conv.securityVerificationStatus = action.payload.verified
            ? 'verified'
            : 'unverified';
          conv.participant.securityStatus = action.payload.verified
            ? 'verified'
            : 'unverified';
        }
      });
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setLoading,
  setConversations,
  setActiveConversationId,
  setMessagesForConversation,
  addMessage,
  deleteMessage,
  markConversationAsRead,
  setConversationVerified,
  setError,
} = chatSlice.actions;

export default chatSlice.reducer;
