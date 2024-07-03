/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import uploadFile from "../reservation.handlers";

export default function TravellerFileUploader({
  TravellerFiles,
  idx,
  setIsUploading,
}) {
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState({}); // Manage loading state for each file

  const checkUploading = () => {
    for (let i = 0; i < files.length; i++) {
      if (!files[i].state) {
        return false;
      }
    }
    return true;
  };

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files).map((file) => ({
      file,
      state: false,
    }));
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleDeleteFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    TravellerFiles.splice(index, 1);
    setIsLoading((prevLoading) => {
      const newLoading = { ...prevLoading };
      delete newLoading[index];
      return newLoading;
    });
  };

  useEffect(() => {
    files.forEach(({ file, state }, index) => {
      if (!state && !isLoading[index]) {
        setIsLoading((prevLoading) => ({ ...prevLoading, [index]: true }));
        uploadFile(
          file,
          () =>
            setIsLoading((prevLoading) => ({ ...prevLoading, [index]: false })),
          "",
          TravellerFiles,
        )
          .then(() => {
            setFiles((prevFiles) =>
              prevFiles.map((f, i) =>
                i === index ? { ...f, state: true } : f,
              ),
            );
            setIsLoading((prevLoading) => ({ ...prevLoading, [index]: false }));
          })
          .catch((error) => {
            console.error("File upload failed:", error);
            setIsLoading((prevLoading) => ({ ...prevLoading, [index]: false }));
          });
      }
    });
  }, [TravellerFiles, files, isLoading]);

  useEffect(() => {
    console.log(idx);
  }, [idx]);

  useEffect(() => {
    const allFilesUploaded = checkUploading();
    setIsUploading(!allFilesUploaded);
  }, [files]);

  return (
    <div className="w-full pt-5">
      <div className="mt-2 flex flex-col gap-3 justify-center items-center rounded-lg border border-dashed border-gray-900/25 px-6 py-5">
        {files.map((file, index) => (
          <div key={index} className="flex items-center justify-between w-full">
            <span>{file.file.name}</span>
            {isLoading[index] ? (
              <span>Loading...</span>
            ) : (
              <button onClick={() => handleDeleteFile(index)}>
                <svg
                  className="h-5 w-5 text-red-500"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.707 4.293a1 1 0 00-1.414 1.414L10 13.414l-8.707 8.707a1 1 0 001.414 1.414L11.414 14l8.707 8.707a1 1 0 001.414-1.414L12.414 12l8.707-8.707a1 1 0 00-1.414-1.414L11 10.586 2.293 2.293a1 1 0 00-1.414 1.414L10.586 12 2.293 20.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            )}
          </div>
        ))}
        <div className="text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-300"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
              clipRule="evenodd"
            />
          </svg>
          <div className="mt-1 flex flex-col text-sm leading-6 text-gray-600">
            <label
              htmlFor={`file-upload-${idx}`}
              className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
            >
              <span>ارفع ملفات ذات صلة بالمسافر</span>
              <input
                id={`file-upload-${idx}`}
                name="file-upload"
                multiple
                type="file"
                className="sr-only"
                onChange={handleFileChange}
              />
            </label>
            <p className="text-xs leading-5 text-gray-600">
              PNG, JPG, GIF up to 10MB
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
