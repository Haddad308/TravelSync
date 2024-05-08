import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { BiLogOut } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { logout } from "../handlers/logout.handler";
import { useTranslation } from "react-i18next";

export default function Logout() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const ICON_STYLE = `flex-shrink-0 w-6 h-6 ${i18n.resolvedLanguage === "ar" ? "mt-1" : ""} text-white  transition duration-75`;

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <div
        onClick={onOpen}
        className={`flex items-center gap-2 p-2 mx-3 mb-2 text-white rounded-lg cursor-pointer transition-all duration-300 hover:bg-danger-500 `}
      >
        <BiLogOut className={ICON_STYLE} />
        <p className="text-lg font-semibold">{t("Logout")}</p>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Logout</ModalHeader>
              <ModalBody>
                <p>Are you sure you want to logout?</p>
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="danger"
                  onPress={() => {
                    onClose();
                    logout(navigate);
                  }}
                >
                  Yes
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
