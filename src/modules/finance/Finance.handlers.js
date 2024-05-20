import { instance } from "../../network/axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const Done = () => toast.success("transactions successfully.");


async function getAccounts(SetAccounts, setIsLoading, id = "") {
  const cookie = Cookies.get("auth-token-data");
  const token = JSON.parse(cookie ? cookie : "null")?.token;

  setIsLoading(true);
  let data = await instance
    .get(`/api/accounts${id ? `/${id}` : " "}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((error) => {
      console.error(error);
      setIsLoading(false);
    });
  if (data?.status === 200) {
    SetAccounts(data.data);
  }
  setIsLoading(false);
}

async function getTransactions(SetTransactions, setIsLoading, id = "") {
  const cookie = Cookies.get("auth-token-data");
  const token = JSON.parse(cookie ? cookie : "null")?.token;

  setIsLoading(true);
  let data = await instance
    .get(`/api/accounts/${id ? `${id}/` : ""}transactions`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((error) => {
      console.error(error);
      setIsLoading(false);
    });
  if (data?.status === 200) {
    SetTransactions(data.data);
  }
  setIsLoading(false);
}

async function MakeTransaction(values, setIsLoading, id = "", token, callback) {
  console.log(callback);
  setIsLoading(true);

  try {
    const response = await instance.post(`/api/accounts${id ? `/${id}` : ""}/transactions`, values, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 201) {
      Done(); // Assuming Done is a function defined elsewhere in your code
    }
  } catch (error) {
    console.error(error);
  } finally {
    setIsLoading(false);
    callback();

  }
}



export { getAccounts, getTransactions, MakeTransaction };
