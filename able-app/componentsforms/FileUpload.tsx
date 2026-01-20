import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { Upload, File, X, CheckCircle } from 'lucide-react-native';
import { Colors } from '../constants/colors';
import { Typography } from '../constants/typography';
import { BorderRadius, Spacing, IconSize } from '../constants/spacing';

interface UploadedFile {
  name: string;
  size: number;
  uri: string;
  mimeType?: string;
}

interface FileUploadProps {
  onFileSelect: (file: UploadedFile) => void;
  onFileRemove?: () => void;
  selectedFile?: UploadedFile | null;
  acceptedTypes?: string[];
  maxSizeMB?: number;
  label?: string;
  description?: string;
  error?: string;
  disabled?: boolean;
  style?: ViewStyle;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  onFileRemove,
  selectedFile,
  acceptedTypes = ['application/pdf', 'image/*'],
  maxSizeMB = 10,
  label,
  description = 'PDF or Image files up to 10MB',
  error,
  disabled = false,
  style,
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const handleSelectFile = async () => {
    if (disabled) return;

    try {
      setIsUploading(true);
      setUploadError(null);

      const result = await DocumentPicker.getDocumentAsync({
        type: acceptedTypes,
        copyToCacheDirectory: true,
      });

      if (result.canceled) {
        setIsUploading(false);
        return;
      }

      const file = result.assets[0];
      const fileSizeMB = file.size ? file.size / (1024 * 1024) : 0;

      if (fileSizeMB > maxSizeMB) {
        setUploadError(`File size must be less than ${maxSizeMB}MB`);
        setIsUploading(false);
        return;
      }

      onFileSelect({
        name: file.name,
        size: file.size || 0,
        uri: file.uri,
        mimeType: file.mimeType,
      });
    } catch (err) {
      setUploadError('Failed to select file. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = () => {
    onFileRemove?.();
    setUploadError(null);
  };

  const displayError = error || uploadError;

  if (selectedFile) {
    return (
      <View style={[styles.container, style]}>
        {label && <Text style={styles.label}>{label}</Text>}

        <View style={styles.filePreview}>
          <View style={styles.fileIcon}>
            <File size={IconSize.lg} color={Colors.primary[600]} />
          </View>
          <View style={styles.fileInfo}>
            <Text style={styles.fileName} numberOfLines={1}>
              {selectedFile.name}
            </Text>
            <View style={styles.fileMetaRow}>
              <Text style={styles.fileSize}>
                {formatFileSize(selectedFile.size)}
              </Text>
              <View style={styles.uploadedBadge}>
                <CheckCircle size={14} color={Colors.success.main} />
                <Text style={styles.uploadedText}>Uploaded</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={styles.removeButton}
            onPress={handleRemove}
            disabled={disabled}
          >
            <X size={IconSize.sm} color={Colors.text.tertiary} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}

      <TouchableOpacity
        style={[
          styles.dropzone,
          displayError && styles.dropzoneError,
          disabled && styles.dropzoneDisabled,
        ]}
        onPress={handleSelectFile}
        disabled={disabled || isUploading}
        activeOpacity={0.7}
      >
        <View style={styles.uploadIcon}>
          <Upload size={IconSize.xl} color={Colors.primary[500]} />
        </View>
        <Text style={styles.uploadTitle}>
          {isUploading ? 'Selecting file...' : 'Tap to upload'}
        </Text>
        <Text style={styles.uploadDescription}>{description}</Text>
      </TouchableOpacity>

      {displayError && <Text style={styles.error}>{displayError}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.base,
  },
  label: {
    ...Typography.label,
    color: Colors.text.primary,
    marginBottom: Spacing.sm,
  },
  dropzone: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: Colors.primary[300],
    borderRadius: BorderRadius.xl,
    backgroundColor: Colors.primary[50],
    paddingVertical: Spacing['2xl'],
    paddingHorizontal: Spacing.xl,
    alignItems: 'center',
  },
  dropzoneError: {
    borderColor: Colors.error.main,
    backgroundColor: Colors.error.light,
  },
  dropzoneDisabled: {
    opacity: 0.5,
  },
  uploadIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.base,
  },
  uploadTitle: {
    ...Typography.h5,
    color: Colors.primary[700],
    marginBottom: Spacing.xs,
  },
  uploadDescription: {
    ...Typography.bodySmall,
    color: Colors.text.tertiary,
    textAlign: 'center',
  },
  filePreview: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.base,
    borderWidth: 1,
    borderColor: Colors.border.light,
    padding: Spacing.base,
  },
  fileIcon: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.primary[50],
    justifyContent: 'center',
    alignItems: 'center',
  },
  fileInfo: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  fileName: {
    ...Typography.label,
    color: Colors.text.primary,
    marginBottom: 2,
  },
  fileMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  fileSize: {
    ...Typography.caption,
    color: Colors.text.tertiary,
  },
  uploadedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  uploadedText: {
    ...Typography.caption,
    color: Colors.success.main,
  },
  removeButton: {
    padding: Spacing.sm,
  },
  error: {
    ...Typography.caption,
    color: Colors.error.main,
    marginTop: Spacing.xs,
  },
});

export default FileUpload;
