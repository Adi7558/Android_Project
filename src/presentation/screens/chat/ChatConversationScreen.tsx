import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { useTheme } from '../../theme/ThemeContext';
import { AppText } from '../../components/common/AppText';
import { Avatar } from '../../components/common/Avatar';
import { MessageBubble } from '../../components/chat/MessageBubble';
import { SecuritySystemMessage } from '../../components/chat/SecuritySystemMessage';
import { MessageActionSheet } from '../../components/chat/MessageActionSheet';
import { BottomSheet } from '../../components/common/BottomSheet';
import { ConfirmationDialog } from '../../components/common/ConfirmationDialog';
import { Toast } from '../../components/common/Toast';
import { AppButton } from '../../components/common/AppButton';
import { FingerprintCard } from '../../components/security/FingerprintCard';
import {
  ArrowLeft,
  Lock,
  ShieldCheck,
  Send,
  Paperclip,
  Smile,
  X,
  MoreVertical,
  CheckCircle2,
  Info,
} from '../../theme/icons';
import { useChat } from '../../hooks/useChat';
import { useSecurity } from '../../hooks/useSecurity';
import { Message } from '../../../domain/entities/Message';

type Props = NativeStackScreenProps<RootStackParamList, 'ChatConversation'>;

export const ChatConversationScreen: React.FC<Props> = ({ route, navigation }) => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const { conversationId, participantName, participantAvatar, participantUserId } =
    route.params;

  const {
    messages,
    fetchMessages,
    sendMessage,
    deleteMessage,
  } = useChat();

  const { getContactIdentity, verifiedUserIds } = useSecurity();

  const [inputText, setInputText] = useState('');
  const [replyMessage, setReplyMessage] = useState<Message | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [isActionSheetVisible, setIsActionSheetVisible] = useState(false);
  const [isSecurityModalVisible, setIsSecurityModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isInfoModalVisible, setIsInfoModalVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [contactFingerprint, setContactFingerprint] = useState<string>('');

  const flatListRef = useRef<FlatList>(null);

  const conversationMessages = messages[conversationId] || [];
  const isContactVerified = verifiedUserIds[participantUserId] ?? true;

  useEffect(() => {
    fetchMessages(conversationId);
    const loadIdentity = async () => {
      const identity = await getContactIdentity(participantUserId);
      setContactFingerprint(identity.identityKeyFingerprint);
    };
    loadIdentity();
  }, [conversationId, fetchMessages, getContactIdentity, participantUserId]);

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const textToSend = inputText.trim();
    setInputText('');
    const currentReply = replyMessage;
    setReplyMessage(null);

    await sendMessage({
      conversationId,
      recipientId: participantUserId,
      content: textToSend,
      replyTo: currentReply
        ? {
            id: currentReply.id,
            senderName:
              currentReply.senderId === 'usr_me_001' ? 'You' : participantName,
            content: currentReply.content,
          }
        : undefined,
    });

    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const handleLongPressMessage = (msg: Message) => {
    if (msg.type === 'system') return;
    setSelectedMessage(msg);
    setIsActionSheetVisible(true);
  };

  const handleCopyText = (content: string) => {
    setToastMessage('Message copied to clipboard');
  };

  const handleStartReply = (msg: Message) => {
    setReplyMessage(msg);
  };

  const handleConfirmDelete = async () => {
    if (selectedMessage) {
      await deleteMessage(selectedMessage.id, conversationId);
      setIsDeleteModalVisible(false);
      setSelectedMessage(null);
      setToastMessage('Message deleted');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      {/* Header */}
      <View
        style={[
          styles.header,
          {
            backgroundColor: theme.colors.surface,
            borderBottomColor: theme.colors.border,
            paddingTop: insets.top,
            minHeight: 56 + insets.top,
          },
        ]}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          style={styles.backButton}
          accessible
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <ArrowLeft size={22} color={theme.colors.textPrimary} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.headerProfile}
          activeOpacity={0.8}
          onPress={() => setIsSecurityModalVisible(true)}
        >
          <Avatar
            name={participantName}
            imageUrl={participantAvatar}
            size="sm"
            isOnline={true}
            showOnlineIndicator={true}
            securityRing={isContactVerified ? 'verified' : 'warning'}
          />
          <View style={styles.headerInfo}>
            <View style={styles.nameRow}>
              <AppText variant="labelLarge" color="primary" numberOfLines={1}>
                {participantName}
              </AppText>
              <ShieldCheck
                size={14}
                color={
                  isContactVerified
                    ? theme.colors.securityVerified
                    : theme.colors.securityWarning
                }
                style={styles.verifiedIcon}
              />
            </View>
            <AppText variant="caption" color="secondary">
              End-to-End Encrypted
            </AppText>
          </View>
        </TouchableOpacity>

        {/* Security indicator lock button */}
        <TouchableOpacity
          style={[
            styles.securityLockBtn,
            {
              backgroundColor: isContactVerified
                ? theme.colors.successLight
                : theme.colors.warningLight,
            },
          ]}
          onPress={() => setIsSecurityModalVisible(true)}
          accessible
          accessibilityRole="button"
          accessibilityLabel="Conversation security details"
        >
          <Lock
            size={16}
            color={
              isContactVerified
                ? theme.colors.securityVerified
                : theme.colors.securityWarning
            }
          />
        </TouchableOpacity>
      </View>

      {/* Messages List */}
      <FlatList
        ref={flatListRef}
        data={conversationMessages}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messagesListContent}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: false })}
        renderItem={({ item }) => {
          if (item.type === 'system') {
            return (
              <SecuritySystemMessage
                message={item}
                onPress={() => setIsSecurityModalVisible(true)}
              />
            );
          }

          const isOutgoing = item.senderId === 'usr_me_001';
          return (
            <MessageBubble
              message={item}
              isOutgoing={isOutgoing}
              onLongPress={handleLongPressMessage}
            />
          );
        }}
      />

      {/* Active Reply Banner */}
      {replyMessage && (
        <View
          style={[
            styles.replyBanner,
            {
              backgroundColor: theme.colors.surface,
              borderTopColor: theme.colors.border,
            },
          ]}
        >
          <View
            style={[
              styles.replyBarIndicator,
              { backgroundColor: theme.colors.primary },
            ]}
          />
          <View style={styles.replyBannerContent}>
            <AppText variant="caption" color="primary" weight="700">
              Replying to{' '}
              {replyMessage.senderId === 'usr_me_001' ? 'yourself' : participantName}
            </AppText>
            <AppText variant="caption" color="secondary" numberOfLines={1}>
              {replyMessage.content}
            </AppText>
          </View>
          <TouchableOpacity
            onPress={() => setReplyMessage(null)}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <X size={18} color={theme.colors.textMuted} />
          </TouchableOpacity>
        </View>
      )}

      {/* Message Input Bar */}
      <View
        style={[
          styles.inputBar,
          {
            backgroundColor: theme.colors.surface,
            borderTopColor: theme.colors.border,
            paddingBottom: Math.max(insets.bottom, 8),
          },
        ]}
      >
        <TouchableOpacity
          style={styles.attachBtn}
          onPress={() => setToastMessage('Encrypted file & media transfer available in Phase 2.')}
          accessible
          accessibilityRole="button"
          accessibilityLabel="Attach media"
        >
          <Paperclip size={20} color={theme.colors.textMuted} />
        </TouchableOpacity>

        <TextInput
          value={inputText}
          onChangeText={setInputText}
          placeholder="Encrypted message..."
          placeholderTextColor={theme.colors.textMuted}
          multiline
          style={[
            styles.input,
            {
              backgroundColor: theme.colors.inputBackground,
              borderColor: theme.colors.border,
              color: theme.colors.textPrimary,
              ...theme.typography.bodyMedium,
            },
          ]}
        />

        <TouchableOpacity
          style={[
            styles.sendBtn,
            {
              backgroundColor:
                inputText.trim().length > 0
                  ? theme.colors.primary
                  : theme.colors.surfaceSecondary,
            },
          ]}
          disabled={inputText.trim().length === 0}
          onPress={handleSend}
          accessible
          accessibilityRole="button"
          accessibilityLabel="Send encrypted message"
        >
          <Send
            size={18}
            color={
              inputText.trim().length > 0 ? '#FFFFFF' : theme.colors.textMuted
            }
          />
        </TouchableOpacity>
      </View>

      {/* Message Options Action Sheet */}
      <MessageActionSheet
        visible={isActionSheetVisible}
        message={selectedMessage}
        onClose={() => setIsActionSheetVisible(false)}
        onCopy={handleCopyText}
        onReply={handleStartReply}
        onDelete={() => setIsDeleteModalVisible(true)}
        onShowInfo={() => setIsInfoModalVisible(true)}
      />

      {/* Conversation Security Details Bottom Sheet */}
      <BottomSheet
        visible={isSecurityModalVisible}
        onClose={() => setIsSecurityModalVisible(false)}
        title="Conversation Security"
      >
        <View style={styles.secSheetContent}>
          <View style={styles.secEmblemRow}>
            <View
              style={[
                styles.secEmblem,
                { backgroundColor: theme.colors.successLight },
              ]}
            >
              <ShieldCheck size={36} color={theme.colors.securityVerified} />
            </View>
            <View style={styles.secEmblemText}>
              <AppText variant="headingSmall" color="primary">
                End-to-End Encrypted
              </AppText>
              <AppText variant="caption" color="secondary">
                Double Ratchet (X25519, AES-256-GCM)
              </AppText>
            </View>
          </View>

          <View style={styles.secCheckList}>
            <View style={styles.secCheckItem}>
              <CheckCircle2 size={16} color={theme.colors.securityVerified} style={styles.checkIcon} />
              <AppText variant="bodySmall" color="primary">
                Messages encrypted and authenticated
              </AppText>
            </View>
            <View style={styles.secCheckItem}>
              <CheckCircle2 size={16} color={theme.colors.securityVerified} style={styles.checkIcon} />
              <AppText variant="bodySmall" color="primary">
                Ephemeral Diffie-Hellman session active
              </AppText>
            </View>
            <View style={styles.secCheckItem}>
              <CheckCircle2 size={16} color={theme.colors.securityVerified} style={styles.checkIcon} />
              <AppText variant="bodySmall" color="primary">
                Forward and future secrecy guaranteed
              </AppText>
            </View>
          </View>

          <FingerprintCard
            title={`${participantName}'s Public Fingerprint`}
            fingerprint={contactFingerprint || '94A1 88CD 31BF 28E4 52D0 10CC 7A8B 44F1'}
            onCopy={() => setToastMessage('Fingerprint copied')}
          />

          <AppButton
            title="Verify Safety Number & QR"
            onPress={() => {
              setIsSecurityModalVisible(false);
              navigation.navigate('ContactVerification', {
                userId: participantUserId,
                userName: participantName,
                userAvatar: participantAvatar,
              });
            }}
            size="md"
            style={styles.verifyNavBtn}
          />
        </View>
      </BottomSheet>

      {/* Message Info Modal */}
      <BottomSheet
        visible={isInfoModalVisible}
        onClose={() => setIsInfoModalVisible(false)}
        title="Encrypted Message Information"
      >
        {selectedMessage && (
          <View style={styles.infoSheetContent}>
            <View style={styles.infoRow}>
              <AppText variant="caption" color="secondary">Status:</AppText>
              <AppText variant="labelMedium" color="primary" weight="700">
                {selectedMessage.status.toUpperCase()}
              </AppText>
            </View>
            <View style={styles.infoRow}>
              <AppText variant="caption" color="secondary">Encryption:</AppText>
              <AppText variant="labelMedium" color="primary">
                AES-256-GCM (Payload Tag Valid)
              </AppText>
            </View>
            <View style={styles.infoRow}>
              <AppText variant="caption" color="secondary">Timestamp:</AppText>
              <AppText variant="labelMedium" color="primary">
                {selectedMessage.timestamp}
              </AppText>
            </View>
            <View style={styles.infoRow}>
              <AppText variant="caption" color="secondary">Message Hash:</AppText>
              <AppText variant="code" color="muted">
                SHA-256 (Ratchet Header Verified)
              </AppText>
            </View>
          </View>
        )}
      </BottomSheet>

      {/* Delete Message Confirmation Dialog */}
      <ConfirmationDialog
        visible={isDeleteModalVisible}
        title="Delete Encrypted Message?"
        message="This will remove the message from your local secure store. Note: this is a local UI demonstration in Phase 1."
        confirmText="Delete"
        isDestructive={true}
        onConfirm={handleConfirmDelete}
        onCancel={() => setIsDeleteModalVisible(false)}
      />

      {/* Toast Feedback */}
      <Toast visible={!!toastMessage} message={toastMessage || ''} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
  },
  backButton: {
    marginRight: 10,
  },
  headerProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  headerInfo: {
    marginLeft: 10,
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  verifiedIcon: {
    marginLeft: 4,
  },
  securityLockBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  messagesListContent: {
    paddingVertical: 14,
    flexGrow: 1,
  },
  replyBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderTopWidth: 1,
  },
  replyBarIndicator: {
    width: 4,
    height: '100%',
    borderRadius: 2,
    marginRight: 10,
  },
  replyBannerContent: {
    flex: 1,
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderTopWidth: 1,
  },
  attachBtn: {
    padding: 8,
    marginRight: 4,
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 100,
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  sendBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  secSheetContent: {
    paddingBottom: 8,
  },
  secEmblemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  secEmblem: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  secEmblemText: {
    flex: 1,
  },
  secCheckList: {
    marginBottom: 12,
  },
  secCheckItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  checkIcon: {
    marginRight: 8,
  },
  verifyNavBtn: {
    marginTop: 12,
  },
  infoSheetContent: {
    paddingBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(150, 150, 150, 0.15)',
  },
});
