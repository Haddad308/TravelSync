import { instance } from "../../network/axios";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

const confirmed = () => toast.success("The reservation confirmed successfully.");
const canceled = () => toast.success("The reservation canceled successfully.");


async function getReservation(
  SetReservation,
  setIsLoading,
  status = "",
  id = "",
  token = "",
) {
  setIsLoading(true);
  status = status === "all" ? "" : status;
  let data = await instance
    .get(
      `/api/reservations${id ? `/${id}` : ""}?limit=50${status ? `&filters=${encodeURIComponent(JSON.stringify({ status: status }))}` : ""}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    .catch((error) => {
      console.error(error);
      setIsLoading(false);
    });
  if (data?.status === 200) {
    if (id) SetReservation(data.data);
    else SetReservation(data.data.data.data);
  }
  setIsLoading(false);
}


async function requestAction(setIsLoading, message, id = "", callback) {
  const cookie = Cookies.get("auth-token-data");
  const token = JSON.parse(cookie ? cookie : "null")?.token;

  setIsLoading(true);
  let data = await instance
    .patch(`/api/reservations/${id}/request-action`, message, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((error) => {
      console.error(error);
      setIsLoading(false);
    });
  if (data?.status === 200) {
    canceled();
    callback();
  }
  setIsLoading(false);
}


async function cancelReservation(setIsLoading, message, id = "", callback) {
  const cookie = Cookies.get("auth-token-data");
  const token = JSON.parse(cookie ? cookie : "null")?.token;

  setIsLoading(true);
  let data = await instance
    .patch(`/api/reservations/${id}/cancel`, message, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((error) => {
      console.error(error);
      setIsLoading(false);
    });
  if (data?.status === 200) {
    canceled();
    callback();
  }
  setIsLoading(false);
}

async function acceptReservation(setIsLoading, id = "", callback) {
  const cookie = Cookies.get("auth-token-data");
  const token = JSON.parse(cookie ? cookie : "null")?.token;

  console.log(token);
  setIsLoading(true);
  try {
    let data = await instance.patch(`/api/reservations/${id}/confirm`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (data?.status === 200) {
      confirmed();
      callback();
    }
  } catch (error) {
    console.error(error);
  } finally {
    setIsLoading(false);
  }
}

async function Reserve(setIsLoading, values) {
  const cookie = Cookies.get("auth-token-data");
  const token = JSON.parse(cookie ? cookie : "null")?.token;
  setIsLoading(true);
  try {
    let data = await instance.post(`/api/reservations`, values, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (data?.status === 201) {
      confirmed();
      // callback()
    }
  } catch (error) {
    console.log(error);
    console.error(error);
  } finally {
    setIsLoading(false);
  }
}

import axios from 'axios';

async function uploadFile(file, isLoading, status, travellerIDs) {
  isLoading = true; // Set loading state to true
  try {
    const formData = new FormData();
    formData.append("files", file);

    const result = await axios.post(
      "http://localhost:3000/api/attatchments/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    const uploadedImageIds = result.data.map((image) => image.id);

    // Add the uploaded image IDs to the travellerIDs list
    travellerIDs.push(...uploadedImageIds);
  } catch (error) {
    if (status !== "edit") {
      throw error; // Re-throw the error to propagate it to the calling code
    }
  } finally {
    isLoading = false;
    // Set loading state to false regardless of success or failure
  }
}

export default uploadFile;


export { getReservation, cancelReservation, acceptReservation, Reserve, requestAction, uploadFile };
