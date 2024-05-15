import { instance } from "../../network/axios";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

const deleted = () => toast.success("The Hotel deleted successfully.");
const added = () => toast.success("The Hotel added successfully.");
const edited = () => toast.success("The Hotel edited successfully.");

const cookie = Cookies.get("auth-token-data");
const token = JSON.parse(cookie ? cookie : "null")?.token;

async function getService(SetService, setIsLoading, service) {
  let data = await instance
    .get(`/api/v1/${service}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((error) => {
      console.error(error);
      setIsLoading(false);
    });
  if (data?.status === 200) {
    SetService(data.data);
    setIsLoading(false);
  }
}

async function addService(values, setIsLoading, callback, service) {
  setIsLoading(true);

  try {
    // Make POST request to add a user
    await instance.post(`/api/v1/${service}`, values, {
      headers: {
        Authorization: "Bearer " + token, // Include bearer token in the header
      },
    });
    callback(service);
    added();
  } catch (error) {
    // If error occurs, log error response data, set API error state, and throw the error
    console.error(error.response.data?.message);
    throw error; // Throw the error for further handling if needed
  } finally {
    // Set loading state to false regardless of success or failure
    setIsLoading(false);
  }
}

async function editService(values, id, setIsLoading, callback, service) {
  // Set loading state to true
  setIsLoading(true);

  try {
    // Make POST request to add a user
    await instance.patch(
      `http://localhost:3000/api/v1/${service}/${id}`,
      values,
      {
        headers: {
          Authorization: "Bearer " + token, // Include bearer token in the header
        },
      },
    );
    // If successful, clear API error and log success message
    callback(service);
    edited();
  } catch (error) {
    // If error occurs, log error response data, set API error state, and throw the error
    console.error(error);
    throw error; // Throw the error for further handling if needed
  } finally {
    // Set loading state to false regardless of success or failure
    setIsLoading(false);
  }
}

async function DeleteService(id, callback, service) {
  let data = await instance
    .delete(`/api/v1/${service}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((error) => {
      console.error(error.message);
    });

  console.log(data);

  if (data?.status === 204) {
    deleted();
    callback(service);
  }
}

export { getService, DeleteService, addService, editService };
