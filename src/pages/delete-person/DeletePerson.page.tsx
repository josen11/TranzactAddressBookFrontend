import React from "react";
import "./delete-person.scss";
import { useNavigate, useParams } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import axios from "axios";
import { baseUrl } from "../../constants/url.constant";
import { IPerson } from "../../types/global.typing";

const DeletePerson: React.FC = () => {
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

  const handleDeleteBtnClick = () => {
    axios
      .delete(`${baseUrl}/${id}`)
      .then((resposne) =>
        redirect("/people", {
          state: { message: "Person deleted successfully" },
        })
      )
      .catch((error) =>
        alert("Error at the moment to delete person: " + error.message)
      );
  };

  const handleBackBtnClick = () => {
    redirect("/people");
  };
  return (
    <div className="delete-person">
      <h2>Delete person</h2>
      <h4>Area you sure you want to delete this person?</h4>
      <TextField
        autoComplete="off"
        label="First name"
        variant="outlined"
        name="firstName"
        value={person.firstName}
        onChange={changeHandler}
        disabled
      />
      <TextField
        disabled
        autoComplete="off"
        label="Last name"
        variant="outlined"
        name="lastName"
        value={person.lastName}
        onChange={changeHandler}
      />
      <div>
        <Button
          variant="outlined"
          color="error"
          onClick={handleDeleteBtnClick}
        >
          Yes, delete it.
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

export default DeletePerson;
