import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  Modal,
} from 'react-native';
import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainTabParamList, RootStackParamList } from '../../navigation/types';
import { useTheme } from '../../theme/ThemeContext';
import { AppHeader } from '../../components/common/AppHeader';
import { SearchBar } from '../../components/common/SearchBar';
import { Avatar } from '../../components/common/Avatar';
import { AppText } from '../../components/common/AppText';
import { Badge } from '../../components/common/Badge';
import { AppButton } from '../../components/common/AppButton';
import { AppTextInput } from '../../components/common/AppTextInput';
import { EmptyState } from '../../components/common/EmptyState';
import { Toast } from '../../components/common/Toast';
import { ShieldCheck, ShieldAlert, UserPlus, Users, Plus, Mail } from '../../theme/icons';
import { useContacts } from '../../hooks/useContacts';
import { useChat } from '../../hooks/useChat';
import { Contact } from '../../../domain/entities/Contact';

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'ContactsTab'>,
  NativeStackScreenProps<RootStackParamList>
>;

export const ContactsScreen: React.FC<Props> = ({ navigation }) => {
  const { theme } = useTheme();
  const { contacts, fetchContacts, searchContacts, addContact, isLoading } = useContacts();
  const { createOrOpenConversation } = useChat();

  const [query, setQuery] = useState('');
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [newContactInput, setNewContactInput] = useState('');
  const [addError, setAddError] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

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
    navigation.navigate('ChatConversation', {
      conversationId: conv.id,
      participantName: contact.user.fullName,
      participantAvatar: contact.user.avatarUrl,
      participantUserId: contact.user.id,
    });
  };

  const handleAddContactSubmit = async () => {
    if (!newContactInput.trim()) {
      setAddError('Username or email is required.');
      return;
    }

    const created = await addContact(newContactInput.trim());
    if (created) {
      setIsAddModalVisible(false);
      setNewContactInput('');
      setAddError(null);
      setToastMessage(`Contact @${created.user.username} added successfully.`);
    } else {
      setAddError('User not found. Try "rahul_sharma" or "priya_patil".');
    }
  };

  const renderHeaderRight = () => (
    <TouchableOpacity
      style={[styles.addIconBtn, { backgroundColor: theme.colors.primary }]}
      onPress={() => setIsAddModalVisible(true)}
      accessible
      accessibilityRole="button"
      accessibilityLabel="Add new contact"
    >
      <UserPlus size={18} color="#FFFFFF" />
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <AppHeader
        title="Verified Contacts"
        subtitle={`${contacts.length} trusted contacts in address book`}
        rightAction={renderHeaderRight()}
      />

      <View style={styles.searchWrapper}>
        <SearchBar
          value={query}
          onChangeText={setQuery}
          placeholder="Search by name, email, or fingerprint..."
        />
      </View>

      <FlatList
        data={filteredContacts}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={fetchContacts}
            tintColor={theme.colors.primary}
          />
        }
        contentContainerStyle={filteredContacts.length === 0 ? styles.emptyContainer : undefined}
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
                <AppText variant="caption" color="secondary" numberOfLines={1}>
                  @{item.user.username} • {item.user.statusMessage || 'Secured'}
                </AppText>
                <AppText variant="code" color="muted" numberOfLines={1} style={styles.fingerprintSnip}>
                  Key: {item.user.publicKeyFingerprint.slice(0, 19)}...
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
            description="Add contacts by username or scan their QR safety number."
            actionTitle="Add Contact"
            onActionPress={() => setIsAddModalVisible(true)}
          />
        }
      />

      {/* Add Contact Modal Dialog */}
      <Modal
        visible={isAddModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsAddModalVisible(false)}
      >
        <View style={[styles.modalBackdrop, { backgroundColor: theme.colors.modalBackdrop }]}>
          <View
            style={[
              styles.modalDialog,
              {
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.border,
                borderRadius: theme.borderRadius.large,
              },
            ]}
          >
            <AppText variant="headingSmall" color="primary" style={styles.modalTitle}>
              Add Contact
            </AppText>
            <AppText variant="bodySmall" color="secondary" style={styles.modalSub}>
              Enter a SecureChat username or email address to fetch their public key identity bundle.
            </AppText>

            <AppTextInput
              placeholder="e.g. rahul_sharma or priya.patil@quantsec.tech"
              value={newContactInput}
              onChangeText={(t) => {
                setNewContactInput(t);
                if (addError) setAddError(null);
              }}
              autoCapitalize="none"
              error={addError}
              leftIcon={<Mail size={18} color={theme.colors.textMuted} />}
            />

            <View style={styles.modalButtonRow}>
              <View style={styles.modalBtnCol}>
                <AppButton
                  title="Cancel"
                  variant="outline"
                  size="sm"
                  onPress={() => {
                    setIsAddModalVisible(false);
                    setAddError(null);
                  }}
                />
              </View>
              <View style={[styles.modalBtnCol, styles.modalBtnSpacing]}>
                <AppButton
                  title="Add Contact"
                  size="sm"
                  onPress={handleAddContactSubmit}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>

      <Toast visible={!!toastMessage} message={toastMessage || ''} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addIconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
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
  fingerprintSnip: {
    fontSize: 10,
    marginTop: 2,
  },
  emptyContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  modalBackdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalDialog: {
    width: '100%',
    maxWidth: 360,
    padding: 24,
    borderWidth: 1,
  },
  modalTitle: {
    marginBottom: 6,
  },
  modalSub: {
    lineHeight: 18,
    marginBottom: 16,
  },
  modalButtonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  modalBtnCol: {
    flex: 1,
  },
  modalBtnSpacing: {
    marginLeft: 10,
  },
});
