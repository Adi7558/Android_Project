import {
  IChatRepository,
  SendMessagePayload,
} from '../../../domain/repositories/IChatRepository';
import { Conversation } from '../../../domain/entities/Conversation';
import { Message } from '../../../domain/entities/Message';
import { container } from '../../services/container';

export class GetConversationsUseCase {
  constructor(private readonly chatRepository: IChatRepository = container.chatRepository) {}

  async execute(): Promise<Conversation[]> {
    return this.chatRepository.getConversations();
  }
}

export class GetMessagesUseCase {
  constructor(private readonly chatRepository: IChatRepository = container.chatRepository) {}

  async execute(conversationId: string): Promise<Message[]> {
    return this.chatRepository.getMessages(conversationId);
  }
}

export class SendMessageUseCase {
  constructor(private readonly chatRepository: IChatRepository = container.chatRepository) {}

  async execute(payload: SendMessagePayload): Promise<Message> {
    return this.chatRepository.sendMessage(payload);
  }
}

export class DeleteMessageUseCase {
  constructor(private readonly chatRepository: IChatRepository = container.chatRepository) {}

  async execute(messageId: string, conversationId: string): Promise<void> {
    return this.chatRepository.deleteMessage(messageId, conversationId);
  }
}

export class MarkAsReadUseCase {
  constructor(private readonly chatRepository: IChatRepository = container.chatRepository) {}

  async execute(conversationId: string): Promise<void> {
    return this.chatRepository.markAsRead(conversationId);
  }
}

export class SearchChatsUseCase {
  constructor(private readonly chatRepository: IChatRepository = container.chatRepository) {}

  async execute(query: string): Promise<Conversation[]> {
    return this.chatRepository.searchConversations(query);
  }
}

export class SearchMessagesUseCase {
  constructor(private readonly chatRepository: IChatRepository = container.chatRepository) {}

  async execute(query: string): Promise<Message[]> {
    return this.chatRepository.searchMessages(query);
  }
}

export class CreateConversationUseCase {
  constructor(private readonly chatRepository: IChatRepository = container.chatRepository) {}

  async execute(recipientUserId: string): Promise<Conversation> {
    return this.chatRepository.createConversation(recipientUserId);
  }
}
