/* eslint-disable react/prop-types */
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { PlusIcon } from "../../core/components/icons/PlusIcon";
import * as Yup from "yup"; // For validation.
import { useFormik } from "formik";
import ImagesUploader from "../../core/components/ImageUploader/ImageUploader";
import { useState } from "react";
import { uploadImage } from "../../core/core.handlers";
import Alert from "../../core/components/Alert";
import { addService } from "../services.handlers";

export default function CruisesForm({ handleUpdate }) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [agencyImage, setAgencyImage] = useState([]);
  const [isLoading, setIsLoading] = useState("");
  const [apiError, setApiError] = useState("");

  const formHandler = useFormik({
    initialValues: {
      name: "",
      address: "",
      stars: "",
      city: "",
      state: "",
      zipCode: "",
      mobileNumber: "",
      phoneNumber: "",
      website: "",
      email: "",
      description: "",
      WholesalerId: 1,
    },
    validationSchema: () => {
      const phoneRegex = /^\+20(1[0125]\d{8})$/; // Egyptian phone number regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Email regex

      return Yup.object({
        name: Yup.string().required("Required"),
        address: Yup.string().required("Required"),
        stars: Yup.number().integer().required("Required"),
        city: Yup.string().required("Required"),
        state: Yup.string().required("Required"),
        zipCode: Yup.string().required("Required"),
        mobileNumber: Yup.string().required("Required"),
        phoneNumber: Yup.string()
          .matches(phoneRegex, "Invalid Egyptian phoneNumber number")
          .required("Required"),
        website: Yup.string().required("Required"),
        email: Yup.string()
          .matches(emailRegex, "Invalid email address")
          .required("Required"),
        description: Yup.string().required("Required"),
      });
    },

    onSubmit: (values, { resetForm }) => {
      console.log("Is hre?", values);
      uploadImage(agencyImage, setIsLoading, setApiError).then((id) => {
        console.log("checking the Image.", id); // Check if image is properly updated
        values["imageIds"] = id ? id : null;
        values["stars"] = Number(values["stars"]);
        addService(values, setIsLoading, handleUpdate, "cruises").then(() => {
          onClose();
          resetForm();
        });
      });
    },
  });

  return (
    <div className="flex flex-col gap-2">
      <Button
        className="bg-foreground text-background"
        onPress={onOpen}
        endContent={<PlusIcon />}
        size="sm"
      >
        Add New
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior="outside"
        backdrop="blur"
        size="5xl"
      >
        <ModalContent>
          {(onClose) => (
            <form onSubmit={formHandler.handleSubmit}>
              <ModalHeader className="flex flex-col gap-1">
                Add new Agency
              </ModalHeader>
              <ModalBody className="flex flex-row items-center">
                <div className="w-1/2">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Input
                        id="name"
                        type="name"
                        label="Name"
                        variant="bordered"
                        labelPlacement="outside"
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.name}
                      />
                      {formHandler.touched.name && formHandler.errors.name ? (
                        <div className="text-red-600">
                          {formHandler.errors.name}
                        </div>
                      ) : null}
                    </div>

                    <div>
                      <Input
                        id="stars"
                        // type=""
                        label="stars"
                        variant="bordered"
                        labelPlacement="outside"
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.stars}
                      />
                      {formHandler.touched.stars && formHandler.errors.stars ? (
                        <div className="text-red-600">
                          {formHandler.errors.stars}
                        </div>
                      ) : null}
                    </div>

                    <div>
                      <Input
                        id="zipCode"
                        type="zipCode"
                        label="zipCode"
                        variant="bordered"
                        labelPlacement="outside"
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.zipCode}
                      />
                      {formHandler.touched.zipCode &&
                      formHandler.errors.zipCode ? (
                        <div className="text-red-600">
                          {formHandler.errors.zipCode}
                        </div>
                      ) : null}
                    </div>

                    <div>
                      <Input
                        id="state"
                        type="state"
                        label="state"
                        variant="bordered"
                        labelPlacement="outside"
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.state}
                      />
                      {formHandler.touched.state && formHandler.errors.state ? (
                        <div className="text-red-600">
                          {formHandler.errors.state}
                        </div>
                      ) : null}
                    </div>

                    <div>
                      <Input
                        id="city"
                        type="city"
                        label="city"
                        variant="bordered"
                        labelPlacement="outside"
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.city}
                      />
                      {formHandler.touched.city && formHandler.errors.city ? (
                        <div className="text-red-600">
                          {formHandler.errors.city}
                        </div>
                      ) : null}
                    </div>

                    <div>
                      <Input
                        id="email"
                        label="email"
                        variant="bordered"
                        labelPlacement="outside"
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.email}
                      />
                      {formHandler.touched.email && formHandler.errors.email ? (
                        <div className="text-red-600">
                          {formHandler.errors.email}
                        </div>
                      ) : null}
                    </div>

                    <div>
                      <Input
                        id="phoneNumber"
                        type="phoneNumber"
                        label="phoneNumber"
                        variant="bordered"
                        labelPlacement="outside"
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.phoneNumber}
                      />
                      {formHandler.touched.phoneNumber &&
                      formHandler.errors.phoneNumber ? (
                        <div className="text-red-600">
                          {formHandler.errors.phoneNumber}
                        </div>
                      ) : null}
                    </div>

                    <div>
                      <Input
                        id="mobileNumber"
                        type="mobileNumber"
                        label="mobileNumber"
                        variant="bordered"
                        labelPlacement="outside"
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.mobileNumber}
                      />
                      {formHandler.touched.mobileNumber &&
                      formHandler.errors.mobileNumber ? (
                        <div className="text-red-600">
                          {formHandler.errors.mobileNumber}
                        </div>
                      ) : null}
                    </div>

                    <div>
                      <Input
                        id="address"
                        type="address"
                        label="address"
                        variant="bordered"
                        labelPlacement="outside"
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.address}
                      />
                      {formHandler.touched.address &&
                      formHandler.errors.address ? (
                        <div className="text-red-600">
                          {formHandler.errors.address}
                        </div>
                      ) : null}
                    </div>

                    <div>
                      <Input
                        id="website"
                        type="website"
                        label="website"
                        variant="bordered"
                        labelPlacement="outside"
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.website}
                      />
                      {formHandler.touched.website &&
                      formHandler.errors.website ? (
                        <div className="text-red-600">
                          {formHandler.errors.website}
                        </div>
                      ) : null}
                    </div>

                    <div>
                      <Input
                        id="description"
                        type="description"
                        label="description"
                        variant="bordered"
                        labelPlacement="outside"
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.description}
                      />
                      {formHandler.touched.description &&
                      formHandler.errors.description ? (
                        <div className="text-red-600">
                          {formHandler.errors.description}
                        </div>
                      ) : null}
                    </div>

                    <div className="col-span-2">
                      {apiError ? <Alert text={apiError} /> : ""}
                    </div>
                  </div>
                </div>
                <div className="w-1/2">
                  <ImagesUploader
                    files={agencyImage}
                    setFiles={setAgencyImage}
                    isMultiple={true}
                    isOnly={false}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  isLoading={isLoading}
                  color="success"
                  type="submit"
                  className="text-white"
                >
                  Add
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
