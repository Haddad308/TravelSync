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
  Checkbox,
  Textarea,
} from "@nextui-org/react";
import * as Yup from "yup"; // For validation.
import { useFormik } from "formik";
import ImagesUploader from "../../core/components/ImageUploader/ImageUploader";
import { useState } from "react";
import { uploadImage } from "../../core/core.handlers";
import Alert from "../../core/components/Alert";
import { editService } from "../services.handlers";
import { EditIcon } from "../../core/components/icons/EditIcon";

export default function CruisesFormEdit({ handleUpdate, cruiseID, data }) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [cruiseImages, setcruiseImages] = useState([]);
  const [isLoading, setIsLoading] = useState("");
  const [apiError, setApiError] = useState("");

  console.log("data", data);

  const formHandler = useFormik({
    initialValues: {
      service: {
        name: data?.name,
        description: data?.description,
        price: data?.price,
        quantityAvailable: data?.quantityAvailable,
        savings: data?.savings,
        isOffer: data?.isOffer,
        cancellationPolicy: data?.cancellationPolicy,
      },
      cruise: {
        departureAddress: data?.cruise?.departureAddress,
        departureCity: data?.cruise?.departureCity,
        departureCountry: data?.cruise?.departureCountry,
        departureTime: data?.cruise?.departureTime,
        endTime: data?.cruise?.endTime,
        cabinType: data?.cruise?.cabinType,
      },
    },

    validationSchema: () => {
      return Yup.object({
        service: Yup.object({
          name: Yup.string().min(5).max(500).required("Required"),
          description: Yup.string().required("Required"),
          price: Yup.number().max(999999).min(0).required("Required"),
          quantityAvailable: Yup.number()
            .min(0)
            .max(9999)
            .required("Required")
            .integer("Must be a number"),
          savings: Yup.number().min(0).max(9999).required("Required"),
          isOffer: Yup.boolean().required("Required"),
          cancellationPolicy: Yup.string().min(2).max(500).required("Required"),
        }),
        cruise: Yup.object({
          departureAddress: Yup.string().min(3).max(250).required("Required"),
          departureCity: Yup.string().min(3).max(60).required("Required"),
          departureCountry: Yup.string().min(3).max(60).required("Required"),
          departureTime: Yup.string().required("Required"),
          endTime: Yup.string().required("Required"),
          cabinType: Yup.string().required("Required"),
        }),
      });
    },

    onSubmit: async (values, { resetForm }) => {
      console.log("values:", values);
      if (cruiseImages.length !== 0) {
        const imageIds = await uploadImage(
          cruiseImages,
          setIsLoading,
          setApiError,
        );
        values.service.imageIds = imageIds ? imageIds : [];
      }
      values.service.WholesalerId = 1;
      await editService(
        values,
        cruiseID,
        setIsLoading,
        handleUpdate,
        "cruises",
      );
      onClose();
      resetForm();
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
        scrollBehavior="outside"
        backdrop="blur"
        size="5xl"
      >
        <ModalContent>
          {(onClose) => (
            <form onSubmit={formHandler.handleSubmit}>
              <ModalHeader className="flex flex-col gap-1">
                Edit Cruise Service
              </ModalHeader>
              <ModalBody className="flex flex-row items-center">
                <div className="w-1/2">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Input
                        id="service.name"
                        type="text"
                        name="service.name"
                        label="Title"
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.service.name}
                        isInvalid={
                          formHandler.errors.service?.name &&
                          formHandler.touched.service?.name
                        }
                        errorMessage={formHandler.errors.service?.name}
                      />
                    </div>

                    <div>
                      <Textarea
                        id="service.description"
                        name="service.description"
                        type="text"
                        label="Description"
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.service.description}
                        isInvalid={
                          formHandler.errors.service?.description &&
                          formHandler.touched.service?.description
                        }
                        errorMessage={formHandler.errors.service?.description}
                      />
                    </div>
                    <div>
                      <Input
                        id="service.price"
                        name="service.price"
                        type="number"
                        label="Price"
                        placeholder="0.00"
                        radius="lg"
                        onChange={(e) => {
                          if (e.target.value === "") {
                            formHandler.setFieldValue("service.price", "");
                            return;
                          }

                          const value = Math.max(0, parseFloat(e.target.value));
                          formHandler.setFieldValue("service.price", value);
                        }}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.service?.price}
                        startContent={
                          <div className="pointer-events-none flex items-center">
                            <span className="text-default-400 text-small">
                              $
                            </span>
                          </div>
                        }
                        isInvalid={
                          formHandler.errors.service?.price &&
                          formHandler.touched.service?.price
                        }
                        errorMessage={formHandler.errors.service?.price}
                      />
                    </div>
                    <div>
                      <Input
                        id="service.savings"
                        name="service.savings"
                        type="number"
                        label="savings"
                        placeholder="0.00"
                        radius="lg"
                        onChange={(e) => {
                          if (e.target.value === "") {
                            formHandler.setFieldValue("service.savings", "");
                            return;
                          }

                          const value = Math.max(0, parseFloat(e.target.value));
                          formHandler.setFieldValue("service.savings", value);
                        }}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.service.savings}
                        startContent={
                          <div className="pointer-events-none flex items-center">
                            <span className="text-default-400 text-small">
                              $
                            </span>
                          </div>
                        }
                        isInvalid={
                          formHandler.errors.service?.savings &&
                          formHandler.touched.service?.savings
                        }
                        errorMessage={formHandler.errors.service?.savings}
                      />
                    </div>

                    <div>
                      <Input
                        id="service.quantityAvailable"
                        name="service.quantityAvailable"
                        type="number"
                        label="Quantity Available"
                        radius="lg"
                        onChange={(e) => {
                          if (e.target.value === "") {
                            formHandler.setFieldValue(
                              "service.quantityAvailable",
                              "",
                            );
                            return;
                          }

                          const value = Math.max(0, parseFloat(e.target.value));
                          formHandler.setFieldValue(
                            "service.quantityAvailable",
                            value,
                          );
                        }}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.service.quantityAvailable}
                        isInvalid={
                          formHandler.errors.service?.quantityAvailable &&
                          formHandler.touched.service?.quantityAvailable
                        }
                        errorMessage={
                          formHandler.errors.service?.quantityAvailable
                        }
                      />
                    </div>

                    <div>
                      <Input
                        id="service.cancellationPolicy"
                        name="service.cancellationPolicy"
                        type="text"
                        label="Cancelation Policy"
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.service.cancellationPolicy}
                        isInvalid={
                          formHandler.errors.service?.cancellationPolicy &&
                          formHandler.touched.service?.cancellationPolicy
                        }
                        errorMessage={
                          formHandler.errors.service?.cancellationPolicy
                        }
                      />
                    </div>

                    <div>
                      <Input
                        id="cruise.cabinType"
                        name="cruise.cabinType"
                        type="text"
                        label="Seat Type"
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.cruise?.cabinType}
                        isInvalid={
                          formHandler.errors.cruise?.cabinType &&
                          formHandler.touched.cruise?.cabinType
                        }
                        errorMessage={formHandler.errors.cruise?.cabinType}
                      />
                    </div>

                    <div>
                      <Input
                        id="cruise.departureAddress"
                        name="cruise.departureAddress"
                        type="text"
                        label="Departure Address"
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.cruise.departureAddress}
                        isInvalid={
                          formHandler.errors.cruise?.departureAddress &&
                          formHandler.touched.cruise?.departureAddress
                        }
                        errorMessage={
                          formHandler.errors.cruise?.departureAddress
                        }
                      />
                    </div>

                    <div>
                      <Input
                        id="cruise.departureCity"
                        name="cruise.departureCity"
                        type="text"
                        label="Departure City"
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.cruise.departureCity}
                        isInvalid={
                          formHandler.errors.cruise?.departureCity &&
                          formHandler.touched.cruise?.departureCity
                        }
                        errorMessage={formHandler.errors.cruise?.departureCity}
                      />
                    </div>

                    <div>
                      <Input
                        id="cruise.departureCountry"
                        name="cruise.departureCountry"
                        type="text"
                        label="Arrival City"
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.cruise.departureCountry}
                        isInvalid={
                          formHandler.errors.cruise?.departureCountry &&
                          formHandler.touched.cruise?.departureCountry
                        }
                        errorMessage={
                          formHandler.errors.cruise?.departureCountry
                        }
                      />
                    </div>

                    <div>
                      <Input
                        id="cruise.departureTime"
                        name="cruise.departureTime"
                        type="text"
                        label="Departure Time"
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.cruise.departureTime}
                        isInvalid={
                          formHandler.errors.cruise?.departureTime &&
                          formHandler.touched.cruise?.departureTime
                        }
                        errorMessage={formHandler.errors.cruise?.departureTime}
                      />
                    </div>

                    <div>
                      <Input
                        id="cruise.endTime"
                        name="cruise.endTime"
                        type="text"
                        label="Arrival Time"
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.cruise.endTime}
                        isInvalid={
                          formHandler.errors.cruise?.endTime &&
                          formHandler.touched.cruise?.endTime
                        }
                        errorMessage={formHandler.errors.cruise?.endTime}
                      />
                    </div>

                    <div>
                      <Checkbox
                        id="serviceIsOffer"
                        label="Is Offer"
                        onChange={formHandler.handleChange("service.isOffer")}
                        value={formHandler.values.service?.isOffer}
                        isSelected={formHandler.values.service.isOffer}
                        isInvalid={
                          formHandler.errors.service?.isOffer &&
                          formHandler.touched.service?.isOffer
                        }
                        errorMessage={formHandler.errors.service?.isOffer}
                      >
                        Is Offer
                      </Checkbox>
                    </div>

                    <div className="col-span-2">
                      {apiError ? <Alert text={apiError} /> : ""}
                    </div>
                  </div>
                </div>
                <div className="w-1/2">
                  <ImagesUploader
                    files={cruiseImages}
                    setFiles={setcruiseImages}
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
                  onclick={() => console.log("clicked")}
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
