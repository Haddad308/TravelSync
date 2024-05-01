import { instance } from "../../network/axios";
import toast from "react-hot-toast";

const deleted = () => toast.success('The agency deleted successfully.');
const added = () => toast.success('The agency added successfully.');
const edited = () => toast.success('The agency edited successfully.');

const token = localStorage.getItem("userToken")

async function getAgencies(SetAgencies, setIsLoading) {
    setIsLoading(true)
    let data = await instance.get("/api/v1/travel-offices", {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    ).catch((error) => {
        console.error(error);
        setIsLoading(false)
    });

    if (data?.status === 200) {
        SetAgencies(data.data)
        setIsLoading(false)
    }
}

async function DeleteAgency(id, callback) {
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

async function addAgency(values, setIsLoading, callback) {
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

async function editAgency(values, id, setIsLoading, setApiError) {
    // Set loading state to true
    setIsLoading(true);
    // Clear any previous API error
    setApiError("");
    
    try {
        console.log("check Values from edit", values);
        console.log("check id", id);
        // Make POST request to add a user
        await instance.patch(`http://localhost:3000/api/v1/travel-offices/${id}`, values, {
            headers: {
                Authorization: "Bearer " + token, // Include bearer token in the header
            }
        });
        // If successful, clear API error and log success message
        setApiError("");
        console.log("hello from success");
    } catch (error) {
        // If error occurs, log error response data, set API error state, and throw the error
        if (error.response.data?.message)
            setApiError(error.response.data?.message);
        else
            setApiError("Email is already exists")
        throw error; // Throw the error for further handling if needed
    } finally {
        // Set loading state to false regardless of success or failure
        setIsLoading(false);
        getAgencies(token);
        edited();
    }
}

export {
    getAgencies,
    DeleteAgency,
    addAgency,
    editAgency
}