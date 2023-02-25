import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

let db = false;

export const getDb = () => {
  if (!db) {
    const firebaseConfig = {
      apiKey: "AIzaSyCtIsRGrtk-YWTOJ2iRIiJWrRwqcWH5k5o",
      authDomain: "wolk9-dasko-timetable.firebaseapp.com",
      projectId: "wolk9-dasko-timetable",
      storageBucket: "wolk9-dasko-timetable.appspot.com",
      messagingSenderId: "465342112975",
      appId: "1:465342112975:web:28ef754211aea7366d43ba",
      measurementId: "G-YSNVRL5E08"
    };

    const app = initializeApp(firebaseConfig);

    db = getFirestore(app);
  }

  return db;
};
