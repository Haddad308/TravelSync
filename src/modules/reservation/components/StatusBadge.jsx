import { Chip } from "@nextui-org/react";
import { FaExclamationCircle } from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im";
import { LuClock3 } from "react-icons/lu";
import { MdFileDownloadDone } from "react-icons/md";

export default function StatusBadge({ status }) {
  return (
    <>
      {status === "pending" ? (
        <Chip
          variant="flat"
          color={"warning"}
          className="rounded-md h-6  px-2 gap-0 text-sm text-center"
          startContent={<LuClock3 className="w-4 h-4" />}
        >
          Pending
        </Chip>
      ) : status === "canceled" ? (
        <Chip
          variant="flat"
          color={"danger"}
          className="rounded-md h-6  px-2 gap-0 text-sm text-center"
          startContent={<ImCancelCircle className="w-4 h-4" />}
        >
          Canceled
        </Chip>
      ) : status === "action_required" ? (
        <Chip
          variant="flat"
          color={"secondary"}
          className="rounded-md h-6  px-2 gap-0 text-sm text-center"
          startContent={<FaExclamationCircle className="w-4 h-4" />}
        >
          Action required
        </Chip>
      ) : (
        <Chip
          variant="flat"
          color={"success"}
          className="rounded-md h-6  px-2 gap-0 text-sm text-center"
          startContent={<MdFileDownloadDone className="w-4 h-4" />}
        >
          Reserved
        </Chip>
      )}
    </>
  );
}
