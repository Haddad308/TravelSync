/* eslint-disable react/prop-types */
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Select,
  SelectItem,
  Input,
} from "@nextui-org/react";
import { PlusIcon } from "../../core/components/icons/PlusIcon";
import * as Yup from "yup"; // For validation.
import { useFormik } from "formik";
import ImagesUploader from "../../core/components/ImageUploader/ImageUploader";
import { useEffect, useState } from "react";
import { uploadImage } from "../../core/core.handlers";
import { addUser } from "../Users.handlers";
import { getAgencies } from "../../agencies/Agencies.handlers";
import Alert from "../../core/components/Alert";

export default function UsersForm({ handleUpdate }) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [userImage, setUserImage] = useState([]);
  const [isLoading, setIsLoading] = useState("");
  const [apiError, setApiError] = useState("");

  const [agencies, setAgencies] = useState([]);

  useEffect(() => {
    getAgencies(setAgencies, setIsLoading);
  }, []);

  const handleUpdateAgencies = () => {
    getAgencies(setAgencies, setIsLoading);
    console.log("Agencies:", agencies);
  };

  const formHandler = useFormik({
    initialValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      travelOfficeId: "",
    },
    validationSchema: () => {
      return Yup.object({
        email: Yup.string().email("Invalid email address").required("Required"),
        password: Yup.string()
          .required("Required")
          .min(6, "Password must be at least 6 characters"),
        firstName: Yup.string().required("Required"),
        lastName: Yup.string().required("Required"),
        travelOfficeId: Yup.number().required("please select an agency"),
      });
    },
    onSubmit: (values, { resetForm }) => {
      uploadImage(userImage, setIsLoading, setApiError).then((id) => {
        console.log("checking the Image.", id); // Check if image is properly updated
        values["profilePhotoId"] = id ? id[0] : null;
        console.log("checking the values.", values); // Check if values are properly updated
        addUser(values, setIsLoading, handleUpdate).then(() => {
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
        scrollBehavior="inside"
        backdrop="blur"
        size="5xl"
      >
        <ModalContent>
          {(onClose) => (
            <form onSubmit={formHandler.handleSubmit}>
              <ModalHeader className="flex flex-col gap-1">
                Add new User
              </ModalHeader>
              <ModalBody className="flex flex-row items-center">
                <div className="w-1/2">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Input
                        id="firstName"
                        type="firstName"
                        label="First Name"
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.firstName}
                        isInvalid={
                          formHandler.errors.firstName &&
                          formHandler.touched.firstName
                        }
                        errorMessage={formHandler.errors.firstName}
                      />

                    </div>

                    <div>
                      <Input
                        id="lastName"
                        type="lastName"
                        label="lastName"
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.lastName}
                        isInvalid={
                          formHandler.errors.lastName &&
                          formHandler.touched.lastName
                        }
                        errorMessage={formHandler.errors.lastName}

                      />

                    </div>

                    <div>
                      <Select
                        label="Agency"
                        id="travelOfficeId"
                        placeholder="Select an agency"
                        value={formHandler.values.travelOfficeId}
                        onClick={handleUpdateAgencies}
                        onChange={formHandler.handleChange("travelOfficeId")}
                        isInvalid={
                          formHandler.errors.travelOfficeId &&
                          formHandler.touched.travelOfficeId
                        }
                        errorMessage={formHandler.errors.travelOfficeId}

                      >
                        {agencies.map(({ id, name }) => (
                          <SelectItem key={id} value={id}>
                            {name}
                          </SelectItem>
                        ))}
                      </Select>
                    </div>

                    <div>
                      <Input
                        id="email"
                        type="email"
                        label="email"
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.email}
                        isInvalid={
                          formHandler.errors.email && formHandler.touched.email
                        }
                        errorMessage={formHandler.errors.email}

                      />
                    </div>

                    <div className="col-span-2">
                      <Input
                        id="password"
                        label="password"
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.password}
                        isInvalid={
                          formHandler.errors.password &&
                          formHandler.touched.password
                        }
                        errorMessage={formHandler.errors.password}

                      />
                    </div>
                    <div className="col-span-2">
                      {apiError ? <Alert text={apiError} /> : ""}
                    </div>
                  </div>
                </div>
                <div className="w-1/2">
                  <ImagesUploader
                    files={userImage}
                    setFiles={setUserImage}
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
