import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Conversation } from '../../../domain/entities/Conversation';
import { useTheme } from '../../theme/ThemeContext';
import { Avatar } from '../common/Avatar';
import { AppText } from '../common/AppText';
import { ShieldCheck, ShieldAlert, CheckCheck, Crown } from '../../theme/icons';

export interface ChatListItemProps {
  conversation: Conversation;
  onPress: () => void;
  onLongPress?: () => void;
  highlightActive?: boolean;
}

export const ChatListItem: React.FC<ChatListItemProps> = ({
  conversation,
  onPress,
  onLongPress,
  highlightActive = false,
}) => {
  const { theme } = useTheme();
  const { participant, lastMessage, unreadCount, securityVerificationStatus, updatedAt } =
    conversation;

  const isVerified = securityVerificationStatus === 'verified';
  const isKeyChanged = securityVerificationStatus === 'key_changed';
  const isMarcus = participant.fullName.includes('Marcus');

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={onPress}
      onLongPress={onLongPress}
      accessible
      accessibilityRole="button"
      accessibilityLabel={`Chat with ${participant.fullName}, ${unreadCount} unread`}
      style={[
        styles.cardContainer,
        {
          backgroundColor: theme.colors.card,
          borderColor: highlightActive ? 'rgba(37, 99, 235, 0.5)' : theme.colors.border,
          borderLeftColor: highlightActive ? '#2563EB' : theme.colors.border,
          borderLeftWidth: highlightActive ? 2 : 1,
        },
        highlightActive && styles.activeGlow,
      ]}
    >
      <Avatar
        name={participant.fullName}
        imageUrl={participant.avatarUrl}
        isOnline={participant.isOnline ?? true}
        showOnlineIndicator={true}
        securityRing={isVerified ? 'verified' : isKeyChanged ? 'warning' : 'none'}
        size="md"
      />

      <View style={styles.contentContainer}>
        <View style={styles.headerRow}>
          <View style={styles.nameRow}>
            <AppText variant="labelLarge" color="primary" weight="700" numberOfLines={1} style={styles.name}>
              {participant.fullName}
            </AppText>
            {isMarcus ? (
              <Crown size={15} color="#F59E0B" />
            ) : isVerified ? (
              <ShieldCheck size={16} color={theme.colors.securityVerified} />
            ) : isKeyChanged ? (
              <ShieldAlert size={16} color={theme.colors.securityWarning} />
            ) : null}
          </View>
          <AppText
            variant="caption"
            color="muted"
            weight="500"
          >
            {updatedAt}
          </AppText>
        </View>

        <View style={styles.messageRow}>
          <View style={styles.messagePreviewRow}>
            <CheckCheck size={15} color="#38BDF8" style={styles.statusIcon} />
            <AppText
              variant="bodySmall"
              color={unreadCount > 0 ? 'primary' : 'secondary'}
              weight={unreadCount > 0 ? '500' : '400'}
              numberOfLines={1}
              style={styles.messageText}
            >
              {lastMessage ? lastMessage.content : 'No messages yet'}
            </AppText>
          </View>

          {unreadCount > 0 && (
            <View style={[styles.unreadBadge, { backgroundColor: theme.colors.primary }]}>
              <AppText variant="caption" weight="700" customColor="#FFFFFF" style={styles.badgeText}>
                {unreadCount}
              </AppText>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 10,
  },
  activeGlow: {
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 3,
  },
  contentContainer: {
    flex: 1,
    marginLeft: 12,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
  },
  name: {
    marginRight: 6,
    fontSize: 15,
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  messagePreviewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  statusIcon: {
    marginRight: 5,
  },
  messageText: {
    flex: 1,
    fontSize: 13,
  },
  unreadBadge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    paddingHorizontal: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontSize: 11,
    lineHeight: 14,
  },
});
