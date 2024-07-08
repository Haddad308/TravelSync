import { instance } from "../../network/axios";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import useFetch from "../../network/use-fetch";

const deleted = () => toast.success("The agency deleted successfully.");
const added = () => toast.success("The agency added successfully.");
const edited = () => toast.success("The agency edited successfully.");

const cookie = Cookies.get("auth-token-data");
const token = JSON.parse(cookie ? cookie : "null")?.token;

async function getAgencies() {
  let data = await instance
    .get("/api/v1/travel-offices", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((error) => {
      console.error(error.message);
    });

  return data?.data;
}

async function useGetAgencies() {
  const fetch = useFetch();
  const ag = useQuery({
    queryKey: ["agencies"],
    queryFn: async () => {
      const res = await fetch("http://localhost:3000/api/v1/travel-offices", {
        method: "GET",
      });
      const data = await res.json();
      console.log("hmmmmmm", data);
      return data;
    },
  });

  return ag;
}

async function DeleteAgency(id, callback) {
  let data = await instance
    .delete(`/api/v1/travel-offices/${id}`, {
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
    callback();
  }
}

async function addAgency(values, setIsLoading, callback) {
  console.log(values);
  // Set loading state to true
  setIsLoading(true);

  try {
    // Make POST request to add a user
    await instance.post("/api/v1/travel-offices", values, {
      headers: {
        Authorization: "Bearer " + token, // Include bearer token in the header
      },
    });
    callback();
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

async function editAgency(values, id, setIsLoading, callback) {
  // Set loading state to true
  setIsLoading(true);

  try {
    // Make POST request to add a user
    await instance.patch(`/api/v1/travel-offices/${id}`, values, {
      headers: {
        Authorization: "Bearer " + token, // Include bearer token in the header
      },
    });
    // If successful, clear API error and log success message
    callback();
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

export { useGetAgencies, getAgencies, DeleteAgency, addAgency, editAgency };
