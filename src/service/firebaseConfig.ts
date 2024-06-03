import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

import { projectDataType } from '../types'


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

export const fetchingProjects = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Projects"));
      const promises = querySnapshot.docs.map(async (doc) => {
        const projectData = doc.data() as projectDataType;
        const imageUrl = await getDownloadURL(ref(storage, `images/${doc.id}.jpg`));
        const iconUrl = await getDownloadURL(ref(storage, `languageIcons/${doc.data().proLanguage}Icon.png`));
        projectData.imageUrl = imageUrl;
        projectData.iconUrl = iconUrl
        return projectData;
      });
      

      const projectsData = await Promise.all(promises);


      return projectsData;

      
    } catch (error) {
      console.error("Erro ao buscar documentos: ", error);
    }
    return [];
  };





