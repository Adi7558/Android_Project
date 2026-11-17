import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Message } from '../../../domain/entities/Message';
import { useTheme } from '../../theme/ThemeContext';
import { BottomSheet } from '../common/BottomSheet';
import { AppText } from '../common/AppText';
import { Copy, CornerUpLeft, Trash2, Share2, Info, Lock } from '../../theme/icons';

export interface MessageActionSheetProps {
  visible: boolean;
  message: Message | null;
  onClose: () => void;
  onCopy: (content: string) => void;
  onReply: (message: Message) => void;
  onDelete: (message: Message) => void;
  onShowInfo: (message: Message) => void;
}

export const MessageActionSheet: React.FC<MessageActionSheetProps> = ({
  visible,
  message,
  onClose,
  onCopy,
  onReply,
  onDelete,
  onShowInfo,
}) => {
  const { theme } = useTheme();

  if (!message) return null;

  const isMyMessage = message.senderId === 'usr_me_001';

  return (
    <BottomSheet visible={visible} onClose={onClose} title="Message Options">
      <View style={styles.container}>
        {/* Message preview snippet */}
        <View
          style={[
            styles.snippetBox,
            {
              backgroundColor: theme.colors.surfaceSecondary,
              borderColor: theme.colors.border,
            },
          ]}
        >
          <View style={styles.snippetHeader}>
            <Lock size={12} color={theme.colors.securityVerified} />
            <AppText variant="caption" color="muted" style={styles.snippetSec}>
              End-to-End Encrypted
            </AppText>
          </View>
          <AppText variant="bodySmall" color="primary" numberOfLines={2}>
            {message.content}
          </AppText>
        </View>

        {/* Action List */}
        <TouchableOpacity
          style={styles.actionItem}
          onPress={() => {
            onClose();
            onCopy(message.content);
          }}
        >
          <Copy size={20} color={theme.colors.textPrimary} style={styles.actionIcon} />
          <AppText variant="bodyLarge" color="primary">
            Copy Text
          </AppText>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionItem}
          onPress={() => {
            onClose();
            onReply(message);
          }}
        >
          <CornerUpLeft size={20} color={theme.colors.textPrimary} style={styles.actionIcon} />
          <AppText variant="bodyLarge" color="primary">
            Reply
          </AppText>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionItem}
          onPress={() => {
            onClose();
            onShowInfo(message);
          }}
        >
          <Info size={20} color={theme.colors.textPrimary} style={styles.actionIcon} />
          <AppText variant="bodyLarge" color="primary">
            Security & Details
          </AppText>
        </TouchableOpacity>

        {isMyMessage && (
          <TouchableOpacity
            style={styles.actionItem}
            onPress={() => {
              onClose();
              onDelete(message);
            }}
          >
            <Trash2 size={20} color={theme.colors.error} style={styles.actionIcon} />
            <AppText variant="bodyLarge" color="error">
              Delete Message
            </AppText>
          </TouchableOpacity>
        )}
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 8,
  },
  snippetBox: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 16,
  },
  snippetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  snippetSec: {
    marginLeft: 4,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
  },
  actionIcon: {
    marginRight: 16,
  },
});
