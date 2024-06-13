import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

import { projectDataType, clientSideProjectDataType } from '../types'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase and database
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app, "gs://portfolio-c7e4b.appspot.com");

export async function readDocuments(collectionName: string): Promise<projectDataType[]> {
  const querySnapshot = await getDocs(collection(db, collectionName));
  
  const promises = querySnapshot.docs.map(async (doc) => {
    const projectData = doc.data() as clientSideProjectDataType;
    
    try {
      const imageUrl = await getDownloadURL(ref(storage, `images/${doc.id}.jpg`));
      projectData.projectImageUrl = imageUrl;
    } catch (error) {
      console.error(`Error getting image URL for document ${doc.id}: `, error);
    }
    
    try {
      const iconUrl = await getDownloadURL(ref(storage, `proLanguagesIcons/${projectData.proLanguage}Icon.png`));
      projectData.proLanguageIconUrl = iconUrl;
    } catch (error) {
      console.error(`Error getting icon URL for language ${projectData.proLanguage}: `, error);
    }
    
    return projectData;
  });

  const projectsData = await Promise.all(promises);
  return projectsData;
}



