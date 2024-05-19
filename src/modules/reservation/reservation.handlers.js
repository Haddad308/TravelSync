import { instance } from "../../network/axios";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

const confirmed = () => toast.success("The reservation confirmed successfully.");
const canceled = () => toast.success("The reservation canceled successfully.");

const cookie = Cookies.get("auth-token-data");
const token = JSON.parse(cookie ? cookie : "null")?.token;

async function getReservation(
  SetReservation,
  setIsLoading,
  status = "",
  id = "",
) {
  setIsLoading(true);
  let data = await instance
    .get(
      `/api/reservations?limit=50${status ? `&filters=${encodeURIComponent(JSON.stringify({ status: status }))}` : ""}${id ? `/${id}` : ""}`,
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
    else SetReservation(data.data.data);
  }
  setIsLoading(false);
}

async function cancelReservation(setIsLoading, message, id = "", callback) {
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
  console.log(token);
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

export { getReservation, cancelReservation, acceptReservation, Reserve };
