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


const EventSelect = (props) => {
  const { lastLog, eventSelection, setEventSelection, events, userSelection } =
    props;
  // console.log("EventSelect props: ", props);

  // const handleClickButton = (e) => {
  //   // console.log("clicked!", e);
  //   setEventSelection(e.eventId);
  //   saveEvent();
  // };
  // Saves a new message to Cloud Firestore.

  const saveEvent = (eventId) => {
    // console.log("saved: ", eventId);
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
      {/* {!eventSelection ? (
        <h3>no event selected</h3>
      ) : (
        <h3>
          Event{" "}
          {events.find((event) => event.eventId === eventSelection).eventType}{" "}
          is selected
        </h3>
      )} */}
      <SelectedButton />
    </div>
  );
};

export default EventSelect;
