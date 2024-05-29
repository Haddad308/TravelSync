/* eslint-disable react/prop-types */
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Input,
    Select,
    SelectItem,
} from "@nextui-org/react";
import { PlusIcon } from "../../core/components/icons/PlusIcon";
import * as Yup from "yup"; // For validation.
import { useFormik } from "formik";
import { useState } from "react";
import { LuDollarSign } from "react-icons/lu";
import { MakeTransaction } from "../Finance.handlers";
import { useLocation } from "react-router-dom";
import useAuthTokens from "../../auth/context/use-auth-tokens";

export default function Transactions({ handlechange }) {


    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [isLoading, setIsLoading] = useState(false); // Fixed initial state type to boolean

    const tokenObj = useAuthTokens();
    const token = tokenObj.tokensInfoRef.current.token;

    const location = useLocation();
    const { pathname } = location;

    const id = parseInt(pathname.slice(pathname.lastIndexOf("/") + 1));

    const onUpdate = () => {
        handlechange();
        onClose()
    }

    const formHandler = useFormik({
        initialValues: {
            amount: "",
            type: "",
            transactionDate: "2024-05-20T15:05:36.820Z",
            transactionTime: "2024-05-20T15:05:36.820Z",
            currency: "USD"
        },
        validationSchema: Yup.object({ // Fixed incorrect anonymous function call
            amount: Yup.number().required("Required"),
            type: Yup.string().required("Required"),
        }),

        onSubmit: (values, { resetForm }) => {
            MakeTransaction(values, setIsLoading, id, token, onUpdate)
            resetForm();
        },
    });

    return (
        <div className="flex flex-col gap-2">
            <Button
                className="bg-foreground text-background"
                onPress={onOpen}
                endContent={<PlusIcon />}
                size="sm"
            >
                Add Transactions
            </Button>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                scrollBehavior="inside"
                backdrop="blur"
                size="xl"
            >
                <ModalContent>
                    {() => ( // Removed onClose as it is already in scope
                        <form onSubmit={formHandler.handleSubmit}>
                            <ModalHeader className="flex flex-col gap-1">
                                Add new Agency
                            </ModalHeader>
                            <ModalBody className="grid grid-cols-3">
                                <div className="col-span-2">
                                    <Input
                                        id="amount"
                                        type="number"
                                        label="Amount"
                                        min={1}
                                        variant="bordered"
                                        radius="lg"
                                        startContent={
                                            <LuDollarSign className="mb-[1.5px]" />
                                        }
                                        onChange={formHandler.handleChange}
                                        onBlur={formHandler.handleBlur}
                                        value={formHandler.values.amount}
                                    />
                                    {formHandler.touched.amount && formHandler.errors.amount ? (
                                        <div className="text-red-600">
                                            {formHandler.errors.amount}
                                        </div>
                                    ) : null}
                                </div>
                                <div>
                                    <Select
                                        label="Type"
                                        variant="bordered"
                                        id="type"
                                        placeholder="Select type"
                                        onBlur={formHandler.handleBlur}
                                        value={formHandler.values.type}
                                        onChange={formHandler.handleChange("type")}

                                    >
                                        <SelectItem key={"withdraw"}>
                                            Withdraw
                                        </SelectItem>
                                        <SelectItem key={"deposit"} >
                                            Deposit
                                        </SelectItem>
                                    </Select>
                                    {formHandler.touched.type && formHandler.errors.type ? (
                                        <div className="text-red-600">
                                            {formHandler.errors.type}
                                        </div>
                                    ) : null}
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
