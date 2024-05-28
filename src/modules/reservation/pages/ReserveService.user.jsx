/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import * as Yup from 'yup'; // For validation.
import { useFormik } from 'formik';
import { Button, Input } from '@nextui-org/react';
import { Reserve } from '../reservation.handlers';
import TravellerFileUploader from '../components/TravellerFileUploader';

const ReserveService = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Get ID from URL
  const location = useLocation();

  const { pathname } = location;
  const id = parseInt(pathname.slice(pathname.lastIndexOf("/") + 1));

  // State to manage travelers
  const [travelers, setTravelers] = useState([
    {
      firstName: "",
      lastName: "",
      email: "",
      mobilePhone: "",
      dateOfBirth: "",
      fileIds: [],
    },
  ]);

  // Function to add a new traveler
  const addTraveler = () => {
    setTravelers(() => {
      // Create the new traveler object
      const newTraveler = {
        firstName: "",
        lastName: "",
        email: "",
        mobilePhone: "",
        dateOfBirth: "",
        fileIds: [],
      };

      // Append the new traveler to the existing travelers array
      return [...formHandler.values.travelers, newTraveler];
    });
  };

  // Use useFormik for form handling
  const formHandler = useFormik({
    initialValues: {
      serviceId: id,
      quantity: 1,
      checkInDate: '',
      checkOutDate: '',
      travelers: travelers,
    },
    validationSchema: Yup.object({
      quantity: Yup.string().required('Required'),
      checkInDate: Yup.string().required('Required'),
      checkOutDate: Yup.string().required('Required'),
      travelers: Yup.array().of(
        Yup.object({
          firstName: Yup.string().required('Required'),
          lastName: Yup.string().required('Required'),
          email: Yup.string().email('Invalid email address').required('Required'),
          mobilePhone: Yup.string().required('Required'),
          dateOfBirth: Yup.string().required('Required'),
        })
      ),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log("test values", values);
      // Handle form submission
      Reserve(setIsLoading, values);
      resetForm();
    },
  });

  // Sync travelers state with formik values
  useEffect(() => {
    formHandler.setFieldValue("travelers", travelers);
  }, [travelers]);

  return (
    <form onSubmit={formHandler.handleSubmit} className="m-5 p-5 rounded-lg bg-white" >
      <div className='flex-grow' >
        <div className='grid grid-cols-3 gap-5'>
          <div className='col-span-2 '>
            <h1 className="text-2xl font-semibold">Reservation details</h1>

            {/* Quantity Input */}
            <div className="mb-2">
              <Input
                id="quantity"
                type="number"
                label="Quantity"
                variant="bordered"
                labelPlacement="outside"
                radius="lg"
                min={1}
                onChange={formHandler.handleChange}
                onBlur={formHandler.handleBlur}
                value={formHandler.values.quantity}
              />
              {formHandler.touched.quantity && formHandler.errors.quantity ? (
                <div className="text-red-600">
                  {formHandler.errors.quantity}
                </div>
              ) : null}
            </div>

            {/* Check-In Date Input */}
            <div className='grid grid-cols-2 gap-3' >
              <div>
                <Input
                  id="checkInDate"
                  type="date"
                  label="Check-In Date"
                  variant="bordered"
                  labelPlacement="outside"
                  radius="lg"
                  onChange={formHandler.handleChange}
                  onBlur={formHandler.handleBlur}
                  value={formHandler.values.checkInDate}
                />
                {formHandler.touched.checkInDate && formHandler.errors.checkInDate ? (
                  <div className="text-red-600">{formHandler.errors.checkInDate}</div>
                ) : null}
              </div>

              {/* Check-Out Date Input */}
              <div>
                <Input
                  id="checkOutDate"
                  type="date"
                  label="Check-Out Date"
                  variant="bordered"
                  labelPlacement="outside"
                  radius="lg"
                  onChange={formHandler.handleChange}
                  onBlur={formHandler.handleBlur}
                  value={formHandler.values.checkOutDate}
                />
                {formHandler.touched.checkOutDate && formHandler.errors.checkOutDate ? (
                  <div className="text-red-600">{formHandler.errors.checkOutDate}</div>
                ) : null}
              </div>
            </div>


          </div>
          <div className=' rounded-2xl border-2 p-5 flex-none'>
            <h2 className='text-2xl font-semibold mb-2'>Price Details</h2>
            <div className='flex justify-between'>
              <p>{formHandler.values.quantity} night</p>
              <p>1500 EGP</p>
            </div>
            <div className='flex justify-between'>
              <p>Taxes & fees</p>
              <p>300 EGP</p>
            </div>

            <hr className="border-dashed border-2 my-3" />

            <div className="flex justify-between">
              <p className="font-semibold">Total</p>
              <p className="font-semibold">
                {formHandler.values.quantity * 1500 + 300} EGP
              </p>
            </div>
          </div>
        </div>

        {/* Travelers Section */}
        {travelers.map((_, idx) => (
          <div key={idx} className="my-5">
            <h1 className="text-2xl font-semibold">Traveler {idx + 1}</h1>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Input
                  id={`travelers[${idx}].firstName`}
                  type="text"
                  label="First Name hamo"
                  variant="bordered"
                  labelPlacement="outside"
                  radius="lg"
                  onChange={formHandler.handleChange}
                  onBlur={formHandler.handleBlur}
                  value={formHandler.values.travelers[idx]?.firstName || ""}
                />
                {formHandler.touched.travelers?.[idx]?.firstName &&
                  formHandler.errors.travelers?.[idx]?.firstName ? (
                  <div className="text-red-600">
                    {formHandler.errors.travelers[idx].firstName}
                  </div>
                ) : null}
              </div>

              <div>
                <div>
                  <Input
                    id={`travelers[${idx}].lastName`}
                    type="text"
                    label="Last Name"
                    variant="bordered"
                    labelPlacement="outside"
                    radius="lg"
                    onChange={formHandler.handleChange}
                    onBlur={formHandler.handleBlur}
                    value={formHandler.values.travelers[idx]?.lastName || ""}
                  />
                  {formHandler.touched.travelers?.[idx]?.lastName &&
                    formHandler.errors.travelers?.[idx]?.lastName ? (
                    <div className="text-red-600">
                      {formHandler.errors.travelers[idx].lastName}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Input
                  id={`travelers[${idx}].mobilePhone`}
                  type="text"
                  label="Mobile Phone"
                  variant="bordered"
                  labelPlacement="outside"
                  radius="lg"
                  onChange={formHandler.handleChange}
                  onBlur={formHandler.handleBlur}
                  value={formHandler.values.travelers[idx]?.mobilePhone || ""}
                />
                {formHandler.touched.travelers?.[idx]?.mobilePhone &&
                  formHandler.errors.travelers?.[idx]?.mobilePhone ? (
                  <div className="text-red-600">
                    {formHandler.errors.travelers[idx].mobilePhone}
                  </div>
                ) : null}
              </div>
              <div>
                <Input
                  id={`travelers[${idx}].email`}
                  type="email"
                  label="Email"
                  variant="bordered"
                  labelPlacement="outside"
                  radius="lg"
                  onChange={formHandler.handleChange}
                  onBlur={formHandler.handleBlur}
                  value={formHandler.values.travelers[idx]?.email || ""}
                />
                {formHandler.touched.travelers?.[idx]?.email &&
                  formHandler.errors.travelers?.[idx]?.email ? (
                  <div className="text-red-600">
                    {formHandler.errors.travelers[idx].email}
                  </div>
                ) : null}
              </div>
            </div>

            <div>
              <Input
                id={`travelers[${idx}].dateOfBirth`}
                type="date"
                label="Date of Birth"
                variant="bordered"
                labelPlacement="outside"
                radius="lg"
                onChange={formHandler.handleChange}
                onBlur={formHandler.handleBlur}
                value={formHandler.values.travelers[idx]?.dateOfBirth || ''}
              />
              {formHandler.touched.travelers?.[idx]?.dateOfBirth && formHandler.errors.travelers?.[idx]?.dateOfBirth ? (
                <div className="text-red-600">{formHandler.errors.travelers[idx].dateOfBirth}</div>
              ) : null}
            </div>

            <TravellerFileUploader
              key={idx}
              TravellerFiles={formHandler.values.travelers[idx]?.fileIds}
              idx={idx}
              setIsUploading={setIsUploading}
            />

          </div>
        ))}

        {/* Button to add a new traveler */}
        <Button color="warning" onClick={addTraveler}>
          Add Traveler
        </Button>

        {/* Submit button */}
        <Button type="submit" color="primary" disabled={isUploading} isLoading={isLoading} className={`btn ${isUploading ? "bg-gray-400" : "btn-primary"}  mt-4`}>Submit</Button>
      </div>



    </form>
  );
};

export default ReserveService;
