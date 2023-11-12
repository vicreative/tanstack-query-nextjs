import app from '@config/firebase';
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  getDocs,
  collection,
  DocumentData,
  deleteDoc,
  updateDoc,
} from 'firebase/firestore';

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

/**
 * Function to add document to collection
 * @param {string} path - collection path name e.g `users` or `users/${uid}`
 * @param {string} pathSegments - Additional path segments that will be applied relative to the first argument.
 *                                e.g users/${pathSegment}` or `users/${uid}/${pathSegment}`
 * @param {object} payload - item to add to database
 */
export const addDocument = async (
  path: string,
  pathSegments: string,
  payload: object
) => {
  try {
    const docRef = doc(db, path, pathSegments);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return Promise.reject({ code: 409, message: 'Document already exists' });
    } else {
      await setDoc(docRef, payload);
    }
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

/**
 * Function to update some fields of a document without overwriting the entire document,
 * @param {string} path - collection path name e.g `users` or `users/${uid}`
 * @param {string} pathSegments - Additional path segments that will be applied relative to the first argument.
 *                                e.g users/${pathSegment}` or `users/${uid}/${pathSegment}`
 * @param {object} payload - item to update in the document
 */
export const updateDocument = async (
  path: string,
  pathSegments: string,
  payload: object
) => {
  try {
    const docRef = doc(db, path, pathSegments);
    await updateDoc(docRef, payload);
  } catch (e) {
    console.error('Error updating document: ', e);
  }
};

/**
 * Function to delete document to collection
 * @param {string} path - collection path name e.g `users` or `users/${uid}`
 * @param {string} pathSegments - Additional path segments that will be applied relative to the first argument.
 *                                e.g users/${pathSegment}` or `users/${uid}/${pathSegment}`
 */
export const deleteDocument = async (path: string, pathSegments: string) => {
  try {
    const docRef = doc(db, path, pathSegments);
    await deleteDoc(docRef);
  } catch (e) {
    console.error('Error deleting document: ', e);
  }
};

/**
 * Function to get single document from a collection
 * @param {string} path - collection path name e.g `users` or `users/${uid}`
 * @param {string} pathSegments - Additional path segments that will be applied relative to the first argument.
 *                                e.g users/${pathSegment}` or `users/${uid}/${pathSegment}`
 */
export const getSingleDocument = async (path: string, pathSegments: string) => {
  const docRef = doc(db, path, pathSegments);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    // docSnap.data() will be undefined in this case
    console.error('No such document!');
  }
};

/**
 * Function to get multiple documents from a collection
 * @param {string} path - collection path name e.g `users` or `users/${uid}`
 */
export const getMultipleDocuments = async (
  path: string,
  searchQuery: string | string[] = ''
) => {
  const coll = collection(db, path);
  const querySnapshot = await getDocs(coll);

  const results: DocumentData = [];

  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    const data = doc.data();
    const title = data.title.toString().toLowerCase();

    if (title.includes(searchQuery.toString().toLowerCase())) {
      // Add each document's data to the results array
      results.push(doc.data());
    }
  });

  return results;
};

/**
 * Function to get multiple documents from a collection
 * @param {string} path - collection path name e.g `users` or `users/${uid}`
 * @param {number} offset - The number of results to skip
 * @param {number} limit - limit the number of documents retrieved
 *
 */
export const getMultiplePaginatedDocuments = async (
  path: string,
  offset: number = 0,
  limit: number = 10,
  searchQuery: string | string[] = ''
) => {
  const results = await getMultipleDocuments(path, searchQuery);

  // Group results into subarrays of size 'limit'
  const groupedResults = [];
  for (let i = 0; i < results.length; i += limit) {
    groupedResults.push(results.slice(i, i + limit));
  }

  const data = {
    results: groupedResults[offset] || [],
    number: limit,
    offset: offset,
    totalResults: results.length,
  };

  return data;
};
