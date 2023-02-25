import React, { useEffect, useState } from "react";

//theme primereact
import "primereact/resources/themes/tailwind-light/theme.css";
//core
import "primereact/resources/primereact.min.css";
//icons
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
// firebase imports
import { doc, deleteDoc } from "firebase/firestore";
import { getDb } from "./services/db";
import { findAllUsers } from "./services/users.js";
import { findAllEvents } from "./services/events.js";
import { findAllLogs } from "./services/logs.js";

const App = () => {
  let [logs, events, users] = GetMyData();

  console.log("logs:", logs);
  console.log("events:", events);
  console.log("users:", users);

  return <div>Hello World</div>;
};

const GetMyData = () => {
  const [users, setUsers] = useState(null);
  const [logs, setLogs] = useState(null);
  const [events, setEvents] = useState(null);
  const [loadingUsers, setLoadingUsers] = React.useState(false);
  const [loadingLogs, setLoadingLogs] = React.useState(false);
  const [loadingEvents, setLoadingEvents] = React.useState(false);

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
