import {
  CreateUserPayload,
  ForgotPasswordPayload,
  LoginPayload,
  UpdateUserPayload,
} from '@types';
import {
  GoogleAuthProvider,
  User,
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { toast } from 'react-hot-toast';
import { handleError, handleResponse } from '@services/response';
import { addDocument, updateDocument } from './firestore';
import app from '@config/firebase';

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

/**
 * Function to send email verification
 * and store user in Database
 * @param {User} user
 * @param {string} url - The deep link to embed and any additional state to be passed along.
 *
 */
export const sendEmailVerificationAndStoreInDB = (user: User, url: string) => {
  sendEmailVerification(user, { url });

  addDocument('users', user.uid, {
    name: user.displayName,
    email: user.email,
    emailVerified: user.emailVerified,
    photoURL: user.photoURL,
    phoneNumber: user.phoneNumber,
    uid: user.uid,
    createdAt: user.metadata.creationTime,
  });
};

/**
 * Function to add user display name to user object,
 * send email verification and store user in Database
 * @param {User} user
 * @param {string} displayName
 * @extends sendEmailVerificationAndStoreInDB
 */
export const updateUsernameAndSendEmailVerification = (
  user: User,
  displayName: string,
  url: string
) => {
  updateProfile(user, {
    displayName: displayName,
  })
    .then(() => {
      sendEmailVerificationAndStoreInDB(user, url);
    })
    .catch((error) => {
      toast.error(error.message);
      console.error(error);
    });
};

/**
 * Function to create user
 * @param {CreateUserPayload} payload
 */
export const createUser = (payload: CreateUserPayload) => {
  return createUserWithEmailAndPassword(auth, payload.email, payload.password)
    .then(handleResponse)
    .catch(handleError);
};

/**
 * Function to login
 * @param {LoginPayload} payload
 */
export const login = (payload: LoginPayload) => {
  return signInWithEmailAndPassword(auth, payload.email, payload.password)
    .then(handleResponse)
    .catch(handleError);
};

/**
 * Sign in with google
 */
export const signinWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

  return signInWithPopup(auth, provider)
    .then(handleResponse)
    .catch(handleError);
};

/**
 * Function to reset password
 * @param {ForgotPasswordPayload} payload
 */
export const resetPassword = (payload: ForgotPasswordPayload) => {
  return sendPasswordResetEmail(auth, payload.email, {
    url: `${process.env.APP_URL}/login`,
  })
    .then(handleResponse)
    .catch(handleError);
};

/**
 * Function to update user profile
 * @param payload
 * @returns
 */
export const updateUserProfile = (payload: UpdateUserPayload) => {
  return updateProfile(payload.user, {
    displayName: payload.displayName || payload.user.displayName,
    photoURL: payload.photoURL || payload.user.photoURL,
  })
    .then((response) => {
      updateDocument('users', payload.user.uid, {
        name: payload.displayName || payload.user.displayName,
        photoURL: payload.photoURL || payload.user.photoURL,
        updatedAt: new Date(),
      });
      handleResponse(response);
    })
    .catch(handleError);
};

/**
 * Function to logout
 */
export const logOut = () => {
  signOut(auth);
};
