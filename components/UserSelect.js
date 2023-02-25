import React from "react";
import { Button } from "primereact/button";

const UserSelect = (props) => {
  const { userSelection, setUserSelection, users } = props;


  console.log("UserSelect props: ", props)

  const SelectedButton = () => {
    return (
      <div>
        {users.map((user) => (
          <Button
            label={user.firstName}
            key={user.id}
            severity={userSelection !== user.userId ? "" : "success"}
            outlined={userSelection !== user.userId}
            onClick={() => setUserSelection(user.userId)}
          />
        ))}
      </div>
    );
  };
  return (
    <div>
      {!userSelection ? (
        <h3>no user selected</h3>
      ) : (
        <h3>
          User {users.find((user) => user.userId === userSelection).firstName}{" "}
          is selected
        </h3>
      )}
      <SelectedButton />
    </div>
  );
};

export default UserSelect;
