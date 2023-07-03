import React from 'react'
import "./add-person.scss";
import { TextField, Button } from "@mui/material";
import { IPerson } from "../../types/global.typing";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../constants/url.constant";

const AddPerson: React.FC = () => {
  const [person, setPerson] = React.useState<Partial<IPerson>>({
    firstName: "",
    lastName: "",
  });
  const redirect = useNavigate();

  // Update Person
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPerson({
      ...person,
      [event.target.name]: event.target.value,
    });
  };

  const handleSaveBtnClick = () => {
    if (person.firstName === "" || person.lastName === "") {
      alert("Enter Values");
      return;
    }

    const data: Partial<IPerson> = {
      firstName: person.firstName,
      lastName: person.lastName,
    };
    axios
      .post(baseUrl, data)
      .then((resposne) =>
        redirect("/people", {
          state: { message: "Person created successfully" },
        })
      )
      .catch((error) => alert("Error at the moment to create person: " + error.message));
  };

  const handleBackBtnClick = () => {
    redirect("/people");
 };


  return (
    <div className="add-person">
      <h2>Add new person</h2>
      <TextField
        autoComplete="off"
        label="First name"
        variant="outlined"
        name="firstName"
        value={person.firstName}
        onChange={changeHandler}
      />
      <TextField
        autoComplete="off"
        label="Last name"
        variant="outlined"
        name="lastName"
        value={person.lastName}
        onChange={changeHandler}
      />
      <div>
        <Button variant="outlined" color="primary" onClick={handleSaveBtnClick}>
          Save
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleBackBtnClick}
        >
          Back
        </Button>
      </div>
    </div>
  );
};

export default AddPerson;
