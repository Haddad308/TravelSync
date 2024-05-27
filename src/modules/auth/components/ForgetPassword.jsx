import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { useTranslation } from "react-i18next";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [backdrop, setBackdrop] = React.useState("opaque");
  const { t } = useTranslation();
  const handleOpen = (backdrop) => {
    setBackdrop(backdrop);
    onOpen();
  };

  return (
    <>
      <p
        className="text-right cursor-pointer self-end font-normal text-sm mt-1 transition-all duration-400 hover:text-blue-800 "
        onClick={() => handleOpen("blur")}
      >
        {t("forgetPassword")}
      </p>
      <Modal backdrop={backdrop} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {t("forgetPassword")}!
              </ModalHeader>
              <ModalBody>
                <p>
                  If you forgot your password, please contact with us <br />
                  <span className="font-semibold">Wholesalers@gmail.com</span>
                  <br />
                  Or reach us on WhatsApp: <br />
                  <span className="font-semibold">+1234567890</span>
                  or fill the form below
                </p>
                <form>
                  <br />
                  <Input
                    type="email"
                    id="email"
                    label="Email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <br />
                  <Button color="primary" variant="light">
                    Send
                  </Button>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Send
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
