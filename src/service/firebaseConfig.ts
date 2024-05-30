import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

import projectDataType from '../types'


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjz6iI9xECi6GmqbZfZgfMkq3PQGeJVcg",
  authDomain: "portfolio-c7e4b.firebaseapp.com",
  databaseURL: "https://portfolio-c7e4b-default-rtdb.firebaseio.com",
  projectId: "portfolio-c7e4b",
  storageBucket: "portfolio-c7e4b.appspot.com",
  messagingSenderId: "197167269959",
  appId: "1:197167269959:web:4dc44552f382029019c962"
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





