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

  const formHandler = useFormik({
    initialValues: {
      service: {
        name: "",
        // type: "flights",
        description: "",
        price: 0,
        quantityAvailable: 0,
        savings: 0,
        isOffer: false,
        cancellationPolicy: "",
      },
      flight: {
        airline: "",
        departureAddress: "",
        departureCity: "",
        arrivalAddress: "",
        arrivalCity: "",
        departureTime: "",
        arrivalTime: "",
        seatType: "",
        description: "",
      },
    },

    validationSchema: () => {
      return Yup.object({
        service: Yup.object({
          name: Yup.string().min(5).max(500).required("Required"),
          // type: Yup.string().required("Required"),
          description: Yup.string().required("Required"),
          price: Yup.number().max(999999).min(0).required("Required"),
          quantityAvailable: Yup.number().min(0).max(9999).required("Required"),
          savings: Yup.number().required("Required"),
          isOffer: Yup.boolean().required("Required"),
          cancellationPolicy: Yup.string().required("Required"),
        }),
        flight: Yup.object({
          airline: Yup.string().required("Required"),
          departureAddress: Yup.string().required("Required"),
          departureCity: Yup.string().required("Required"),
          arrivalAddress: Yup.string().required("Required"),
          arrivalCity: Yup.string().required("Required"),
          departureTime: Yup.string().required("Required"),
          arrivalTime: Yup.string().required("Required"),
          seatType: Yup.string().required("Required"),
        }),
      });
    },

    onSubmit: async (values, { resetForm }) => {
      console.log("cancellationPolicy:", values.service.cancellationPolicy);
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

      // console.log("values:", values);
      // uploadImage(flightImages, setIsLoading, setApiError).then((ids) => {
      //   console.log("checking the Image.", ids); // Check if image is properly updated
      //   values["service"]["WholesalerId"] = 1;
      //   values["service"]["imageIds"] = ids ? ids : [];
      //   console.log("checking the values.", values); // Check if values are properly updated
      //   addService(values, setIsLoading, handleUpdate, "flights").then(() => {
      //     onClose();
      //     resetForm();
      //   });
      // });
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
                        variant="bordered"
                        labelPlacement="outside"
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.service.name}
                      />
                      {formHandler.touched.service?.name &&
                      formHandler.errors.service?.name ? (
                        <div className="text-red-600">
                          {formHandler.errors.service?.name}
                        </div>
                      ) : null}
                    </div>

                    {/* <div>
                      <Input
                        id="service.type"
                        type="type"
                        label="Service Type"
                        name="service.type"
                        variant="bordered"
                        labelPlacement="outside"
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.service.type}
                      />
                      {formHandler.touched.service?.type &&
                      formHandler.errors.service?.type ? (
                        <div className="text-red-600">
                          {formHandler.errors.service?.type}
                        </div>
                      ) : null}
                    </div> */}
                    <div>
                      <Textarea
                        id="service.description"
                        name="service.description"
                        type="text"
                        label="Description"
                        variant="bordered"
                        labelPlacement="outside"
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.service.description}
                      />
                      {formHandler.touched.service?.description &&
                      formHandler.errors.service?.description ? (
                        <div className="text-red-600">
                          {formHandler.errors.service?.description}
                        </div>
                      ) : null}
                    </div>
                    <div>
                      <Input
                        id="service.price"
                        name="service.price"
                        type="number"
                        label="Price"
                        variant="bordered"
                        placeholder="0.00"
                        labelPlacement="outside"
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
                      />
                      {formHandler.touched.service?.price &&
                      formHandler.errors.service?.price ? (
                        <div className="text-red-600">
                          {formHandler.errors.service?.price}
                        </div>
                      ) : null}
                    </div>
                    <div>
                      <Input
                        id="service.savings"
                        name="service.savings"
                        type="number"
                        label="savings"
                        variant="bordered"
                        placeholder="0.00"
                        labelPlacement="outside"
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
                      />
                      {formHandler.touched.service?.savings &&
                      formHandler.errors.service?.savings ? (
                        <div className="text-red-600">
                          {formHandler.errors.service?.savings}
                        </div>
                      ) : null}
                    </div>

                    <div>
                      <Input
                        id="service.quantityAvailable"
                        name="service.quantityAvailable"
                        type="number"
                        label="Quantity Available"
                        variant="bordered"
                        labelPlacement="outside"
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
                      />
                      {formHandler.touched.service?.quantityAvailable &&
                      formHandler.errors.service?.quantityAvailable ? (
                        <div className="text-red-600">
                          {formHandler.errors.service?.quantityAvailable}
                        </div>
                      ) : null}
                    </div>

                    <div>
                      <Input
                        id="service.cancellationPolicy"
                        name="service.cancellationPolicy"
                        type="text"
                        label="Cancelation Policy"
                        variant="bordered"
                        labelPlacement="outside"
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.service.cancellationPolicy}
                      />
                      {formHandler.touched.service?.cancellationPolicy &&
                      formHandler.errors.service?.cancellationPolicy ? (
                        <div className="text-red-600">
                          {formHandler.errors.service?.cancellationPolicy}
                        </div>
                      ) : null}
                    </div>

                    <div>
                      <Input
                        id="flight.airline"
                        name="flight.airline"
                        type="text"
                        label="Airline"
                        variant="bordered"
                        labelPlacement="outside"
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.airline}
                      />
                      {formHandler.touched.flight?.airline &&
                      formHandler.errors.flight?.airline ? (
                        <div className="text-red-600">
                          {formHandler.errors.flight?.airline}
                        </div>
                      ) : null}
                    </div>

                    <div>
                      <Input
                        id="flight.seatType"
                        name="flight.seatType"
                        type="text"
                        label="Seat Type"
                        variant="bordered"
                        labelPlacement="outside"
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.seatType}
                      />
                      {formHandler.touched.flight?.seatType &&
                      formHandler.errors.flight?.seatType ? (
                        <div className="text-red-600">
                          {formHandler.errors.flight?.seatType}
                        </div>
                      ) : null}
                    </div>

                    <div>
                      <Input
                        id="flight.departureAddress"
                        name="flight.departureAddress"
                        type="text"
                        label="Departure Address"
                        variant="bordered"
                        labelPlacement="outside"
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.flight.departureAddress}
                      />
                      {formHandler.touched.flight?.departureAddress &&
                      formHandler.errors.flight?.departureAddress ? (
                        <div className="text-red-600">
                          {formHandler.errors.flight?.departureAddress}
                        </div>
                      ) : null}
                    </div>

                    <div>
                      <Input
                        id="flight.departureCity"
                        name="flight.departureCity"
                        type="text"
                        label="Departure City"
                        variant="bordered"
                        labelPlacement="outside"
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.flight.departureCity}
                      />
                      {formHandler.touched.flight?.departureCity &&
                      formHandler.errors.flight?.departureCity ? (
                        <div className="text-red-600">
                          {formHandler.errors.flight?.departureCity}
                        </div>
                      ) : null}
                    </div>

                    <div>
                      <Input
                        id="flight.arrivalAddress"
                        name="flight.arrivalAddress"
                        type="text"
                        label="Arrival Address"
                        variant="bordered"
                        labelPlacement="outside"
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.flight.arrivalAddress}
                      />

                      {formHandler.touched.flight?.arrivalAddress &&
                      formHandler.errors.flight?.arrivalAddress ? (
                        <div className="text-red-600">
                          {formHandler.errors.flight?.arrivalAddress}
                        </div>
                      ) : null}
                    </div>

                    <div>
                      <Input
                        id="flight.arrivalCity"
                        name="flight.arrivalCity"
                        type="text"
                        label="Arrival City"
                        variant="bordered"
                        labelPlacement="outside"
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.flight.arrivalCity}
                      />
                      {formHandler.touched.flight?.arrivalCity &&
                      formHandler.errors.flight?.arrivalCity ? (
                        <div className="text-red-600">
                          {formHandler.errors.flight?.arrivalCity}
                        </div>
                      ) : null}
                    </div>

                    <div>
                      <Input
                        id="flight.departureTime"
                        name="flight.departureTime"
                        type="text"
                        label="Departure Time"
                        variant="bordered"
                        labelPlacement="outside"
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.flight.departureTime}
                      />
                      {formHandler.touched.flight?.departureTime &&
                      formHandler.errors.flight?.departureTime ? (
                        <div className="text-red-600">
                          {formHandler.errors.flight?.departureTime}
                        </div>
                      ) : null}
                    </div>

                    <div>
                      <Input
                        id="flight.arrivalTime"
                        name="flight.arrivalTime"
                        type="text"
                        label="Arrival Time"
                        variant="bordered"
                        labelPlacement="outside"
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.flight.arrivalTime}
                      />
                      {formHandler.touched.flight?.arrivalTime &&
                      formHandler.errors.flight?.arrivalTime ? (
                        <div className="text-red-600">
                          {formHandler.errors.flight?.arrivalTime}
                        </div>
                      ) : null}
                    </div>

                    <div>
                      <Checkbox
                        id="serviceIsOffer"
                        label="Is Offer"
                        onChange={formHandler.handleChange("service.isOffer")}
                        value={formHandler.values.service?.isOffer}
                      >
                        Is Offer
                      </Checkbox>
                    </div>

                    {/* <div>

                    
                   

                    

                   
                    <div>
                      <Checkbox
                        id="serviceIsOffer"
                        label="Service Is Offer"
                        onChange={formHandler.handleChange('serviceIsOffer')}
                        value={formHandler.values.serviceIsOffer}
                      >
                        Is Offer
                      </Checkbox>
                    </div> */}

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
