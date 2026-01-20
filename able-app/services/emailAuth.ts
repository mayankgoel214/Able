import { supabase } from './supabase';

export interface AuthResponse {
  success: boolean;
  message: string;
  error?: string;
}

// Send OTP to email
export async function sendEmailOTP(email: string): Promise<AuthResponse> {
  try {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: true,
      },
    });

    if (error) {
      return {
        success: false,
        message: 'Failed to send verification code',
        error: error.message,
      };
    }

    return {
      success: true,
      message: 'Verification code sent to your email',
    };
  } catch (error) {
    return {
      success: false,
      message: 'An error occurred',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// Verify OTP
export async function verifyEmailOTP(email: string, token: string): Promise<AuthResponse & { session?: any; user?: any }> {
  try {
    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: 'email',
    });

    if (error) {
      return {
        success: false,
        message: 'Invalid verification code',
        error: error.message,
      };
    }

    return {
      success: true,
      message: 'Email verified successfully',
      session: data.session,
      user: data.user,
    };
  } catch (error) {
    return {
      success: false,
      message: 'An error occurred',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// Resend OTP
export async function resendEmailOTP(email: string): Promise<AuthResponse> {
  return sendEmailOTP(email);
}

// Sign out
export async function signOut(): Promise<AuthResponse> {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      return {
        success: false,
        message: 'Failed to sign out',
        error: error.message,
      };
    }

    return {
      success: true,
      message: 'Signed out successfully',
    };
  } catch (error) {
    return {
      success: false,
      message: 'An error occurred',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// Get current session
export async function getCurrentSession() {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();

    if (error) {
      return null;
    }

    return session;
  } catch {
    return null;
  }
}

// Get current user
export async function getCurrentUser() {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error) {
      return null;
    }

    return user;
  } catch {
    return null;
  }
}
