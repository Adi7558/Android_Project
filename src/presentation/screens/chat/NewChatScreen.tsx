import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { useTheme } from '../../theme/ThemeContext';
import { AppHeader } from '../../components/common/AppHeader';
import { SearchBar } from '../../components/common/SearchBar';
import { Avatar } from '../../components/common/Avatar';
import { AppText } from '../../components/common/AppText';
import { Badge } from '../../components/common/Badge';
import { EmptyState } from '../../components/common/EmptyState';
import { ShieldCheck, ShieldAlert, User, Users } from '../../theme/icons';
import { useContacts } from '../../hooks/useContacts';
import { useChat } from '../../hooks/useChat';
import { Contact } from '../../../domain/entities/Contact';

type Props = NativeStackScreenProps<RootStackParamList, 'NewChat'>;

export const NewChatScreen: React.FC<Props> = ({ navigation }) => {
  const { theme } = useTheme();
  const { contacts, fetchContacts, searchContacts } = useContacts();
  const { createOrOpenConversation } = useChat();

  const [query, setQuery] = useState('');
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  useEffect(() => {
    const filter = async () => {
      if (!query.trim()) {
        setFilteredContacts(contacts);
      } else {
        const results = await searchContacts(query);
        setFilteredContacts(results);
      }
    };
    filter();
  }, [contacts, query, searchContacts]);

  const handleSelectContact = async (contact: Contact) => {
    const conv = await createOrOpenConversation(contact.user.id);
    navigation.replace('ChatConversation', {
      conversationId: conv.id,
      participantName: contact.user.fullName,
      participantAvatar: contact.user.avatarUrl,
      participantUserId: contact.user.id,
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <AppHeader
        title="New Conversation"
        subtitle="Select contact for end-to-end encrypted session"
        showBack={true}
        onBackPress={() => navigation.goBack()}
      />

      <View style={styles.searchWrapper}>
        <SearchBar
          value={query}
          onChangeText={setQuery}
          placeholder="Search contacts by name or @username..."
        />
      </View>

      <FlatList
        data={filteredContacts}
        keyExtractor={(item) => item.id}
        contentContainerStyle={filteredContacts.length === 0 ? styles.emptyWrap : undefined}
        renderItem={({ item }) => {
          const isVerified = item.user.securityStatus === 'verified';
          const isWarning = item.user.securityStatus === 'warning';

          return (
            <TouchableOpacity
              style={[
                styles.contactItem,
                {
                  backgroundColor: theme.colors.surface,
                  borderBottomColor: theme.colors.border,
                },
              ]}
              activeOpacity={0.7}
              onPress={() => handleSelectContact(item)}
            >
              <Avatar
                name={item.user.fullName}
                imageUrl={item.user.avatarUrl}
                isOnline={item.user.isOnline}
                showOnlineIndicator={true}
                securityRing={isVerified ? 'verified' : isWarning ? 'warning' : 'none'}
                size="md"
              />

              <View style={styles.contactDetails}>
                <View style={styles.nameRow}>
                  <AppText variant="labelLarge" color="primary" numberOfLines={1}>
                    {item.user.fullName}
                  </AppText>
                  {isVerified ? (
                    <ShieldCheck size={15} color={theme.colors.securityVerified} style={styles.secIcon} />
                  ) : isWarning ? (
                    <ShieldAlert size={15} color={theme.colors.securityWarning} style={styles.secIcon} />
                  ) : null}
                </View>
                <AppText variant="bodySmall" color="secondary" numberOfLines={1}>
                  @{item.user.username} • {item.user.statusMessage || 'Secured'}
                </AppText>
              </View>

              <Badge
                label={isVerified ? 'Verified' : 'Unverified'}
                variant={isVerified ? 'success' : 'muted'}
                size="sm"
              />
            </TouchableOpacity>
          );
        }}
        ListEmptyComponent={
          <EmptyState
            icon={<Users size={32} color={theme.colors.textMuted} />}
            title="No Contacts Found"
            description={
              query
                ? `No contact matches "${query}".`
                : 'No contacts currently registered in your local address book.'
            }
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchWrapper: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  contactDetails: {
    flex: 1,
    marginLeft: 14,
    marginRight: 8,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  secIcon: {
    marginLeft: 6,
  },
  emptyWrap: {
    flexGrow: 1,
    justifyContent: 'center',
  },
});
