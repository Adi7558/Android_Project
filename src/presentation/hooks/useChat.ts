import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../application/state/store';
import {
  setLoading,
  setConversations,
  setActiveConversationId,
  setMessagesForConversation,
  addMessage,
  deleteMessage as deleteMessageAction,
  markConversationAsRead,
  setError,
} from '../../application/state/slices/chatSlice';
import {
  GetConversationsUseCase,
  GetMessagesUseCase,
  SendMessageUseCase,
  DeleteMessageUseCase,
  MarkAsReadUseCase,
  SearchChatsUseCase,
  CreateConversationUseCase,
} from '../../application/usecases/chat/ChatUseCases';
import { SendMessagePayload } from '../../domain/repositories/IChatRepository';

const getConversationsUseCase = new GetConversationsUseCase();
const getMessagesUseCase = new GetMessagesUseCase();
const sendMessageUseCase = new SendMessageUseCase();
const deleteMessageUseCase = new DeleteMessageUseCase();
const markAsReadUseCase = new MarkAsReadUseCase();
const searchChatsUseCase = new SearchChatsUseCase();
const createConversationUseCase = new CreateConversationUseCase();

export const useChat = () => {
  const dispatch = useAppDispatch();
  const { conversations, messages, activeConversationId, isLoading, error } =
    useAppSelector((state) => state.chat);

  const fetchConversations = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      const list = await getConversationsUseCase.execute();
      dispatch(setConversations(list));
    } catch (err: any) {
      dispatch(setError(err.message || 'Failed to load conversations'));
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  const fetchMessages = useCallback(
    async (conversationId: string) => {
      try {
        const msgs = await getMessagesUseCase.execute(conversationId);
        dispatch(setMessagesForConversation({ conversationId, messages: msgs }));
        dispatch(markConversationAsRead(conversationId));
        await markAsReadUseCase.execute(conversationId);
      } catch (err: any) {
        dispatch(setError(err.message || 'Failed to load messages'));
      }
    },
    [dispatch]
  );

  const sendMessage = useCallback(
    async (payload: SendMessagePayload) => {
      try {
        const msg = await sendMessageUseCase.execute(payload);
        dispatch(addMessage(msg));
        return msg;
      } catch (err: any) {
        dispatch(setError(err.message || 'Failed to send message'));
        return null;
      }
    },
    [dispatch]
  );

  const deleteMsg = useCallback(
    async (messageId: string, conversationId: string) => {
      try {
        await deleteMessageUseCase.execute(messageId, conversationId);
        dispatch(deleteMessageAction({ conversationId, messageId }));
      } catch (err: any) {
        dispatch(setError(err.message || 'Failed to delete message'));
      }
    },
    [dispatch]
  );

  const searchChats = useCallback(async (query: string) => {
    return searchChatsUseCase.execute(query);
  }, []);

  const createOrOpenConversation = useCallback(
    async (recipientUserId: string) => {
      try {
        dispatch(setLoading(true));
        const conv = await createConversationUseCase.execute(recipientUserId);
        // Refresh conversations
        const list = await getConversationsUseCase.execute();
        dispatch(setConversations(list));
        return conv;
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch]
  );

  return {
    conversations,
    messages,
    activeConversationId,
    isLoading,
    error,
    fetchConversations,
    fetchMessages,
    sendMessage,
    deleteMessage: deleteMsg,
    searchChats,
    createOrOpenConversation,
    setActiveConversation: (id: string | null) =>
      dispatch(setActiveConversationId(id)),
  };
};
