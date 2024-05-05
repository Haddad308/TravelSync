import { instance } from "../../network/axios";
import toast from "react-hot-toast";
import Cookies from 'js-cookie';

const deleted = () => toast.success('The Hotel deleted successfully.');
const added = () => toast.success('The Hotel added successfully.');
const edited = () => toast.success('The Hotel edited successfully.');

const token = Cookies.get('userToken');

async function getService(SetService, setIsLoading,service) {
    setIsLoading(true)
    let data = await instance.get(`/api/v1/${service}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    ).catch((error) => {
        console.error(error);
        setIsLoading(false)
    });

    if (data?.status === 200) {
        SetService(data.data)
        setIsLoading(false)
    }
}

async function DeleteHotel(id, callback) {
    let data = await instance.delete(`/api/v1/travel-offices/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    ).catch((error) => {
        console.error(error.message);
    });

    console.log(data);

    if (data?.status === 204) {
        deleted();
        callback();
    }
}

async function addHotel(values, setIsLoading, callback) {

    console.log(values);
    // Set loading state to true
    setIsLoading(true);

    try {
        // Make POST request to add a user
        await instance.post("/api/v1/travel-offices", values, {
            headers: {
                Authorization: "Bearer " + token, // Include bearer token in the header
            }
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

async function editHotel(values, id, setIsLoading, callback) {
    // Set loading state to true
    setIsLoading(true);

    try {
        // Make POST request to add a user
        await instance.patch(`http://localhost:3000/api/v1/travel-offices/${id}`, values, {
            headers: {
                Authorization: "Bearer " + token, // Include bearer token in the header
            }
        });
        // If successful, clear API error and log success message
        callback();
        edited();
    } catch (error) {
        // If error occurs, log error response data, set API error state, and throw the error
        console.error(error)
        throw error; // Throw the error for further handling if needed
    } finally {
        // Set loading state to false regardless of success or failure
        setIsLoading(false);
    }
}

export {
    getService,
    DeleteHotel,
    addHotel,
    editHotel
}