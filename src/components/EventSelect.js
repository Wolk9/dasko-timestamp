import React from "react";
import { Button } from "primereact/button";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
  setDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { beginTimer, endTimer } from "../services/stopwatch";

const EventSelect = (props) => {
  const { lastLog, eventSelection, setEventSelection, events, userSelection } =
    props;

  const saveEvent = (eventId) => {
    //lastLog === undefined || lastLog.eventId !== 1 ? beginTimer() : endTimer();
    addDoc(collection(getFirestore(), "logs"), {
      userId: userSelection,
      eventId: eventId,
      timestamp: serverTimestamp(),
    })
      .then(() => {
        setEventSelection(eventId);
        // console.log("event added succesfully");
      })
      .catch((error) => {
        console.error("Error writing new message to Firebase Database", error);
      });
  };

  const SelectedButton = () => {
    return (
      <div>
        {lastLog === undefined || lastLog.eventId !== 1 ? (
          <Button
            label="begin dienst"
            severity="success"
            onClick={() => saveEvent(1)}
          />
        ) : (
          <Button
            label="eindig dienst"
            severity="danger"
            onClick={() => saveEvent(2)}
          />
        )}
      </div>
    );
  };

  return (
    <div>
      <SelectedButton />
    </div>
  );
};

export default EventSelect;
