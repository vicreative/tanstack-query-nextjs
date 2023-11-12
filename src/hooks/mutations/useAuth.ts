import {
  createUser,
  login,
  resetPassword,
  sendEmailVerificationAndStoreInDB,
  signinWithGoogle,
  updateUserProfile,
  updateUsernameAndSendEmailVerification,
} from '@data/auth';
import { useMutation } from '@tanstack/react-query';
import {
  CreateUserPayload,
  ForgotPasswordPayload,
  LoginPayload,
  UpdateUserPayload,
} from '@types';
import { getStoredPreviousRoute } from '@utils/auth';
import { User, UserCredential } from 'firebase/auth';
import { toast } from 'react-hot-toast';

/**
 * Hook to create user
 * @returns {UserCredential}
 */
function useCreateUser() {
  const createUserRequest = (payload: CreateUserPayload) => createUser(payload);

  const { mutate, ...mutationState } = useMutation({
    mutationFn: createUserRequest,
  });

  const createUserFn = (
    payload: CreateUserPayload,
    onSuccess = (data: UserCredential | void) => {},
    onError = (error: Error) => {}
  ) => {
    mutate(payload, {
      onSuccess: (data) => {
        const previousRoute = getStoredPreviousRoute();

        toast.success(
          'Account created successfully. A verification link has been sent to your email.'
        );
        const displayName = `${payload.firstName} ${payload.lastName}`;
        const url = previousRoute
          ? `${process.env.APP_URL}${previousRoute}`
          : `${process.env.APP_URL}`;

        updateUsernameAndSendEmailVerification(data.user, displayName, url);

        onSuccess(data);
      },
      onError: (error) => {
        if ('code' in error && error.code === 'auth/email-already-in-use') {
          toast.error('Email already in use');
        } else {
          toast.error(error.message);
        }

        onError(error);
      },
    });
  };

  return { createUser: createUserFn, createUserState: mutationState };
}

/**
 * Hook to login
 * @returns {UserCredential}
 */
function useLogin() {
  const loginRequest = (payload: LoginPayload) => login(payload);

  const { mutate, ...mutationState } = useMutation({
    mutationFn: loginRequest,
  });

  const loginFn = (
    payload: LoginPayload,
    onSuccess = (data: UserCredential | void) => {},
    onError = (error: Error) => {}
  ) => {
    mutate(payload, {
      onSuccess: (data) => {
        toast.success('Login successful');
        onSuccess(data);
      },
      onError: (error) => {
        if (
          'code' in error &&
          error.code === 'auth/invalid-login-credentials'
        ) {
          toast.error('Email and password do not match');
        } else {
          toast.error(error.message);
        }

        onError(error);
      },
    });
  };

  return { login: loginFn, loginState: mutationState };
}

/**
 * Hook to sign in with google
 * @returns {UserCredential}
 */
function useSigninWithGoogle() {
  const signInRequest = async (payload: { isSignUp: boolean }) =>
    signinWithGoogle();

  const { mutate, ...mutationState } = useMutation({
    mutationFn: signInRequest,
  });

  const signIn = (
    payload: { isSignUp: boolean } = { isSignUp: false },
    onSuccess = (data: UserCredential | void) => {},
    onError = (error: Error) => {}
  ) => {
    mutate(payload, {
      onSuccess: (data) => {
        if (payload.isSignUp && !data.user.emailVerified) {
          const previousRoute = getStoredPreviousRoute();

          toast.success(
            'Account created successfully. A verification link has been sent to your email.'
          );

          const url = previousRoute
            ? `${process.env.APP_URL}${previousRoute}`
            : `${process.env.APP_URL}`;

          sendEmailVerificationAndStoreInDB(data.user, url);
        } else {
          toast.success('Login successful');
          onSuccess(data);
        }
      },
      onError: (error) => {
        if (
          'code' in error &&
          error.code === 'auth/invalid-login-credentials'
        ) {
          toast.error('Email and password do not match');
        } else {
          toast.error(error.message);
        }
        onError(error);
      },
    });
  };

  return { signIn, signInState: mutationState };
}

/**
 * Hook to reset password
 */
function useResetPassword() {
  const resetPasswordRequest = (payload: ForgotPasswordPayload) =>
    resetPassword(payload);

  const { mutate, ...mutationState } = useMutation({
    mutationFn: resetPasswordRequest,
  });

  const resetPasswordFn = (
    payload: ForgotPasswordPayload,
    onSuccess = () => {},
    onError = (error: Error) => {}
  ) => {
    mutate(payload, {
      onSuccess: (data) => {
        toast.success('A password reset link has been sent to your email.');
        onSuccess();
      },
      onError: (error) => {
        toast.error(error.message);
        onError(error);
      },
    });
  };

  return { resetPassword: resetPasswordFn, resetPasswordState: mutationState };
}

/**
 * Hook to update user
 */
function useUpdateUser() {
  const updateUserRequest = (payload: UpdateUserPayload) =>
    updateUserProfile(payload);

  const { mutate, ...mutationState } = useMutation({
    mutationFn: updateUserRequest,
  });

  const updateUserFn = (
    payload: UpdateUserPayload,
    onSuccess = () => {},
    onError = (error: Error) => {}
  ) => {
    mutate(payload, {
      onSuccess: () => {
        toast.success('Profile updated successfully.');
        onSuccess();
      },
      onError: (error) => {
        toast.error(error.message);
        onError(error);
      },
    });
  };

  return { updateUser: updateUserFn, updateUserState: mutationState };
}

export {
  useCreateUser,
  useLogin,
  useSigninWithGoogle,
  useResetPassword,
  useUpdateUser,
};
