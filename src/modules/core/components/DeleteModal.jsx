/* eslint-disable react/prop-types */
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { DeleteIcon } from "./icons/DeleteIcon";

export default function DeleteModal({ deleteFun, text }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <span
        onClick={onOpen}
        className="text-lg text-danger cursor-pointer active:opacity-50"
      >
        <DeleteIcon />
      </span>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Delete {text}
              </ModalHeader>
              <ModalBody>
                <p>Are you sure you want to delete this {text}?</p>
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="danger"
                  onPress={() => {
                    deleteFun();
                    onClose();
                  }}
                >
                  Confirm
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
