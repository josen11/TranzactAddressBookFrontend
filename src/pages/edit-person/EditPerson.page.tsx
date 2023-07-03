import React from "react";
import "./edit-person.scss";
import { useNavigate, useParams } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import axios from "axios";
import { baseUrl } from "../../constants/url.constant";
import { IPerson } from "../../types/global.typing";

const EditPerson: React.FC = () => {
  const [person, setPerson] = React.useState<Partial<IPerson>>({
    firstName: "",
    lastName: "",
  });
  const redirect = useNavigate();
  const { id } = useParams();

  // Update Person
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPerson({
      ...person,
      [event.target.name]: event.target.value,
    });
  };

  // Update person
  React.useEffect(() => {
    axios.get<IPerson>(`${baseUrl}/${id}`).then((response) =>
      setPerson({
        firstName: response.data.firstName,
        lastName: response.data.lastName,
      })
    );
  }, []);

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
      .put(`${baseUrl}/${id}`, data)
      .then((resposne) =>
        redirect("/people", {
          state: { message: "Person updated successfully" },
        })
      )
      .catch((error) =>
        alert("Error at the moment to update person: " + error.message)
      );
  };

  const handleBackBtnClick = () => {
    redirect("/people");
  };

  return (
    <div className="edit-person">
      <h2>Edit person</h2>
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

export default EditPerson;
