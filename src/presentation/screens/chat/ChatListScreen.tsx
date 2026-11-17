import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainTabParamList, RootStackParamList } from '../../navigation/types';
import { useTheme } from '../../theme/ThemeContext';
import { AppHeader } from '../../components/common/AppHeader';
import { ChatListItem } from '../../components/chat/ChatListItem';
import { EmptyState } from '../../components/common/EmptyState';
import { LoadingState } from '../../components/common/LoadingState';
import { ErrorState } from '../../components/common/ErrorState';
import { Search, Plus, MessageSquare } from '../../theme/icons';
import { useChat } from '../../hooks/useChat';
import { Conversation } from '../../../domain/entities/Conversation';

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'ChatsTab'>,
  NativeStackScreenProps<RootStackParamList>
>;

export const ChatListScreen: React.FC<Props> = ({ navigation }) => {
  const { theme } = useTheme();
  const { conversations, fetchConversations, isLoading, error } = useChat();

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  const renderHeaderRight = () => (
    <View style={styles.headerRight}>
      <TouchableOpacity
        style={[styles.headerIconBtn, { backgroundColor: theme.colors.surfaceSecondary }]}
        onPress={() => navigation.navigate('Search')}
        accessible
        accessibilityRole="button"
        accessibilityLabel="Search chats"
      >
        <Search size={19} color={theme.colors.textPrimary} />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.headerIconBtn, { backgroundColor: theme.colors.primary }]}
        onPress={() => navigation.navigate('NewChat')}
        accessible
        accessibilityRole="button"
        accessibilityLabel="New chat"
      >
        <Plus size={20} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <AppHeader
        title="Encrypted Chats"
        subtitle={`${conversations.length} active encrypted threads`}
        rightAction={renderHeaderRight()}
      />

      {isLoading && conversations.length === 0 ? (
        <LoadingState message="Decrypting session indices..." />
      ) : error && conversations.length === 0 ? (
        <ErrorState message={error} onRetry={fetchConversations} />
      ) : (
        <FlatList
          data={conversations}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <ChatListItem
              conversation={item}
              highlightActive={index === 0}
              onPress={() =>
                navigation.navigate('ChatConversation', {
                  conversationId: item.id,
                  participantName: item.participant.fullName,
                  participantAvatar: item.participant.avatarUrl,
                  participantUserId: item.participant.id,
                })
              }
            />
          )}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={fetchConversations}
              tintColor={theme.colors.primary}
            />
          }
          ListEmptyComponent={
            <EmptyState
              icon={<MessageSquare size={32} color={theme.colors.textMuted} />}
              title="You don't have any conversations yet."
              description="Start a private, end-to-end encrypted dialogue with your contacts."
              actionTitle="New Conversation"
              onActionPress={() => navigation.navigate('NewChat')}
            />
          }
          contentContainerStyle={conversations.length === 0 ? styles.emptyContainer : styles.listContent}
        />
      )}

      {/* Floating Action Button */}
      <TouchableOpacity
        style={[
          styles.fab,
          {
            backgroundColor: theme.colors.primary,
            ...theme.shadows.large,
          },
        ]}
        onPress={() => navigation.navigate('NewChat')}
        accessible
        accessibilityRole="button"
        accessibilityLabel="Start new conversation"
      >
        <Plus size={26} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerIconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 85,
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
