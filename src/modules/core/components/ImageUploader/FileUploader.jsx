/* eslint-disable react/prop-types */
import { BsFileEarmarkImage } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";

export default function FileUploader({ imageName, index, files, setFiles }) {
  const deleteFile = (files, setFiles, idx) => {
    // Check if files is iterable (in this case, an array)
    console.log(files);
    if (!Array.isArray(files)) {
      console.error("Files is not an array.");
      return;
    }

    // Make a copy of the current files array
    const updatedFiles = [...files];

    // Remove the file at the specified index
    updatedFiles.splice(idx, 1);

    // Update the state with the new files array
    setFiles(updatedFiles);
  };

  return (
    <div
      id="Uploaded Image"
      className="flex items-center justify-between  w-4/5 p-3 border-2  border-[#11181c] rounded-md"
    >
      <div className="flex items-center gap-2">
        <BsFileEarmarkImage className="w-5 h-5" />
        <p>
          {imageName.slice(0, 25)} {imageName.length > 25 ? "...." : ""}
        </p>
      </div>
      <IoMdClose
        className="w-5 h-5 self-end cursor-pointer"
        onClick={() => {
          deleteFile(files, setFiles, index);
        }}
      />
    </div>
  );
}
