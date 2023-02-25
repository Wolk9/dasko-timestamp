import { getDocs, collection } from "firebase/firestore";
import { getDb } from "./db.js";

const collection_name = "logs";

export const findAllLogs = async () => {
  const doc_refs = await getDocs(collection(getDb(), collection_name));

  const res = [];

  doc_refs.forEach((log) => {
    res.push({
      id: log.id,
      ...log.data()
    });
  });

  return res;
};
