import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { getFirestore, doc, deleteDoc } from "firebase/firestore";
import { Card } from "primereact/card";
import { useState } from "react";

const LogTable = (props) => {
  const {
    setLogs,
    setLoadingLogs,
    deleteEvent,
    logs,
    users,
    events,
    userSelection,
    eventSelection,
  } = props;
  const [selectedLog, setSelectedLog] = useState(null);
  console.log("LogTable props: ", props);


  const selectedLogs = logs.filter((log) => {
    return log.userId == userSelection;
  });

  const selectedUser = users.filter((user) => {
    return user.userId == userSelection;
  });

  const timeDate = (timestamp) => {
    let stampObj = timestamp.toDate();

    // console.log(timestamp.seconds, stampObj);

    let day = stampObj.getDate();
    let month = stampObj.getMonth() + 1;
    let year = stampObj.getFullYear();
    let hour = stampObj.getHours();
    let minutes = stampObj.getMinutes();

    return `${day}-${month}-${year} ${hour}:${minutes}`;
  };

  console.log(
    "1 events:",
    events,
    "logs:",
    logs,
    "users:",
    users,
    "userSelection:",
    userSelection,
    "selectedLogs:",
    selectedLogs.timestamp,
    "selectedUser",
    selectedUser
  );

  // selectedLogs.map(
  //   (x, i) => (x[i].timestamp.seconds = timeDate(x[i].timestamp))
  // );

  const stampBodyTemplate = (rowData) => {
    return timeDate(rowData.timestamp);
  };

  const eventBodyTemplate = (rowData) => {
    return events.find((x) => x.eventId == rowData.eventId).eventType;
  };

  const deleteBodyTemplate = (rowData) => {
    return (
      <div
        onMouseDown={() => {
          deleteEvent(rowData.id);
        }}
      >
        <i className="pi pi-delete-left" style={{ color: "red" }}></i>
      </div>
    );
  };

  return (
    <Card title={selectedUser[0].firstName}>
      <DataTable value={selectedLogs} dataKey="id">
        // onClick={(e) => deleteEvent(e.event.id)}
        <Column header="begin/einde" body={eventBodyTemplate}></Column>
        <Column header="datum/tijd" body={stampBodyTemplate}></Column>
        <Column body={deleteBodyTemplate}></Column>
      </DataTable>
    </Card>
  );
};

export default LogTable;
