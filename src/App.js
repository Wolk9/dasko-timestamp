import React, { useEffect, useState, useRef } from "react";

//theme primereact
import "primereact/resources/themes/tailwind-light/theme.css";
//core
import "primereact/resources/primereact.min.css";
//icons
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import { Menubar } from "primereact/menubar";
import { Card } from "primereact/card";
import { Button } from "primereact/button";

// firebase imports
import { doc, deleteDoc } from "firebase/firestore";
import { getDb } from "./services/db";
import { findAllUsers } from "./services/users.js";
import { findAllEvents } from "./services/events.js";

// Components import
import UserSelect from "./components/UserSelect";
import LogTable from "./components/LogTable";
import { hasFormSubmit } from "@testing-library/user-event/dist/utils";

const App = () => {
  const [userSelection, setUserSelection] = useState(null);
  const [eventSelection, setEventSelection] = useState(null);
  const [showUserTable] = useState(false);
  const [timeType, setTimeType] = useState(null);
  const [events, users] = GetMyData();

  // stopwatch
  const [startTime, setStartTime] = useState(null);
  const [now, setNow] = useState(null);
  const intervalRef = useRef(null);

  function handleStart() {
    setStartTime(Date.now());
    setNow(Date.now());

    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setNow(Date.now());
    }, 10);
  }

  function handleStop() {
    clearInterval(intervalRef.current);
  }

  let secondsPassed = 0;
  let minutesPassed = 0;
  let hoursPassed = 0;
  if (startTime != null && now != null) {
    secondsPassed = (now - startTime) / 1000;
    if (secondsPassed === 60) {
      secondsPassed = 0;
      minutesPassed++;
      if (minutesPassed === 60) {
        minutesPassed = 0;
        hoursPassed++;
      }
    }
  }

  let h = hoursPassed < 10 ? "0" + hoursPassed : hoursPassed;
  let m = minutesPassed < 10 ? "0" + minutesPassed : minutesPassed;
  let s = secondsPassed < 10 ? "0" + secondsPassed : secondsPassed;

  if (!users) return [];

  return (
    <div>
      <Menubar className="bg-blue-600" start={"DASKO Timestamp"} />
      <Card>
        <div>
          <UserSelect
            users={users}
            userSelection={userSelection}
            setUserSelection={setUserSelection}
          />
          <div>
            Time passed: {h}:{m}:{s}
          </div>
          {userSelection && (
            <LogTable
              handleStart={handleStart()}
              handleStop={handleStop()}
              eventSelection={eventSelection}
              setEventSelection={setEventSelection}
              users={users}
              events={events}
              userSelection={userSelection}
            />
          )}
        </div>
      </Card>
    </div>
  );
};

const GetMyData = () => {
  const [users, setUsers] = useState(null);
  const [events, setEvents] = useState(null);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [loadingEvents, setLoadingEvents] = useState(false);

  async function getUsers() {
    setLoadingUsers(true);
    const response = await findAllUsers();
    setUsers([...response]);
    setLoadingUsers(false);
    // console.log(response);
  }
  async function getEvents() {
    setLoadingEvents(true);
    const response = await findAllEvents();
    setEvents([...response]);
    setLoadingEvents(false);
  }

  useEffect(() => {
    getUsers();
    getEvents();
  }, []);

  // console.log(users, events);

  return [events, users];
};

export default App;
