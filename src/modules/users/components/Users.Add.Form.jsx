/* eslint-disable react/prop-types */
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Select,
  SelectItem,
  Input
} from '@nextui-org/react';
import { PlusIcon } from '../../core/components/icons/PlusIcon';
import * as Yup from 'yup'; // For validation.
import { useFormik } from 'formik';
import ImagesUploader from '../../core/components/ImageUploader/ImageUploader';
import { useState } from 'react';
import { uploadImage } from '../../core/core.handlers';
import { addUser } from '../Users.handlers';
import { getAgencies } from '../../agencies/Agencies.handlers';
import Alert from '../../core/components/Alert';

export default function UsersForm({ handleUpdate }) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [userImage, setUserImage] = useState([]);
  const [isLoading, setIsLoading] = useState('');
  const [apiError, setApiError] = useState('');

  const [agencies, setAgencies] = useState([]);

  const handleUpdateAgencies = () => {
    getAgencies(setAgencies, setIsLoading);
    console.log('Agencies:', agencies);
  };

  const formHandler = useFormik({
    initialValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      travelOfficeId: ''
    },
    validationSchema: () => {
      return Yup.object({
        email: Yup.string().email('Invalid email address').required('Required'),
        password: Yup.string()
          .required('Required')
          .min(6, 'Password must be at least 6 characters'),
        firstName: Yup.string().required('Required'),
        lastName: Yup.string().required('Required'),
        travelOfficeId: Yup.number().required('please select an agency')
      });
    },
    onSubmit: (values, { resetForm }) => {
      uploadImage(userImage, setIsLoading, setApiError).then((id) => {
        console.log('checking the Image.', id); // Check if image is properly updated
        values['profilePhotoId'] = id ? id[0] : null;
        console.log('checking the values.', values); // Check if values are properly updated
        addUser(values, setIsLoading, handleUpdate).then(() => {
          onClose();
          resetForm();
        });
      });
    }
  });

  return (
    <div className="flex flex-col gap-2">
      <Button
        className="bg-foreground text-background"
        onPress={onOpen}
        endContent={<PlusIcon />}
        size="sm">
        Add New
      </Button>
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
                        label="lastName"
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

                    <div className="py-3">
                      <Select
                        label="Agency"
                        id="travelOfficeId"
                        placeholder="Select an agency"
                        className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                        value={formHandler.values.travelOfficeId}
                        onClick={handleUpdateAgencies}
                        onChange={formHandler.handleChange('travelOfficeId')}>
                        {agencies.map(({ id, name }) => (
                          <SelectItem key={id} value={id}>
                            {name}
                          </SelectItem>
                        ))}
                      </Select>
                      {formHandler.touched.travelOfficeId && formHandler.errors.travelOfficeId ? (
                        <div className="text-red-600">{formHandler.errors.travelOfficeId}</div>
                      ) : null}
                    </div>

                    <div>
                      <Input
                        id="email"
                        type="email"
                        label="email"
                        variant="bordered"
                        labelPlacement="outside"
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.email}
                      />
                      {formHandler.touched.email && formHandler.errors.email ? (
                        <div className="text-red-600">{formHandler.errors.email}</div>
                      ) : null}
                    </div>

                    <div>
                      <Input
                        id="password"
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
                <Button isLoading={isLoading} color="success" type="submit" className="text-white">
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
