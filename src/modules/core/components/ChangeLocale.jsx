import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { useTranslation } from "react-i18next";
import { GrLanguage } from "react-icons/gr";

export default function ChangeLocale() {
  const { i18n } = useTranslation();
  const iconClasses =
    "text-xl font-bold  text-black pointer-events-none flex-shrink-0";
  const [selectedKeys, setSelectedKeys] = React.useState(
    new Set([i18n.resolvedLanguage]),
  );

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys],
  );

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          variant="light"
          className="capitalize p-2 mx-3 mb-2 flex items-center justify-start  gap-2  text-white rounded-lg cursor-pointer transition-all duration-300 hover:bg-danger-500 "
        >
          <GrLanguage
            className={`flex-shrink-0 ${i18n.resolvedLanguage === "en" ? "ml-1" : ""}  w-5 h-5 text-white transition duration-75`}
          />
          <p className="font-semibold text-white text-lg">
            {selectedValue === "en" ? "English" : "العربية"}
          </p>
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Single selection example"
        variant="flat"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
        onAction={(key) => {
          i18n.changeLanguage(key);
        }}
      >
        <DropdownItem
          startContent={<GrLanguage className={iconClasses} />}
          key="en"
        >
          English
        </DropdownItem>
        <DropdownItem
          startContent={<GrLanguage className={iconClasses} />}
          key="ar"
        >
          العربية
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
