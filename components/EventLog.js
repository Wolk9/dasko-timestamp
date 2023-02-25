import React from "react";
import { Button, DataTable } from "primereact/button";

const EventLog = (props) => {
  const { selection, timeType, setTimeType, logs, setLogs } = props;

  const timeTypes = [
    { id: 1, tag: "begin", label: "Begin dienst" },
    { id: 2, tag: "einde", label: "Einde dienst" }
  ];

  console.log(props);

  const handleButtonClick = (type) => {
    setTimeType(type.id);
    const timestamp = Date.now().toString;
  };

  const SelectedButton = () => {
    return (
      <div>
        {timeTypes.map((type) => (
          <Button
            label={type.tag}
            key={type.id}
            severity={timeType !== type.tag ? "" : "success"}
            outlined={timeType !== type.tag}
            onClick={() => handleButtonClick(type)}
          />
        ))}
      </div>
    );
  };

  return (
    <div>
      {selection && <SelectedButton />}
      {logs &&
        (logs.length > 0 ? <DataTable></DataTable> : <h3>no logs yet</h3>)}
    </div>
  );
};

export default EventLog;
