import { instance } from "../../network/axios";
import toast from "react-hot-toast";

const Done = () => toast.success("transactions successfully.");


async function getAccounts(SetAccounts, setIsLoading, id = "", isUser = false, token) {

  setIsLoading(true);
  let data = await instance
    .get(`/api/${isUser ? "v1/travel-offices/account" : "accounts"}${id ? `/${id}` : " "}`, {
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

async function getTransactions(SetTransactions, setIsLoading, id = "", token) {

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
