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

export default function FlightsForm({ handleUpdate }) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [flightImages, setFlightImages] = useState([]);
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
      flight: {
        airline: "",
        departureAddress: "",
        departureCity: "",
        arrivalAddress: "",
        arrivalCity: "",
        departureTime: new Date().toISOString(),
        arrivalTime: new Date().toISOString(),
        seatType: "",
        description: "",
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
        flight: Yup.object({
          airline: Yup.string().min(3).max(60).required("Required"),
          departureAddress: Yup.string().min(3).max(250).required("Required"),
          departureCity: Yup.string().min(3).max(60).required("Required"),
          arrivalAddress: Yup.string().min(3).max(250).required("Required"),
          arrivalCity: Yup.string().min(3).max(60).required("Required"),
          departureTime: Yup.string().required("Required"),
          arrivalTime: Yup.string().required("Required"),
          seatType: Yup.string().required("Required"),
        }),
      });
    },

    onSubmit: async (values, { resetForm }) => {
      let imageIds;
      if (flightImages.length !== 0) {
        imageIds = await uploadImage(flightImages, setIsLoading, setApiError);
        values.service.imageIds = imageIds ? imageIds : [];
      }
      values.service.imageIds = imageIds ? imageIds : [];

      values.service.WholesalerId = 1;
      await addService(values, setIsLoading, handleUpdate, "flights");
      onClose();
      resetForm();
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
                Add new Flight Service
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
                        id="flight.airline"
                        name="flight.airline"
                        type="text"
                        label="Airline"
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.airline}
                        isInvalid={
                          formHandler.errors.flight?.airline &&
                          formHandler.touched.flight?.airline
                        }
                        errorMessage={formHandler.errors.flight?.airline}
                      />
                    </div>

                    <div>
                      <Input
                        id="flight.seatType"
                        name="flight.seatType"
                        type="text"
                        label="Seat Type"
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.flight?.seatType}
                        isInvalid={
                          formHandler.errors.flight?.seatType &&
                          formHandler.touched.flight?.seatType
                        }
                        errorMessage={formHandler.errors.flight?.seatType}
                      />
                    </div>

                    <div>
                      <Input
                        id="flight.departureAddress"
                        name="flight.departureAddress"
                        type="text"
                        label="Departure Address"
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.flight.departureAddress}
                        isInvalid={
                          formHandler.errors.flight?.departureAddress &&
                          formHandler.touched.flight?.departureAddress
                        }
                        errorMessage={
                          formHandler.errors.flight?.departureAddress
                        }
                      />
                    </div>

                    <div>
                      <Input
                        id="flight.departureCity"
                        name="flight.departureCity"
                        type="text"
                        label="Departure City"
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.flight.departureCity}
                        isInvalid={
                          formHandler.errors.flight?.departureCity &&
                          formHandler.touched.flight?.departureCity
                        }
                        errorMessage={formHandler.errors.flight?.departureCity}
                      />
                    </div>

                    <div>
                      <Input
                        id="flight.arrivalAddress"
                        name="flight.arrivalAddress"
                        type="text"
                        label="Arrival Address"
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.flight.arrivalAddress}
                        isInvalid={
                          formHandler.errors.flight?.arrivalAddress &&
                          formHandler.touched.flight?.arrivalAddress
                        }
                        errorMessage={formHandler.errors.flight?.arrivalAddress}
                      />
                    </div>

                    <div>
                      <Input
                        id="flight.arrivalCity"
                        name="flight.arrivalCity"
                        type="text"
                        label="Arrival City"
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.flight.arrivalCity}
                        isInvalid={
                          formHandler.errors.flight?.arrivalCity &&
                          formHandler.touched.flight?.arrivalCity
                        }
                        errorMessage={formHandler.errors.flight?.arrivalCity}
                      />
                    </div>

                    <div>
                      {/* <DatePicker
                        id="flight.departureTime"
                        name="flight.departureTime"
                        className="max-w-lg"
                        granularity="minute"
                        label="Departure Date"
                        onChange={formHandler.handleChange}
                        // onBlur={formHandler.handleBlur}
                        value={formHandler.values.flight.departureTime}
                        // placeholderValue={now("AST")}
                      />
                      {console.log(
                        "formHandler.values.flight.departureTime: ",
                        formHandler.values.flight?.departureTime,
                      )} */}
                      <Input
                        id="flight.departureTime"
                        name="flight.departureTime"
                        type="text"
                        label="Departure Time"
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.flight.departureTime}
                        isInvalid={
                          formHandler.errors.flight?.departureTime &&
                          formHandler.touched.flight?.departureTime
                        }
                        errorMessage={formHandler.errors.flight?.departureTime}
                      />
                    </div>

                    <div>
                      <Input
                        id="flight.arrivalTime"
                        name="flight.arrivalTime"
                        type="text"
                        label="Arrival Time"
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.flight.arrivalTime}
                        isInvalid={
                          formHandler.errors.flight?.arrivalTime &&
                          formHandler.touched.flight?.arrivalTime
                        }
                        errorMessage={formHandler.errors.flight?.arrivalTime}
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
                      <Checkbox
                        id="serviceIsOffer"
                        name="flight.arrivalTime"
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


                    <div className="col-span-2">
                      {apiError ? <Alert text={apiError} /> : ""}
                    </div>
                  </div>
                </div>
                <div className="w-1/2">
                  <ImagesUploader
                    files={flightImages}
                    setFiles={setFlightImages}
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
