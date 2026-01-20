import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  signInWithPhoneNumber,
  PhoneAuthProvider,
  signInWithCredential,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User,
  ConfirmationResult,
  ApplicationVerifier
} from 'firebase/auth';

// Firebase configuration - Add your values to .env file
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY || '',
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID || '',
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID || '',
};

// Initialize Firebase (prevent re-initialization)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

// Store confirmation result globally for OTP verification
let confirmationResult: ConfirmationResult | null = null;

export interface AuthResponse {
  success: boolean;
  message: string;
  error?: string;
}

// Send OTP to phone number
export async function sendPhoneOTP(
  phoneNumber: string,
  recaptchaVerifier: ApplicationVerifier
): Promise<AuthResponse> {
  try {
    // Format phone number with country code if not present
    const formattedPhone = phoneNumber.startsWith('+')
      ? phoneNumber
      : `+1${phoneNumber.replace(/\D/g, '')}`;

    confirmationResult = await signInWithPhoneNumber(auth, formattedPhone, recaptchaVerifier);

    return {
      success: true,
      message: 'OTP sent successfully',
    };
  } catch (error: any) {
    console.error('Send OTP Error:', error);
    return {
      success: false,
      message: 'Failed to send OTP',
      error: error.message || 'Unknown error',
    };
  }
}

// Verify OTP
export async function verifyPhoneOTP(otp: string): Promise<AuthResponse & { user?: User }> {
  try {
    if (!confirmationResult) {
      return {
        success: false,
        message: 'No OTP request found. Please request a new OTP.',
      };
    }

    const result = await confirmationResult.confirm(otp);

    return {
      success: true,
      message: 'Phone verified successfully',
      user: result.user,
    };
  } catch (error: any) {
    console.error('Verify OTP Error:', error);
    return {
      success: false,
      message: 'Invalid OTP',
      error: error.message || 'Unknown error',
    };
  }
}

// Sign out
export async function signOut(): Promise<AuthResponse> {
  try {
    await firebaseSignOut(auth);
    confirmationResult = null;
    return {
      success: true,
      message: 'Signed out successfully',
    };
  } catch (error: any) {
    return {
      success: false,
      message: 'Failed to sign out',
      error: error.message,
    };
  }
}

// Get current user
export function getCurrentUser(): User | null {
  return auth.currentUser;
}

// Listen to auth state changes
export function onAuthStateChange(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}

// Clear confirmation result (for resend)
export function clearConfirmation() {
  confirmationResult = null;
}

export { auth, app };
