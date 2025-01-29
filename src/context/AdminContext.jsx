import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const [aToken, setAToken] = useState(
    localStorage.getItem("aToken") ? localStorage.getItem("aToken") : ""
  );

  const [doctors, setDoctors] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Function to get all doctors
  const getAllDoctors = async () => {
    try {
      if (!aToken) {
        toast.error("Token is missing. Please log in again.");
        return;
      }

      // Send token in the Authorization header
      const { data } = await axios.post(
        backendUrl + "/api/admin/all-doctors",
        {},
        {
          headers: {
            Authorization: `Bearer ${aToken}` // Correct way to pass token in headers
          }
        }
      );

      if (data.success) {
        setDoctors(data.doctors);
        console.log("Doctors:", data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error fetching doctors: " + error.message);
    }
  };


  const changeAvailaability = async (docId) => {
    try {

      const { data } = await axios.post(backendUrl + '/api/admin/change-availability', { docId }, {
        headers: {
          Authorization: `Bearer ${aToken}` // Correct way to pass token in headers
        }
      })
      if (data.success) {
        toast.success(data.message)
        getAllDoctors()
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  const value = {
    aToken,
    setAToken,
    backendUrl,
    doctors,
    getAllDoctors,
    changeAvailaability,
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
