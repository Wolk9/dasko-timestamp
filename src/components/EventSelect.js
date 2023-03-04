import React from "react";
import { Button } from "primereact/button";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

const EventSelect = (props) => {
  const { handleStart, handleStop, lastLog, setEventSelection, userSelection } =
    props;

  const start = () => {
    handleStart();
  };

  const stop = () => {
    handleStop();
  };

  const saveEvent = (eventId) => {
    lastLog === undefined || lastLog.eventId !== 1 ? start() : stop();
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
