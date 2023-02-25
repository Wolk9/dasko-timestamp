import { getDocs, collection } from "firebase/firestore";
import { getDb } from "./db.js";

const collection_name = "events";

export const findAllEvents = async () => {
  const doc_refs = await getDocs(collection(getDb(), collection_name));

  const res = [];

  doc_refs.forEach((event) => {
    res.push({
      id: event.id,
      ...event.data()
    });
  });

  return res;
};
