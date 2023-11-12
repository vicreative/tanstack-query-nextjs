import app from '@config/firebase';
import { UploadToStorageBucket } from '@types';
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { toast } from 'react-hot-toast';

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);

/**
 * Function to upload a file to the cloud storage
 */
export const uploadToStorageBucket = ({
  file,
  filePath,
  metadata,
  onSuccess = () => {},
  onStateUpdate = () => {},
  onProgressUpdate = () => {},
}: UploadToStorageBucket) => {
  if (!metadata || !metadata.contentType) {
    // Handle the case where metadata or contentType is undefined
    console.error('Invalid metadata or contentType');
    return;
  }

  // Upload file and metadata to the object e.g filePath => 'images/mountains.jpg'
  const storageRef = ref(storage, filePath);
  const uploadTask = uploadBytesResumable(storageRef, file, metadata);

  const handleProgressUpdate = (snapshot: {
    bytesTransferred: number;
    totalBytes: number;
    state: any;
  }) => {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    onProgressUpdate(progress);
    onStateUpdate(snapshot.state);
  };

  const handleError = (error: { code: string }) => {
    // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
    switch (error.code) {
      case 'storage/unauthorized':
        // User doesn't have permission to access the object
        toast.error(
          `Unauthorized! You don't have permission to perform this action`
        );
        break;

      case 'storage/canceled':
        // User canceled the upload
        toast.error('Upload canceled!');

        break;

      case 'storage/unknown':
        // Unknown error occurred, inspect error.serverResponse
        toast.error('Ooops! an unknown error occurred');
        break;
    }
  };

  const handleSuccess = () => {
    // Upload completed successfully, now we can get the download URL
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      onSuccess(downloadURL);
    });
  };

  // Listen for state changes, errors, and completion of the upload.
  uploadTask.on(
    'state_changed',
    handleProgressUpdate,
    handleError,
    handleSuccess
  );
};

/**
 * Function to delete file from storage bucket
 * @param {string} url
 * @param {Function} onSuccess
 * @param {Function} onError
 */
export const deleteFromStorageBucket = (
  url: string,
  onSuccess: () => void,
  onError: (arg0: any) => void
) => {
  // Create a reference to the file to delete
  const fileRef = ref(storage, url);

  // Delete the file
  deleteObject(fileRef)
    .then(() => {
      // File deleted successfully
      onSuccess();
    })
    .catch((error) => {
      // Uh-oh, an error occurred!
      onError(error);
      toast.error('Uh-oh, an error occurred!');
      console.error(error);
    });
};
