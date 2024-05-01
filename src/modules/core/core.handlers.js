import { instance } from "../../network/axios";

async function uploadImage(imagesList, setIsLoading, setApiErrorImg) {
    setIsLoading(true); // Set loading state to true
    try {
        setApiErrorImg(""); // Clear any previous image upload error

        const formData = new FormData();
        imagesList.forEach(image => {
            formData.append("files", image);
        });

        const result = await instance.post("http://localhost:3000/api/v1/images/upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        const uploadedImageIds = result.data.map(image => image.id);
        return uploadedImageIds;

    } catch (error) {
        setApiErrorImg("Error uploading image. Please try again.");
        throw error; // Re-throw the error to propagate it to the calling code
    } finally {
        setIsLoading(false); // Set loading state to false regardless of success or failure
    }
}

export {
    uploadImage
}