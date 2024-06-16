import { initializeApp } from "firebase/app";
import { getFirestore, } from "firebase/firestore";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

import { projectDataType, technologiesDataType } from '../types'

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

export async function fetchProjectsAndTechnologies(): Promise<projectDataType[]> {
  const projectsData:projectDataType[] = [];
  const projectsSnapshot = await getDocs(collection(db, "Projects"));

  for (const projectSnapshot of projectsSnapshot.docs) {
    const projectData = projectSnapshot.data();
    const techIdRef = doc(db, "Technologies", projectData.techId);
    const technologyDoc = await getDoc(techIdRef);
    projectData.technology = technologyDoc.data()

    //Getting project image
    try {
      const projectIconUrl = await getDownloadURL(ref(storage, `images/${projectSnapshot.id}.jpg`));
      projectData.projectImageUrl = projectIconUrl
    } catch (error) {
      console.log(`Project image ${projectData.name} was not found...` )
    }

    //Getting technology icons
    try {
      const techIconUrl = await getDownloadURL(ref(storage, `technologiesIcons/${projectData.technology.techName}Icon.png`));
      projectData.technology.techIconUrl = techIconUrl

    } catch (error) {
      console.log(`Tech icon ${projectData.technology.name} was not found...` )
    }

    projectsData.push(projectData as projectDataType)
  }
  
  return projectsData
}

export async function fetchTechnologies(): Promise<technologiesDataType[]> {
  const technologiesData: technologiesDataType [] = [] 
  const technologiesSnapshot = await getDocs(collection(db, "Technologies"));
  for(const technology of technologiesSnapshot.docs){
    const tecnologieSnapshot = technology.data()

    try {
      const techIconUrl = await getDownloadURL(ref(storage, `technologiesIcons/${tecnologieSnapshot.techName}Icon.png`));
      tecnologieSnapshot.techIconUrl = techIconUrl

    } catch (error) {
      console.log(`Tech icon ${tecnologieSnapshot.techName} was not found...` )
    }

    technologiesData.push(tecnologieSnapshot as technologiesDataType)
  }
  return technologiesData;
};




