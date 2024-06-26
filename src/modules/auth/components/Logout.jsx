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
import { useTranslation } from "react-i18next";
import useAuthActions from "../context/use-auth-actions";

export default function Logout() {
  const { logOut } = useAuthActions();
  const { t, i18n } = useTranslation();
  const ICON_STYLE = `flex-shrink-0 w-6 h-6 ${i18n.resolvedLanguage === "ar" ? "mt-1 rotate-180" : ""}  group`;
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <div
        onClick={onOpen}
        className={`flex w-[90%] items-center gap-2 p-2 mx-3 mb-2 text-slate-600 rounded-lg cursor-pointer transition-all duration-300 hover:bg-danger-500 hover:text-white group-hover:text-white group-hover:bg-danger-500`
        }
      >
        <BiLogOut className={ICON_STYLE} />
        <p className="text-md font-semibold ">{t("Logout")}</p>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-lg ">Logout</ModalHeader>
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
                    logOut();
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
