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
  Image,
} from "@nextui-org/react";
import * as Yup from "yup"; // For validation.
import { useFormik } from "formik";
import ImagesUploader from "../../core/components/ImageUploader/ImageUploader";
import { useState } from "react";
import { uploadImage } from "../../core/core.handlers";
import { editAgency } from "../Agencies.handlers";
import { EditIcon } from "../../core/components/icons/EditIcon";
import Alert from "../../core/components/Alert";
import { RemoveEmptyValues } from "../../core/utils";

export default function AgenciesFormEdit({ handleUpdate, agency, agencyId }) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [agencyImage, setAgencyImage] = useState([]);
  const [isLoading, setIsLoading] = useState("");
  const [apiError, setApiError] = useState("");

  const formHandler = useFormik({
    initialValues: {
      name: agency.name,
      state: agency.state,
      city: agency.city,
      email: agency.email,
      phone: agency.phone,
      address: agency.address,
      country: agency.country,
      postalCode: agency.postalCode,
      profilePhotoId: agency.profilePhotoId,
      WholesalerId: 1,
    },
    validationSchema: () => {
      const phoneRegex = /^\+20(1[0125]\d{8})$/; // Egyptian phone number regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Email regex

      return Yup.object({
        name: Yup.string(),
        state: Yup.string(),
        city: Yup.string(),
        email: Yup.string().matches(emailRegex, "Invalid email address"),
        phone: Yup.string().matches(
          phoneRegex,
          "Invalid Egyptian phone number",
        ),
        address: Yup.string(),
        country: Yup.string(),
        postalCode: Yup.string(),
      });
    },

    onSubmit: (values, { resetForm }) => {
      values = RemoveEmptyValues(values);
      uploadImage(agencyImage, setIsLoading, setApiError, "edit").then((id) => {
        console.log("checking the Image.", id); // Check if image is properly updated
        values["profilePhotoId"] = id ? id[0] : null;
        editAgency(values, agencyId, setIsLoading, handleUpdate).then(() => {
          onClose();
          resetForm();
        });
      });
    },
  });

  return (
    <div className="flex flex-col gap-2">
      <span
        onClick={onOpen}
        className="text-lg text-default-400 cursor-pointer active:opacity-50"
      >
        <EditIcon />
      </span>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior="inside"
        backdrop="blur"
        size="5xl"
      >
        <ModalContent>
          {(onClose) => (
            <form onSubmit={formHandler.handleSubmit}>
              <ModalHeader className="flex flex-col gap-1">
                Add new Agency
              </ModalHeader>
              <ModalBody className="flex flex-row  items-center">
                <div className="w-1/2">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Input
                        id="name"
                        type="name"
                        label="Name"
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.name}
                        isInvalid={
                          formHandler.touched.name && formHandler.errors.name
                        }
                        errorMessage={formHandler.errors.name}
                      />
                    </div>

                    <div>
                      <Input
                        id="state"
                        type="state"
                        label="state"
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.state}
                        isInvalid={
                          formHandler.touched.state && formHandler.errors.state
                        }
                        errorMessage={formHandler.errors.state}
                      />
                    </div>

                    <div>
                      <Input
                        id="city"
                        type="city"
                        label="city"
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.city}
                        isInvalid={
                          formHandler.touched.city && formHandler.errors.city
                        }
                        errorMessage={formHandler.errors.city}
                      />
                    </div>

                    <div>
                      <Input
                        id="email"
                        label="email"
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.email}
                        isInvalid={
                          formHandler.touched.email && formHandler.errors.email
                        }
                        errorMessage={formHandler.errors.email}
                      />
                    </div>

                    <div>
                      <Input
                        id="phone"
                        type="phone"
                        label="phone"
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.phone}
                        errorMessage={formHandler.errors.phone}
                        isInvalid={
                          formHandler.touched.phone && formHandler.errors.phone
                        }
                      />
                    </div>
                    <div>
                      <Input
                        id="address"
                        type="address"
                        label="address"
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.address}
                        isInvalid={
                          formHandler.touched.address &&
                          formHandler.errors.address
                        }
                        errorMessage={formHandler.errors.address}
                      />
                    </div>
                    <div>
                      <Input
                        id="country"
                        type="country"
                        label="country"
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.country}
                        isInvalid={
                          formHandler.touched.country &&
                          formHandler.errors.country
                        }
                        errorMessage={formHandler.errors.country}
                      />
                    </div>

                    <div>
                      <Input
                        id="postalCode"
                        type="postalCode"
                        label="postalCode"
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.postalCode}
                        isInvalid={
                          formHandler.touched.postalCode &&
                          formHandler.errors.postalCode
                        }
                        errorMessage={formHandler.errors.postalCode}
                      />
                    </div>

                    <div className="col-span-2">
                      {apiError ? <Alert text={apiError} /> : ""}
                    </div>
                  </div>
                </div>
                <div className="w-1/2">
                  <div className="flex justify-center mb-2 w-28 h-28">
                    <Image src={agency.profilePhoto?.imageUrl} />
                  </div>
                  <ImagesUploader
                    files={agencyImage}
                    setFiles={setAgencyImage}
                    isMultiple={false}
                    isOnly={true}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  isLoading={isLoading}
                  color="secondary"
                  type="submit"
                  className="text-white"
                >
                  Edit
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
