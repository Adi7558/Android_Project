import React from 'react';
import {
  Modal,
  View,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { AppText } from './AppText';
import { AppButton } from './AppButton';

export interface ConfirmationDialogProps {
  visible: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isDestructive?: boolean;
  isLoading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  visible,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  isDestructive = false,
  isLoading = false,
  onConfirm,
  onCancel,
}) => {
  const { theme } = useTheme();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <TouchableWithoutFeedback onPress={onCancel}>
        <View
          style={[
            styles.backdrop,
            { backgroundColor: theme.colors.modalBackdrop },
          ]}
        >
          <TouchableWithoutFeedback>
            <View
              style={[
                styles.dialog,
                {
                  backgroundColor: theme.colors.surface,
                  borderColor: theme.colors.border,
                  borderRadius: theme.borderRadius.large,
                  ...theme.shadows.large,
                },
              ]}
            >
              <AppText variant="headingSmall" color="primary" style={styles.title}>
                {title}
              </AppText>
              <AppText variant="bodyMedium" color="secondary" style={styles.message}>
                {message}
              </AppText>

              <View style={styles.buttonRow}>
                <View style={styles.buttonCol}>
                  <AppButton
                    title={cancelText}
                    variant="outline"
                    size="sm"
                    onPress={onCancel}
                    disabled={isLoading}
                  />
                </View>
                <View style={[styles.buttonCol, styles.buttonSpacing]}>
                  <AppButton
                    title={confirmText}
                    variant={isDestructive ? 'danger' : 'primary'}
                    size="sm"
                    isLoading={isLoading}
                    onPress={onConfirm}
                  />
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  dialog: {
    width: '100%',
    maxWidth: 360,
    padding: 24,
    borderWidth: 1,
  },
  title: {
    marginBottom: 10,
  },
  message: {
    lineHeight: 22,
    marginBottom: 24,
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  buttonCol: {
    flex: 1,
  },
  buttonSpacing: {
    marginLeft: 12,
  },
});
