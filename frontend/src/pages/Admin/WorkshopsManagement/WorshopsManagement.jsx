import { useContext, useEffect, useState } from "react";
import axios from "axios";
import AdminDashboard from "../../../components/Admin_Dashboard/Admin_Dashboard";
import AdminContext from "../../../contexts/AdminContext";
import "./WorkshopsManagement.scss";
import SearchBar from "../../../components/SearchBar/SearchBar";
import AuthContext from "../../../contexts/AuthContext";

function WorkshopsManagement() {
  const { workshops, setWorkshops } = useContext(AdminContext);
  const { userToken } = useContext(AuthContext);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/workshop", {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((response) => {
        setWorkshops(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const onDelete = (id) => {
    axios
      .delete(`${import.meta.env.VITE_BACKEND_URL}/workshop/${id}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((res) => {
        console.info(res);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <AdminDashboard />
      <div className="workshopsContent">
        <div className="tableHeader">
          <h1>Ateliers</h1>
          <SearchBar
            setValue={setSearchValue}
            icon="search"
            placeholder="Rechercher"
            value={searchValue}
          />
        </div>
        <div className="tableSection">
          <table className="workshopsTable">
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Lieu</th>
                <th>Commentaire</th>
                <th>Participants</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {workshops
                .filter((workshop) => {
                  const values = Object.values(workshop);

                  return values.some((value) =>
                    value.toString().toLowerCase().includes(searchValue)
                  );
                })
                .map((workshop) => {
                  const dateElement = workshop.datetime
                    .split("T")[0]
                    .split("-");
                  const date = `${dateElement[2]}/${dateElement[1]}/${dateElement[0]}`;
                  const hourElement = workshop.datetime
                    .split("T")[1]
                    .split(":");
                  const hour = `${hourElement[0]}:${hourElement[1]}`;

                  return (
                    <tr key={workshop.id}>
                      <td>{`${date} ${hour}`}</td>
                      {workshop.wine_type.toLowerCase() === "rouge" ? (
                        <td>
                          <div className="redWine" />
                        </td>
                      ) : (
                        <td>
                          <div className="whiteWine" />
                        </td>
                      )}

                      <td>{workshop.place}</td>
                      <td>
                        <p className="commentary">{workshop.commentary}</p>
                      </td>
                      <td>{workshop.attendees}</td>
                      <td>
                        <div className="actionButtons">
                          <button type="button" className="editBtn">
                            <i className="fi fi-rr-edit" />
                          </button>
                          <button
                            type="button"
                            className="deleteBtn"
                            onClick={() => onDelete(workshop.id)}
                          >
                            <i className="fi fi-rr-trash" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default WorkshopsManagement;
