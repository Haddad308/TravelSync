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
import { PlusIcon } from "../../core/components/icons/PlusIcon";
import * as Yup from "yup"; // For validation.
import { useFormik } from "formik";
import ImagesUploader from "../../core/components/ImageUploader/ImageUploader";
import { useState } from "react";
import { uploadImage } from "../../core/core.handlers";
import Alert from "../../core/components/Alert";
import { addService } from "../services.handlers";

export default function TransportationForm({ handleUpdate }) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [transportationImages, setTransportationImages] = useState([]);
  const [isLoading, setIsLoading] = useState("");
  const [apiError, setApiError] = useState("");

  const handleCloseModal = () => {
    formHandler.resetForm();
  };

  const formHandler = useFormik({
    initialValues: {
      service: {
        name: "",
        description: "",
        price: "",
        quantityAvailable: "",
        savings: "",
        isOffer: false,
        cancellationPolicy: "",
      },
      transportation: {
        type: "",
        description: "",
        departureAddress: "",
        arrivalAddress: "",
        departureTime: new Date().toISOString(),
        arrivalTime: new Date().toISOString(),
        departingDate: new Date().toISOString(),
        returningDate: new Date().toISOString(),
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
        transportation: Yup.object({
          type: Yup.string().required("Required"),
          description: Yup.string().min(3).max(250).required("Required"),
          departureAddress: Yup.string().min(3).max(250).required("Required"),
          arrivalAddress: Yup.string().min(3).max(60).required("Required"),
          departureTime: Yup.string(),
          arrivalTime: Yup.string(),
          departingDate: Yup.string(),
          returningDate: Yup.string(),
        }),
      });
    },

    onSubmit: async (values, { resetForm }) => {
      try {
        console.log("valuse for transportation:", values);
        let imageIds;
        if (transportationImages.length !== 0) {
          imageIds = await uploadImage(
            transportationImages,
            setIsLoading,
            setApiError,
          );
          values.service.imageIds = imageIds ? imageIds : [];
        }
        values.service.imageIds = imageIds ? imageIds : [];

        values.service.WholesalerId = 1;
        await addService(values, setIsLoading, handleUpdate, "transportations");
        onClose();
        resetForm();
      } catch (error) {
        setApiError(error.response.data?.message);
      }
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
        onClose={handleCloseModal}
        isDismissable={false}
        scrollBehavior="outside"
        backdrop="blur"
        size="5xl"
      >
        <ModalContent>
          {(onClose) => (
            <form onSubmit={formHandler.handleSubmit}>
              <ModalHeader className="flex flex-col gap-1">
                Add new Transportation Service
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
                        id="transportation.type"
                        name="transportation.type"
                        type="text"
                        label="Transportation Type"
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.transportation?.type}
                        isInvalid={
                          formHandler.errors.transportation?.type &&
                          formHandler.touched.transportation?.type
                        }
                        errorMessage={formHandler.errors.transportation?.type}
                      />
                    </div>

                    <div>
                      <Textarea
                        id="transportation.description"
                        name="transportation.description"
                        type="text"
                        label="Transportation Description"
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.transportation.description}
                        isInvalid={
                          formHandler.errors.transportation?.description &&
                          formHandler.touched.transportation?.description
                        }
                        errorMessage={
                          formHandler.errors.transportation?.description
                        }
                      />
                    </div>

                    <div>
                      <Input
                        id="transportation.departureAddress"
                        name="transportation.departureAddress"
                        type="text"
                        label="Departure Address"
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={
                          formHandler.values.transportation.departureAddress
                        }
                        isInvalid={
                          formHandler.errors.transportation?.departureAddress &&
                          formHandler.touched.transportation?.departureAddress
                        }
                        errorMessage={
                          formHandler.errors.transportation?.departureAddress
                        }
                      />
                    </div>

                    <div>
                      <Input
                        id="transportation.arrivalAddress"
                        name="transportation.arrivalAddress"
                        type="text"
                        label="Arrival Address"
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.transportation.arrivalAddress}
                        isInvalid={
                          formHandler.errors.transportation?.arrivalAddress &&
                          formHandler.touched.transportation?.arrivalAddress
                        }
                        errorMessage={
                          formHandler.errors.transportation?.arrivalAddress
                        }
                      />
                    </div>

                    <div>
                      <Input
                        id="transportation.departureTime"
                        name="transportation.departureTime"
                        type="text"
                        label="Departure Time"
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.transportation.departureTime}
                        isInvalid={
                          formHandler.errors.transportation?.departureTime &&
                          formHandler.touched.transportation?.departureTime
                        }
                        errorMessage={
                          formHandler.errors.transportation?.departureTime
                        }
                      />
                    </div>

                    <div>
                      <Input
                        id="transportation.arrivalTime"
                        name="transportation.arrivalTime"
                        type="text"
                        label="Arrival Time"
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.transportation.arrivalTime}
                        isInvalid={
                          formHandler.errors.transportation?.arrivalTime &&
                          formHandler.touched.transportation?.arrivalTime
                        }
                        errorMessage={
                          formHandler.errors.transportation?.arrivalTime
                        }
                      />
                    </div>

                    <div>
                      <Input
                        id="transportation.departingDate"
                        name="transportation.departingDate"
                        type="text"
                        label="Departing Date"
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.transportation.departingDate}
                        isInvalid={
                          formHandler.errors.transportation?.departingDate &&
                          formHandler.touched.transportation?.departingDate
                        }
                        errorMessage={
                          formHandler.errors.transportation?.departingDate
                        }
                      />
                    </div>
                    <div>
                      <Input
                        id="transportation.returningDate"
                        name="transportation.returningDate"
                        type="text"
                        label="Returning Date"
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.transportation.returningDate}
                        isInvalid={
                          formHandler.errors.transportation?.returningDate &&
                          formHandler.touched.transportation?.returningDate
                        }
                        errorMessage={
                          formHandler.errors.transportation?.returningDate
                        }
                      />
                    </div>

                    <div>
                      <Checkbox
                        id="serviceIsOffer"
                        name="service.isOffer"
                        label="Is Offer"
                        onChange={formHandler.handleChange("service.isOffer")}
                        value={formHandler.values.service?.isOffer}
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
                    files={transportationImages}
                    setFiles={setTransportationImages}
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
