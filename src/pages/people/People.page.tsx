import { useState, useEffect } from "react";
import { IPerson } from "../../types/global.typing";
import "./people.scss";
import { baseUrl } from "../../constants/url.constant";
import axios from "axios";
import { Button } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import moment from "moment";
import Swal from "sweetalert2";

const People: React.FC = () => {
  const [people, setPeople] = useState<IPerson[]>([]);
  const location = useLocation();
  const redirect = useNavigate();

  console.log(location);
  // http://localhost:5199/people
  const fetchPeopleList = async () => {
    try {
      const response = await axios.get<IPerson[]>(baseUrl);
      setPeople(response.data);
        if (location?.state) {
        Swal.fire({
          icon: "success",
          title: location?.state?.message,
        });
        // Avoiding show sweetalert on refreshing
        redirect(location.pathname, { replace: true });
      }
    } catch (error) {
      alert("An error happened");
    }
  };

  useEffect(() => {
    fetchPeopleList();
  }, []);

  // console.log(people);
  const redirectToEditPage = (id: string) => {
    redirect(`/people/edit/${id}`);
  };

  const redirectToDeletePage = (id: string) => {
    redirect(`/people/delete/${id}`);
  };

  return (
    <div className="people">
      <h1>Product List</h1>
      {people.length === 0 ? (
        <h1>No Products</h1>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Creation Time</th>
                <th>Update Time</th>
                <th>Operations</th>
              </tr>
            </thead>
            <tbody>
              {people.map((people) => (
                <tr key={people.id}>
                  <td>{people.firstName}</td>
                  <td>{people.lastName}</td>
                  <td>{moment(people.createdDate).fromNow()}</td>
                  <td>{people.lastModifiedDate === null? 'No data': moment(people.lastModifiedDate).fromNow()}</td>
                  <td>
                    <Button
                      variant="outlined"
                      color="warning"
                      sx={{ mx: 3 }}
                      onClick={() => redirectToEditPage(people.id)}
                    >
                        Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => redirectToDeletePage(people.id)}
                    >
                        Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default People;
