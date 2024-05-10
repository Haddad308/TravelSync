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

export default function SafariForm({ handleUpdate }) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [safariImages, setSafariImages] = useState([]);
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
      safari: {
        address: "",
        city: "",
        country: "",
        startTime: new Date().toISOString(),
        endTime: new Date().toISOString(),
        includes: "",
        excludes: "",
        days: "",
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
        safari: Yup.object({
          address: Yup.string().min(3).max(250).required("Required"),
          city: Yup.string().min(3).max(60).required("Required"),
          country: Yup.string().min(3).max(60).required("Required"),
          startTime: Yup.string().required("Required"),
          endTime: Yup.string().required("Required"),
          includes: Yup.string().min(2).max(2000).required("Required"),
          excludes: Yup.string().min(2).max(2000).required("Required"),
          days: Yup.number().max(999999).min(0).required("Required"),
        }),
      });
    },

    onSubmit: async (values, { resetForm }) => {
      console.log(values);
      try {
        let imageIds;
        if (safariImages.length !== 0) {
          imageIds = await uploadImage(safariImages, setIsLoading, setApiError);
          values.service.imageIds = imageIds ? imageIds : [];
        }
        values.service.imageIds = imageIds ? imageIds : [];

        values.service.WholesalerId = 1;
        await addService(values, setIsLoading, handleUpdate, "safari");
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
                Add new Safari Service
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
                        id="safari.address"
                        name="safari.address"
                        type="text"
                        label="Address"
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.safari.address}
                        isInvalid={
                          formHandler.errors.safari?.address &&
                          formHandler.touched.safari?.address
                        }
                        errorMessage={formHandler.errors.safari?.address}
                      />
                    </div>

                    <div>
                      <Input
                        id="safari.city"
                        name="safari.city"
                        type="text"
                        label="City"
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.safari.city}
                        isInvalid={
                          formHandler.errors.safari?.city &&
                          formHandler.touched.safari?.city
                        }
                        errorMessage={formHandler.errors.safari?.city}
                      />
                    </div>

                    <div>
                      <Input
                        id="safari.country"
                        name="safari.country"
                        type="text"
                        label="Country"
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.safari.country}
                        isInvalid={
                          formHandler.errors.safari?.country &&
                          formHandler.touched.safari?.country
                        }
                        errorMessage={formHandler.errors.safari?.country}
                      />
                    </div>

                    <div>
                      <Input
                        id="safari.startTime"
                        name="safari.startTime"
                        type="text"
                        label="Start Time"
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.safari.startTime}
                        isInvalid={
                          formHandler.errors.safari?.startTime &&
                          formHandler.touched.safari?.startTime
                        }
                        errorMessage={formHandler.errors.safari?.startTime}
                      />
                    </div>

                    <div>
                      <Input
                        id="safari.endTime"
                        name="safari.endTime"
                        type="text"
                        label="End Time"
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.safari.endTime}
                        isInvalid={
                          formHandler.errors.safari?.endTime &&
                          formHandler.touched.safari?.endTime
                        }
                        errorMessage={formHandler.errors.safari?.endTime}
                      />
                    </div>
                    <div>
                      <Input
                        id="safari.days"
                        name="safari.days"
                        type="number"
                        label="Number of days"
                        radius="lg"
                        onChange={(e) => {
                          if (e.target.value === "") {
                            formHandler.setFieldValue("safari.days", "");
                            return;
                          }

                          const value = Math.max(0, parseFloat(e.target.value));
                          formHandler.setFieldValue("safari.days", value);
                        }}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.safari.days}
                        isInvalid={
                          formHandler.errors.safari?.days &&
                          formHandler.touched.safari?.days
                        }
                        errorMessage={formHandler.errors.safari?.days}
                      />
                    </div>
                    <div>
                      <Textarea
                        id="safari.includes"
                        name="safari.includes"
                        type="text"
                        label="Includes"
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.safari.includes}
                        isInvalid={
                          formHandler.errors.safari?.includes &&
                          formHandler.touched.safari?.includes
                        }
                        errorMessage={formHandler.errors.safari?.includes}
                      />
                    </div>

                    <div>
                      <Textarea
                        id="safari.excludes"
                        name="safari.excludes"
                        type="text"
                        label="Excludes"
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.safari.excludes}
                        isInvalid={
                          formHandler.errors.safari?.excludes &&
                          formHandler.touched.safari?.excludes
                        }
                        errorMessage={formHandler.errors.safari?.excludes}
                      />
                    </div>

                    <div>
                      <Checkbox
                        id="serviceIsOffer"
                        name="safari.endTime"
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
                    files={safariImages}
                    setFiles={setSafariImages}
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
