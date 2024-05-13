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
  Select,
  SelectItem,
} from "@nextui-org/react";
import * as Yup from "yup";
import { useFormik } from "formik";
import ImagesUploader from "../../core/components/ImageUploader/ImageUploader";
import { useEffect, useState } from "react";
import { uploadImage } from "../../core/core.handlers";
import Alert from "../../core/components/Alert";
import { editService, getService } from "../services.handlers";
import { EditIcon } from "../../core/components/icons/EditIcon";

export default function RoomsFormEdit({ handleUpdate, roomID, data }) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [roomImages, setRoomImages] = useState([]);
  const [isLoading, setIsLoading] = useState("");
  const [apiError, setApiError] = useState("");
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    getService(setHotels, setIsLoading, "hotels");
  }, []);

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
      room: {
        type: data?.room?.type,
        roomArea: data?.room?.roomArea,
        numberOfBeds: data?.room?.numberOfBeds,
        numberOfSleeps: data?.room?.numberOfSleeps,
        hotelId: data?.room?.hotelId,
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
        room: Yup.object({
          type: Yup.string().required("Required"),
          roomArea: Yup.number().min(0).max(9999).required("Required"),
          numberOfBeds: Yup.number().min(0).max(9999).required("Required"),
          numberOfSleeps: Yup.number().min(0).max(9999).required("Required"),
          hotelId: Yup.number().required("Required"),
        }),
      });
    },

    onSubmit: async (values, { resetForm }) => {
      console.log("values:", values);
      if (roomImages.length !== 0) {
        const imageIds = await uploadImage(
          roomImages,
          setIsLoading,
          setApiError,
        );
        values.service.imageIds = imageIds ? imageIds : [];
      }
      values.service.WholesalerId = 1;
      await editService(
        values,
        roomID,
        setIsLoading,
        handleUpdate,
        "hotel-rooms",
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
                Edit Room Service
              </ModalHeader>
              <ModalBody className="flex flex-row items-center">
                <div className="w-1/2">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Select
                        label="Agency"
                        id="room.hotelId"
                        placeholder="Select an agency"
                        selectedKeys={[formHandler.values.room.hotelId]}
                        onChange={formHandler.handleChange("room.hotelId")}
                        isInvalid={
                          formHandler.errors.room?.hotelId &&
                          formHandler.touched.room?.hotelId
                        }
                        errorMessage={formHandler.errors.room?.hotelId}
                      >
                        {hotels.map(({ id, name }) => (
                          <SelectItem key={id} value={id}>
                            {name}
                          </SelectItem>
                        ))}
                      </Select>
                    </div>
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
                        id="room.type"
                        name="room.type"
                        type="text"
                        label="Room Type"
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.room?.type}
                        isInvalid={
                          formHandler.errors.room?.type &&
                          formHandler.touched.room?.type
                        }
                        errorMessage={formHandler.errors.room?.type}
                      />
                    </div>

                    <div>
                      <Input
                        id="room.roomArea"
                        name="room.roomArea"
                        type="number"
                        label="Room Area"
                        radius="lg"
                        onChange={(e) => {
                          if (e.target.value === "") {
                            formHandler.setFieldValue("room.roomArea", "");
                            return;
                          }

                          const value = Math.max(0, parseFloat(e.target.value));
                          formHandler.setFieldValue("room.roomArea", value);
                        }}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.room.roomArea}
                        isInvalid={
                          formHandler.errors.room?.roomArea &&
                          formHandler.touched.room?.roomArea
                        }
                        errorMessage={formHandler.errors.room?.roomArea}
                      />
                    </div>
                    <div>
                      <Input
                        id="room.numberOfBeds"
                        name="room.numberOfBeds"
                        type="number"
                        label="Number of Beds"
                        radius="lg"
                        onChange={(e) => {
                          if (e.target.value === "") {
                            formHandler.setFieldValue("room.numberOfBeds", "");
                            return;
                          }

                          const value = Math.max(0, parseFloat(e.target.value));
                          formHandler.setFieldValue("room.numberOfBeds", value);
                        }}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.room.numberOfBeds}
                        isInvalid={
                          formHandler.errors.room?.numberOfBeds &&
                          formHandler.touched.room?.numberOfBeds
                        }
                        errorMessage={formHandler.errors.room?.numberOfBeds}
                      />
                    </div>
                    <div>
                      <Input
                        id="room.numberOfSleeps"
                        name="room.numberOfSleeps"
                        type="number"
                        label="Number of Sleeps"
                        radius="lg"
                        onChange={(e) => {
                          if (e.target.value === "") {
                            formHandler.setFieldValue(
                              "room.numberOfSleeps",
                              "",
                            );
                            return;
                          }

                          const value = Math.max(0, parseFloat(e.target.value));
                          formHandler.setFieldValue(
                            "room.numberOfSleeps",
                            value,
                          );
                        }}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.room.numberOfSleeps}
                        isInvalid={
                          formHandler.errors.room?.numberOfSleeps &&
                          formHandler.touched.room?.numberOfSleeps
                        }
                        errorMessage={formHandler.errors.room?.numberOfSleeps}
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
                    files={roomImages}
                    setFiles={setRoomImages}
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
