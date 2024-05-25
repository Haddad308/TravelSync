import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Textarea } from "@nextui-org/react";
import * as Yup from "yup"; // For validation.
import { useFormik } from "formik";
import { requestAction } from "../reservation.handlers";
import { useState } from "react";

export default function ActionRequired({ id, handleUpdate }) {
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
    const [isLoading, setIsLoading] = useState("");

    const formHandler = useFormik({
        initialValues: {
            comment: "",
        },
        validationSchema: () => {
            return Yup.object({
                comment: Yup.string().required("Required"),
            });
        },

        onSubmit: (values, { resetForm }) => {
            requestAction(setIsLoading, values, id, handleUpdate).then(() => {
                onClose();
                resetForm();
            });
        },
    });

    return (
        <>
            <Button onPress={onOpen} color="secondary" variant="flat">Change Request</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <form onSubmit={formHandler.handleSubmit}>
                            <ModalHeader className="flex flex-col gap-1">Change Request</ModalHeader>
                            <ModalBody>
                                Please provide the reasons for the change.
                                <div>
                                    <Textarea
                                        id="comment"
                                        type="comment"
                                        label="Cancel reason"
                                        placeholder="Please leave a comment with the reason of cancelation."
                                        onChange={formHandler.handleChange}
                                        onBlur={formHandler.handleBlur}
                                        value={formHandler.values.comment}
                                        isInvalid={formHandler.touched.comment && formHandler.errors.comment}
                                        errorMessage="Please write the reason"
                                    />
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Cancel
                                </Button>
                                <Button color="secondary" type="submit" isLoading={isLoading}>
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
