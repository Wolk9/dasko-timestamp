import React, { useEffect, useState } from "react";

//theme primereact
import "primereact/resources/themes/tailwind-light/theme.css";
//core
import "primereact/resources/primereact.min.css";
//icons
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import { Menubar } from "primereact/menubar";
import { Card } from "primereact/card";

// firebase imports
import { doc, deleteDoc } from "firebase/firestore";
import { getDb } from "./services/db";
import { findAllUsers } from "./services/users.js";
import { findAllEvents } from "./services/events.js";
import { findAllLogs } from "./services/logs.js";
// Components import
import UserSelect from "./components/UserSelect";
import EventSelect from "./components/EventSelect";
import LogTable from "./components/LogTable";

const App = () => {
  const [userSelection, setUserSelection] = useState(null);
  const [eventSelection, setEventSelection] = useState(null);
  const [showUserTable] = useState(false);
  const [timeType, setTimeType] = useState(null);

  const [logs, events, users] = GetMyData();

  console.log("logs:", logs);
  console.log("events:", events);
  console.log("users:", users);

  return (
    <div>
      <Menubar className="bg-blue-200" start={"DASKO Timestamp"} />
      <Card>
        <UserSelect
          userSelection={userSelection}
          setUserSelection={setUserSelection}
          users={users}
        />
        {userSelection && (
          <EventSelect
            eventSelection={eventSelection}
            setEventSelection={setEventSelection}
            events={events}
            userSelection={userSelection}
          />
        )}
        {userSelection && (
          <LogTable
            logs={logs}
            users={users}
            events={events}
            userSelection={userSelection}
          />
        )}
      </Card>
    </div>
  );
};



const GetMyData = () => {
  const [users, setUsers] = useState(null);
  const [logs, setLogs] = useState(null);
  const [events, setEvents] = useState(null);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [loadingLogs, setLoadingLogs] = useState(false);
  const [loadingEvents, setLoadingEvents] = useState(false);

  async function getUsers() {
    setLoadingUsers(true);
    const response = await findAllUsers();
    setUsers([...response]);
    setLoadingUsers(false);
    console.log(response);
  }
  async function getEvents() {
    setLoadingEvents(true);
    const response = await findAllEvents();
    setEvents([...response]);
    setLoadingEvents(false);
  }
  async function getLogs() {
    setLoadingLogs(true);
    const response = await findAllLogs();
    setLogs([...response]);
    setLoadingLogs(false);
  }

  useEffect(() => {
    getUsers();
    getEvents();
    getLogs();
  }, []);

  console.log(users, events, logs);

  return [logs, events, users];
};

export default App;
