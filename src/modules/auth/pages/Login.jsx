import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { EyeSlashFilledIcon } from "../../core/components/icons/EyeSlashFilledIcon";
import { EyeFilledIcon } from "../../core/components/icons/EyeFilledIcon";
// import { useNavigate } from "react-router-dom";
// import { auth } from "../context/AuthProvider";
// import userLogin from "../handlers/login.handler";
import ForgetPassword from "../components/ForgetPassword";
import { useTranslation } from "react-i18next";
import Alert from "../../core/components/Alert";
import useAuthActions from "../context/use-auth-actions";
import useAuthTokens from "../context/use-auth-tokens";
import { useAuthLoginService } from "../handlers/auth";
import HTTP_CODES_ENUM from "../../../enums/http-codes";

const Login = () => {
  const { setUser } = useAuthActions();
  const { setTokensInfo } = useAuthTokens();
  const fetchAuthLogin = useAuthLoginService();

  const toggleVisibility = () => setIsVisible(!isVisible);
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  // const [, SetToken] = useContext(auth);
  // const navigate = useNavigate();

  const onSubmit = async (formData) => {
    setIsLoading(true);

    const { data, status } = await fetchAuthLogin(formData);

    if (status === HTTP_CODES_ENUM.UNPROCESSABLE_ENTITY) {
      setApiError(data.errors);
      setIsLoading(false);
      // Object.keys(data.errors).forEach((key) => {
      //   setApiError(data.errors[key]);
      // });

      return;
    }

    if (status === HTTP_CODES_ENUM.NOT_FOUND) {
      setApiError("Wrong Email or Password.");
      setIsLoading(false);
      return;
    }

    if (status === HTTP_CODES_ENUM.OK) {
      setTokensInfo({
        token: data.token,
        refreshToken: data.refreshToken,
        tokenExpires: data.tokenExpires,
      });
      setUser(data.user);
      setIsLoading(false);
      return;
    }
    setApiError("Something went wrong");
    setIsLoading(false);
  };

  const formHandler = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
    }),

    // onSubmit: (values) => {
    //   userLogin(values, setIsLoading, setApiError, navigate, SetToken);
    // },
    onSubmit: onSubmit,
  });

  return (
    <>

      <div className="relative h-full w-full bg-white"></div><div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>

      <form onSubmit={formHandler.handleSubmit} className={'bg-slate-100'} >
        <div className={`flex py-10 items-center justify-center  h-screen px-20`}>
          <div className={`border-2 rounded-lg items-center  p-10 w-1/3 flex backdrop-blur-lg bg-white/90 shadow-md flex-col gap-2`}>
            <div className="flex gap-1 items-center">

              <img
                width={50}
                height={50}
                src="https://static.thenounproject.com/png/62578-200.png"
                alt="logo"
              />
              <h1 className="text-3xl font-bold text-center">BookIt</h1>

            </div>
            <h2 className="ltr:ml-3 rtl:mr-3 text-2xl font-semibold">{t("WelcomeMessage")}!</h2>
            <h1 className=" text-gray-400">Sign in to manage your bookings</h1>

            <div className="flex flex-col mt-5 items-start gap-5 w-full">
              <div className="flex flex-col gap-3 w-full ">
                <Input
                  className='rounded-lg'
                  isClearable
                  label={t("email")}
                  name="email"
                  placeholder="Enter your email"
                  onClear={() => formHandler.setFieldValue("email", "")}
                  onChange={formHandler.handleChange}
                  onBlur={formHandler.handleBlur}
                  value={formHandler.values.email.trim()}
                  isInvalid={
                    formHandler.touched.email && formHandler.errors.email
                  }
                  errorMessage={
                    formHandler.touched.email && formHandler.errors.email
                  }
                />
                <Input
                  className='rounded-lg'
                  label={t("password")}
                  name="password"
                  placeholder="Enter your password"
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleVisibility}
                    >
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
                  isInvalid={
                    formHandler.touched.password && formHandler.errors.password
                  }
                  errorMessage={
                    formHandler.touched.password && formHandler.errors.password
                  }
                />
                <ForgetPassword />
              </div>
              <Button
                className="bg-black text-white font-semibold w-full rounded-lg"
                type="submit"
                isLoading={isLoading}
              >
                {t("signin")}
              </Button>
              <div className="flex justify-center w-full">
                {apiError ? <Alert text={"Wrong Email or Password."} /> : ""}
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Login;
