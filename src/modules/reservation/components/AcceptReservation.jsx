import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { acceptReservation } from "../reservation.handlers";
import { useState } from "react";

export default function AcceptReservation({ id, handleUpdate }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [isLoading, setIsLoading] = useState("");

    return (
        <>
            <Button onPress={onOpen} className="bg-[#415A77] text-white" >Accept</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Accept reservation</ModalHeader>
                            <ModalBody>
                                Are you sure you want to confirm this reservation?
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="success" className="text-white" isLoading={isLoading} onPress={() => {
                                    acceptReservation(setIsLoading, id, handleUpdate).then(() => {
                                        onClose();
                                    })
                                }}>
                                    Accept
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
