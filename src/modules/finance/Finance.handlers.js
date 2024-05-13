import { instance } from "../../network/axios";
import Cookies from "js-cookie";

const token = Cookies.get("userToken");

async function getAccounts(SetAccounts, setIsLoading, id = "") {
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
    setIsLoading(true);
    let data = await instance
        .get(`/api/accounts/${id ? `${id}` : " "}/transactions`, {
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

export {
    getAccounts,
    getTransactions
}