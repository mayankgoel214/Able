import React from 'react';
import {
  View,
  Modal as RNModal,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  ViewStyle,
} from 'react-native';
import { X } from 'lucide-react-native';
import { Colors } from '../constants/colors';
import { Typography } from '../constants/typography';
import { BorderRadius, Spacing, IconSize } from '../constants/spacing';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  showCloseButton?: boolean;
  size?: 'small' | 'medium' | 'large' | 'fullscreen';
  position?: 'center' | 'bottom';
  style?: ViewStyle;
}

export const Modal: React.FC<ModalProps> = ({
  visible,
  onClose,
  title,
  children,
  showCloseButton = true,
  size = 'medium',
  position = 'center',
  style,
}) => {
  const getMaxHeight = () => {
    switch (size) {
      case 'small':
        return SCREEN_HEIGHT * 0.3;
      case 'large':
        return SCREEN_HEIGHT * 0.8;
      case 'fullscreen':
        return SCREEN_HEIGHT;
      default:
        return SCREEN_HEIGHT * 0.5;
    }
  };

  const containerStyle: ViewStyle =
    position === 'bottom'
      ? {
          justifyContent: 'flex-end',
        }
      : {
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: Spacing.xl,
        };

  const modalStyle: ViewStyle =
    position === 'bottom'
      ? {
          width: '100%',
          borderTopLeftRadius: BorderRadius.xl,
          borderTopRightRadius: BorderRadius.xl,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          maxHeight: getMaxHeight(),
        }
      : {
          width: '100%',
          borderRadius: BorderRadius.xl,
          maxHeight: getMaxHeight(),
        };

  return (
    <RNModal
      visible={visible}
      transparent
      animationType={position === 'bottom' ? 'slide' : 'fade'}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={[styles.overlay, containerStyle]}>
          <TouchableWithoutFeedback>
            <View style={[styles.modal, modalStyle, style]}>
              {(title || showCloseButton) && (
                <View style={styles.header}>
                  <Text style={styles.title}>{title}</Text>
                  {showCloseButton && (
                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                      <X size={IconSize.md} color={Colors.text.secondary} />
                    </TouchableOpacity>
                  )}
                </View>
              )}
              <View style={styles.content}>{children}</View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </RNModal>
  );
};

// Confirmation Modal
interface ConfirmModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'default' | 'danger';
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  visible,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'default',
}) => {
  return (
    <Modal visible={visible} onClose={onClose} title={title} size="small">
      <Text style={styles.message}>{message}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
          <Text style={styles.cancelText}>{cancelText}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.confirmButton,
            variant === 'danger' && styles.dangerButton,
          ]}
          onPress={() => {
            onConfirm();
            onClose();
          }}
        >
          <Text style={styles.confirmText}>{confirmText}</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modal: {
    backgroundColor: Colors.white,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.base,
  },
  title: {
    ...Typography.h4,
    color: Colors.text.primary,
    flex: 1,
  },
  closeButton: {
    padding: Spacing.sm,
    marginRight: -Spacing.sm,
  },
  content: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.xl,
  },
  message: {
    ...Typography.body,
    color: Colors.text.secondary,
    marginBottom: Spacing.xl,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.base,
    backgroundColor: Colors.gray[100],
    alignItems: 'center',
  },
  cancelText: {
    ...Typography.button,
    color: Colors.text.secondary,
  },
  confirmButton: {
    flex: 1,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.base,
    backgroundColor: Colors.primary[500],
    alignItems: 'center',
  },
  dangerButton: {
    backgroundColor: Colors.error.main,
  },
  confirmText: {
    ...Typography.button,
    color: Colors.white,
  },
});

export default Modal;
