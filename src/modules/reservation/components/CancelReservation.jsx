import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Textarea } from "@nextui-org/react";
import * as Yup from "yup"; // For validation.
import { useFormik } from "formik";
import { cancelReservation } from "../reservation.handlers";
import { useState } from "react";

export default function CancelReservation({ id, handleUpdate }) {
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
    const [isLoading, setIsLoading] = useState("");

    const formHandler = useFormik({
        initialValues: {
            cancelReason: "",
        },
        validationSchema: () => {
            return Yup.object({
                cancelReason: Yup.string().required("Required"),
            });
        },

        onSubmit: (values, { resetForm }) => {
            cancelReservation(setIsLoading, values, id, handleUpdate).then(() => {
                onClose();
                resetForm();
            });
        },
    });

    return (
        <>
            <Button onPress={onOpen} color="danger" variant="flat" className="font-semibold"  >Cancel</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <form onSubmit={formHandler.handleSubmit}>
                            <ModalHeader className="flex flex-col gap-1">Cancel reservation</ModalHeader>
                            <ModalBody>
                                Are you sure you wany to cancel this reservation?
                                <div>
                                    <Textarea
                                        id="cancelReason"
                                        type="cancelReason"
                                        label="Cancel reason"
                                        placeholder="Please leave a comment with the reason of cancelation."
                                        onChange={formHandler.handleChange}
                                        onBlur={formHandler.handleBlur}
                                        value={formHandler.values.cancelReason}
                                        isInvalid={formHandler.touched.cancelReason && formHandler.errors.cancelReason}
                                        errorMessage="Please write the reason"
                                    />
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Cancel
                                </Button>
                                <Button color="danger" type="submit" isLoading={isLoading}>
                                    Confirm
                                </Button>
                            </ModalFooter>
                        </form>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
