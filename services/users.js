import { getDocs, collection } from "firebase/firestore";
import { getDb } from "./db.js";

const collection_name = "users";

export const findAllUsers = async () => {
  const doc_refs = await getDocs(collection(getDb(), collection_name));

  const res = [];

  doc_refs.forEach((user) => {
    res.push({
      id: user.id,
      ...user.data()
    });
  });

  return res;
};
