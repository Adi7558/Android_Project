import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Message } from '../../../domain/entities/Message';
import { useTheme } from '../../theme/ThemeContext';
import { AppText } from '../common/AppText';
import { Lock, ShieldCheck, ShieldAlert, Smartphone } from '../../theme/icons';

export interface SecuritySystemMessageProps {
  message: Message;
  onPress?: () => void;
}

export const SecuritySystemMessage: React.FC<SecuritySystemMessageProps> = ({
  message,
  onPress,
}) => {
  const { theme } = useTheme();

  const getNoticeDetails = () => {
    switch (message.systemMessageType) {
      case 'key_change':
        return {
          icon: <ShieldAlert size={14} color={theme.colors.securityWarning} />,
          bgColor: theme.colors.warningLight,
          textColor: theme.colors.warning,
          borderColor: theme.colors.securityWarning,
        };
      case 'contact_verified':
        return {
          icon: <ShieldCheck size={14} color={theme.colors.securityVerified} />,
          bgColor: theme.colors.successLight,
          textColor: theme.colors.securityVerified,
          borderColor: theme.colors.securityVerified,
        };
      case 'new_device':
        return {
          icon: <Smartphone size={14} color={theme.colors.info} />,
          bgColor: theme.colors.infoLight,
          textColor: theme.colors.info,
          borderColor: theme.colors.info,
        };
      case 'e2e_notice':
      default:
        return {
          icon: <Lock size={13} color={theme.colors.primary} />,
          bgColor: theme.colors.surfaceSecondary,
          textColor: theme.colors.textSecondary,
          borderColor: theme.colors.border,
        };
    }
  };

  const details = getNoticeDetails();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        style={[
          styles.bubble,
          {
            backgroundColor: details.bgColor,
            borderColor: details.borderColor,
          },
        ]}
      >
        <View style={styles.iconContainer}>{details.icon}</View>
        <AppText
          variant="caption"
          align="center"
          customColor={details.textColor}
          weight="500"
          style={styles.text}
        >
          {message.content}
        </AppText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 28,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bubble: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 14,
    borderWidth: 1,
    maxWidth: '94%',
  },
  iconContainer: {
    marginRight: 6,
  },
  text: {
    flex: 1,
    lineHeight: 16,
  },
});
