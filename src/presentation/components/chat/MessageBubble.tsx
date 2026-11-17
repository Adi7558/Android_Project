import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Message } from '../../../domain/entities/Message';
import { useTheme } from '../../theme/ThemeContext';
import { AppText } from '../common/AppText';
import { Check, CheckCheck, Clock, AlertCircle, CornerUpLeft } from '../../theme/icons';

export interface MessageBubbleProps {
  message: Message;
  isOutgoing: boolean;
  onLongPress?: (message: Message) => void;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  isOutgoing,
  onLongPress,
}) => {
  const { theme } = useTheme();

  const renderStatus = () => {
    if (!isOutgoing) return null;
    switch (message.status) {
      case 'read':
        return <CheckCheck size={14} color={theme.colors.messageOutgoingTime} />;
      case 'delivered':
        return <CheckCheck size={14} color={theme.colors.messageOutgoingTime} />;
      case 'sent':
        return <Check size={14} color={theme.colors.messageOutgoingTime} />;
      case 'failed':
        return <AlertCircle size={14} color={theme.colors.error} />;
      case 'sending':
      default:
        return <Clock size={12} color={theme.colors.messageOutgoingTime} />;
    }
  };

  return (
    <View
      style={[
        styles.container,
        isOutgoing ? styles.outgoingContainer : styles.incomingContainer,
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.85}
        onLongPress={() => onLongPress?.(message)}
        accessible
        accessibilityRole="text"
        accessibilityLabel={`${isOutgoing ? 'You' : 'Contact'} said: ${message.content} at ${message.timestamp}`}
        style={[
          styles.bubble,
          isOutgoing
            ? [
                styles.outgoingBubble,
                {
                  backgroundColor: theme.colors.messageOutgoing,
                  borderBottomRightRadius: 4,
                },
              ]
            : [
                styles.incomingBubble,
                {
                  backgroundColor: theme.colors.messageIncoming,
                  borderColor: theme.colors.border,
                  borderWidth: 1,
                  borderBottomLeftRadius: 4,
                },
              ],
        ]}
      >
        {/* Reply preview */}
        {message.replyTo && (
          <View
            style={[
              styles.replyContainer,
              {
                backgroundColor: isOutgoing
                  ? 'rgba(0, 0, 0, 0.15)'
                  : theme.colors.surfaceTertiary,
                borderLeftColor: isOutgoing ? '#FFFFFF' : theme.colors.primary,
              },
            ]}
          >
            <View style={styles.replyHeader}>
              <CornerUpLeft
                size={12}
                color={isOutgoing ? '#FFFFFF' : theme.colors.primary}
                style={styles.replyIcon}
              />
              <AppText
                variant="caption"
                customColor={isOutgoing ? '#FFFFFF' : theme.colors.primary}
                weight="700"
              >
                {message.replyTo.senderName}
              </AppText>
            </View>
            <AppText
              variant="caption"
              customColor={isOutgoing ? '#E0E7FF' : theme.colors.textSecondary}
              numberOfLines={1}
            >
              {message.replyTo.content}
            </AppText>
          </View>
        )}

        {/* Message Content */}
        <AppText
          variant="bodyMedium"
          customColor={
            isOutgoing
              ? theme.colors.messageOutgoingText
              : theme.colors.messageIncomingText
          }
          style={styles.messageText}
        >
          {message.content}
        </AppText>

        {/* Timestamp and Status */}
        <View style={styles.metaRow}>
          <AppText
            variant="caption"
            customColor={
              isOutgoing
                ? theme.colors.messageOutgoingTime
                : theme.colors.messageIncomingTime
            }
            style={styles.timestamp}
          >
            {message.timestamp}
          </AppText>
          {renderStatus()}
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
    paddingHorizontal: 16,
    flexDirection: 'row',
  },
  outgoingContainer: {
    justifyContent: 'flex-end',
  },
  incomingContainer: {
    justifyContent: 'flex-start',
  },
  bubble: {
    maxWidth: '82%',
    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 8,
    borderRadius: 16,
  },
  outgoingBubble: {},
  incomingBubble: {},
  replyContainer: {
    borderLeftWidth: 3,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginBottom: 6,
  },
  replyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  replyIcon: {
    marginRight: 4,
  },
  messageText: {
    lineHeight: 21,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 4,
  },
  timestamp: {
    fontSize: 10,
    marginRight: 4,
  },
});
