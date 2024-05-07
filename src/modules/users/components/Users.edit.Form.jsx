/* eslint-disable react/prop-types */
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input
} from '@nextui-org/react';
import * as Yup from 'yup'; // For validation.
import { useFormik } from 'formik';
import ImagesUploader from '../../core/components/ImageUploader/ImageUploader';
import { useState } from 'react';
import { uploadImage } from '../../core/core.handlers';
import { editUser } from '../Users.handlers';
import { EditIcon } from '../../core/components/icons/EditIcon';

import Alert from '../../core/components/Alert';
import { RemoveEmptyValues } from '../utils';

export default function UsersFormEdit({ handleUpdate, userId }) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [userImage, setUserImage] = useState([]);
  const [isLoading, setIsLoading] = useState('');
  const [apiError, setApiError] = useState('');

  const formHandler = useFormik({
    initialValues: {
      // email: '',
      password: '',
      firstName: '',
      lastName: ''
    },
    validationSchema: () => {
      return Yup.object({
        // email: Yup.string().email('Invalid email address'),
        password: Yup.string().min(6, 'Password must be at least 6 characters'),
        firstName: Yup.string(),
        lastName: Yup.string()
      });
    },

    onSubmit: (values, { resetForm }) => {
      values = RemoveEmptyValues(values);
      uploadImage(userImage, setIsLoading, setApiError, 'edit').then((id) => {
        console.log('checking the Image.', id); // Check if image is properly updated
        values['profilePhotoId'] = id ? id[0] : null;
        editUser(values, userId, setIsLoading, handleUpdate).then(() => {
          onClose();
          resetForm();
        });
      });
    }
  });

  return (
    <div className="flex flex-col gap-2">
      <span onClick={onOpen} className="text-lg text-default-400 cursor-pointer active:opacity-50">
        <EditIcon />
      </span>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior="inside"
        backdrop="blur"
        size="5xl">
        <ModalContent>
          {(onClose) => (
            <form onSubmit={formHandler.handleSubmit}>
              <ModalHeader className="flex flex-col gap-1">Add new User</ModalHeader>
              <ModalBody className="flex flex-row items-center">
                <div className="w-1/2">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Input
                        id="firstName"
                        type="firstName"
                        label="First Name"
                        variant="bordered"
                        labelPlacement="outside"
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.firstName}
                      />
                      {formHandler.touched.firstName && formHandler.errors.firstName ? (
                        <div className="text-red-600">{formHandler.errors.firstName}</div>
                      ) : null}
                    </div>
                    <div>
                      <Input
                        id="lastName"
                        type="lastName"
                        label="Last Name"
                        variant="bordered"
                        labelPlacement="outside"
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.lastName}
                      />
                      {formHandler.touched.lastName && formHandler.errors.lastName ? (
                        <div className="text-red-600">{formHandler.errors.lastName}</div>
                      ) : null}
                    </div>
                    <div>
                      <Input
                        id="password"
                        type="password"
                        label="password"
                        variant="bordered"
                        labelPlacement="outside"
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.password}
                      />
                      {formHandler.touched.password && formHandler.errors.password ? (
                        <div className="text-red-600">{formHandler.errors.password}</div>
                      ) : null}
                    </div>

                    <div className="col-span-2">{apiError ? <Alert text={apiError} /> : ''}</div>
                  </div>
                </div>
                <div className="w-1/2">
                  <ImagesUploader
                    files={userImage}
                    setFiles={setUserImage}
                    isMultiple={false}
                    isOnly={true}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  isLoading={isLoading}
                  color="secondary"
                  type="submit"
                  className="text-white">
                  Edit
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
