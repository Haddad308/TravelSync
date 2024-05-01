import { useFormik } from "formik";
import * as Yup from 'yup';
import LoginVector from "../../../assets/system/LoginVector.svg";
import { useContext, useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { EyeSlashFilledIcon } from "../../core/components/icons/EyeSlashFilledIcon";
import { EyeFilledIcon } from "../../core/components/icons/EyeFilledIcon";
import { useNavigate } from "react-router-dom";
import { auth } from "../context/AuthProvider";
import userLogin from "../handlers/login.handler";
import ForgetPassword from "../components/ForgetPassword";
import { useTranslation } from "react-i18next";
import Alert from "../../core/components/Alert";

const Login = () => {

  const toggleVisibility = () => setIsVisible(!isVisible);
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [, SetToken] = useContext(auth);
  const navigate = useNavigate();

  const formHandler = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().required('Required'),
    }),
    onSubmit: (values) => {
      userLogin(values, setIsLoading, setApiError, navigate, SetToken);
    },
  });

  return (
    <form onSubmit={formHandler.handleSubmit}>
      <div className={`flex py-10 items-center  h-screen px-20`}>

        <div className='w-1/2' >
          <img className='w-[500px]' src={LoginVector} alt="loginVector" />
        </div>

        <div className={`border-2 rounded-lg  p-10 w-1/2 flex flex-col gap-2`}>

          <h2 className="text-2xl font-semibold">{t("WelcomeMessage")}!</h2>
          <h1 className="text-[32px] font-bold">{t("signin")}</h1>

          <div className='flex flex-col mt-5 items-start gap-5' >
            <div className="flex flex-col gap-3 w-full " >
              <Input
                isClearable
                label={t("email")}
                name="email"
                placeholder="Enter your email"
                onClear={() => formHandler.setFieldValue("email", "")}
                onChange={formHandler.handleChange}
                onBlur={formHandler.handleBlur}
                value={formHandler.values.email.trim()}
                isInvalid={formHandler.touched.email && formHandler.errors.email}
                errorMessage={formHandler.touched.email && formHandler.errors.email}
              />
              <Input
                label={t("password")}
                name="password"
                placeholder="Enter your password"
                endContent={
                  <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                    {isVisible ? (
                      <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                      <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    )}
                  </button>
                }
                type={isVisible ? "text" : "password"}
                onChange={formHandler.handleChange}
                onBlur={formHandler.handleBlur}
                value={formHandler.values.password.trim()}
                isInvalid={formHandler.touched.password && formHandler.errors.password}
                errorMessage={formHandler.touched.password && formHandler.errors.password}
              />
              <ForgetPassword />
            </div>
            <Button
              className="bg-main text-white font-semibold w-full"
              type="submit"
              isLoading={isLoading}
            >
              {t("signin")}
            </Button>
            <div className="flex justify-center w-full" >
              {apiError ? <Alert text={'Wrong Email or Password.'} /> : ''}
            </div>
          </div>
        </div>

      </div>
    </form>
  )
}

export default Login
