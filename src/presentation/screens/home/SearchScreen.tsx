import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { useTheme } from '../../theme/ThemeContext';
import { AppHeader } from '../../components/common/AppHeader';
import { SearchBar } from '../../components/common/SearchBar';
import { AppText } from '../../components/common/AppText';
import { Avatar } from '../../components/common/Avatar';
import { EmptyState } from '../../components/common/EmptyState';
import { Badge } from '../../components/common/Badge';
import { Search, MessageSquare, User, Lock, Clock } from '../../theme/icons';
import { useChat } from '../../hooks/useChat';
import { useContacts } from '../../hooks/useContacts';
import { Conversation } from '../../../domain/entities/Conversation';
import { Contact } from '../../../domain/entities/Contact';
import { Message } from '../../../domain/entities/Message';

type Props = NativeStackScreenProps<RootStackParamList, 'Search'>;

type SearchFilter = 'All' | 'Chats' | 'Contacts' | 'Messages';

export const SearchScreen: React.FC<Props> = ({ navigation }) => {
  const { theme } = useTheme();
  const { conversations, searchChats, createOrOpenConversation } = useChat();
  const { contacts, searchContacts } = useContacts();

  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<SearchFilter>('All');
  const [filteredChats, setFilteredChats] = useState<Conversation[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
  const [recentSearches] = useState(['Rahul Sharma', 'Diffie-Hellman', 'Priya Patil', 'ratchet']);

  useEffect(() => {
    const runSearch = async () => {
      if (!query.trim()) {
        setFilteredChats([]);
        setFilteredContacts([]);
        return;
      }
      const chats = await searchChats(query);
      const conts = await searchContacts(query);
      setFilteredChats(chats);
      setFilteredContacts(conts);
    };
    runSearch();
  }, [query, searchChats, searchContacts]);

  const hasResults = filteredChats.length > 0 || filteredContacts.length > 0;

  const handleOpenContact = async (contact: Contact) => {
    const conv = await createOrOpenConversation(contact.user.id);
    navigation.navigate('ChatConversation', {
      conversationId: conv.id,
      participantName: contact.user.fullName,
      participantAvatar: contact.user.avatarUrl,
      participantUserId: contact.user.id,
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <AppHeader
        title="Search Vault"
        showBack={true}
        onBackPress={() => navigation.goBack()}
      />

      <View style={styles.searchBarWrapper}>
        <SearchBar
          value={query}
          onChangeText={setQuery}
          placeholder="Search chats, contacts, or encrypted messages..."
        />
      </View>

      {/* Filter Chips */}
      <View style={styles.filtersRow}>
        {(['All', 'Chats', 'Contacts'] as SearchFilter[]).map((f) => (
          <TouchableOpacity
            key={f}
            onPress={() => setFilter(f)}
            style={[
              styles.filterChip,
              {
                backgroundColor:
                  filter === f ? theme.colors.primary : theme.colors.surfaceSecondary,
                borderColor: filter === f ? theme.colors.primary : theme.colors.border,
              },
            ]}
          >
            <AppText
              variant="labelMedium"
              customColor={filter === f ? '#FFFFFF' : theme.colors.textSecondary}
              weight={filter === f ? '700' : '500'}
            >
              {f}
            </AppText>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.resultsContent} keyboardShouldPersistTaps="handled">
        {query.trim().length === 0 ? (
          <View style={styles.recentSection}>
            <AppText variant="labelLarge" color="secondary" weight="700" style={styles.recentTitle}>
              RECENT SEARCHES
            </AppText>
            <View style={styles.recentChipsWrap}>
              {recentSearches.map((item, idx) => (
                <TouchableOpacity
                  key={idx}
                  onPress={() => setQuery(item)}
                  style={[
                    styles.recentChip,
                    {
                      backgroundColor: theme.colors.surface,
                      borderColor: theme.colors.border,
                    },
                  ]}
                >
                  <Clock size={14} color={theme.colors.textMuted} style={styles.chipIcon} />
                  <AppText variant="bodySmall" color="primary">
                    {item}
                  </AppText>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ) : !hasResults ? (
          <EmptyState
            icon={<Search size={28} color={theme.colors.textMuted} />}
            title="No Results Found"
            description={`No matches found for "${query}" across encrypted local indices.`}
          />
        ) : (
          <View>
            {/* Chats match */}
            {(filter === 'All' || filter === 'Chats') && filteredChats.length > 0 && (
              <View style={styles.sectionGroup}>
                <AppText variant="labelLarge" color="secondary" weight="700" style={styles.groupHeader}>
                  CONVERSATIONS ({filteredChats.length})
                </AppText>
                <View
                  style={[
                    styles.cardList,
                    {
                      backgroundColor: theme.colors.surface,
                      borderColor: theme.colors.border,
                    },
                  ]}
                >
                  {filteredChats.map((c) => (
                    <TouchableOpacity
                      key={c.id}
                      style={[styles.resultItem, { borderBottomColor: theme.colors.border }]}
                      onPress={() =>
                        navigation.navigate('ChatConversation', {
                          conversationId: c.id,
                          participantName: c.participant.fullName,
                          participantAvatar: c.participant.avatarUrl,
                          participantUserId: c.participant.id,
                        })
                      }
                    >
                      <Avatar
                        name={c.participant.fullName}
                        imageUrl={c.participant.avatarUrl}
                        size="sm"
                        securityRing={c.securityVerificationStatus === 'verified' ? 'verified' : 'none'}
                      />
                      <View style={styles.resultItemContent}>
                        <AppText variant="labelLarge" color="primary">
                          {c.participant.fullName}
                        </AppText>
                        <AppText variant="caption" color="secondary" numberOfLines={1}>
                          {c.lastMessage?.content || 'Encrypted conversation'}
                        </AppText>
                      </View>
                      <Badge label="Chat" variant="muted" size="sm" />
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}

            {/* Contacts match */}
            {(filter === 'All' || filter === 'Contacts') && filteredContacts.length > 0 && (
              <View style={styles.sectionGroup}>
                <AppText variant="labelLarge" color="secondary" weight="700" style={styles.groupHeader}>
                  CONTACTS ({filteredContacts.length})
                </AppText>
                <View
                  style={[
                    styles.cardList,
                    {
                      backgroundColor: theme.colors.surface,
                      borderColor: theme.colors.border,
                    },
                  ]}
                >
                  {filteredContacts.map((cnt) => (
                    <TouchableOpacity
                      key={cnt.id}
                      style={[styles.resultItem, { borderBottomColor: theme.colors.border }]}
                      onPress={() => handleOpenContact(cnt)}
                    >
                      <Avatar
                        name={cnt.user.fullName}
                        imageUrl={cnt.user.avatarUrl}
                        size="sm"
                        isOnline={cnt.user.isOnline}
                        showOnlineIndicator={true}
                        securityRing={cnt.user.securityStatus === 'verified' ? 'verified' : 'none'}
                      />
                      <View style={styles.resultItemContent}>
                        <AppText variant="labelLarge" color="primary">
                          {cnt.user.fullName}
                        </AppText>
                        <AppText variant="caption" color="muted">
                          @{cnt.user.username}
                        </AppText>
                      </View>
                      <Badge label="Contact" variant="primary" size="sm" />
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBarWrapper: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
  filtersRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 12,
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
  },
  resultsContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  recentSection: {
    marginTop: 12,
  },
  recentTitle: {
    marginBottom: 12,
  },
  recentChipsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  recentChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
  },
  chipIcon: {
    marginRight: 6,
  },
  sectionGroup: {
    marginTop: 16,
  },
  groupHeader: {
    marginBottom: 8,
  },
  cardList: {
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
  },
  resultItemContent: {
    flex: 1,
    marginLeft: 12,
    marginRight: 8,
  },
});
