import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home.page";
import People from "./pages/people/People.page";
import AddPerson from "./pages/add-person/AddPerson.page";
import EditPerson from "./pages/edit-person/EditPerson.page";
import DeletePerson from "./pages/delete-person/DeletePerson.page";
const App: React.FC = () => {
  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Wrapper */}
      <div className="wrapper">
        <Routes>
          <Route path="/" element={<Home />} />
           {
          <Route path="/people">
           <Route index element={<People />} />
            <Route path="add" element={<AddPerson />} />
            <Route path="edit/:id" element={<EditPerson />} />
            <Route path="delete/:id" element={<DeletePerson/>} />
          </Route>
          }
        </Routes>
      </div>
    </div>
  );
};

export default App;
