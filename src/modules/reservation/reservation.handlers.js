import { instance } from "../../network/axios";
// import toast from "react-hot-toast";
import Cookies from "js-cookie";

// const deleted = () => toast.success("The agency deleted successfully.");
// const added = () => toast.success("The agency added successfully.");
// const edited = () => toast.success("The agency edited successfully.");

const token = Cookies.get("userToken");

async function getReservation(SetReservation, setIsLoading, status = "") {
    setIsLoading(true);
    let data = await instance
        .get(`/api/reservations${status ? `?filters=${encodeURIComponent(JSON.stringify({ status: status }))}` : ""}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .catch((error) => {
            console.error(error);
            setIsLoading(false);
        });
    if (data?.status === 200) {
        SetReservation(data.data.data);
        setIsLoading(false);
    }
}


export {
    getReservation
}