import * as Yup from "yup"; // For validation.
import { useFormik } from "formik";
import {
  Button,
  Checkbox,
  DatePicker,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import TravellerFileUploader from "../reservation/components/TravellerFileUploader";

const VisaApplicationForm = () => {
  const formHandler = useFormik({
    initialValues: {
      nameAndSurname: "",
      religion: "",
      gender: "",
      originalNationality: "",
      currentNationality: "",
      countryOfBirth: "",
      // dateOfBirth: "",
      previosOccupation: "",
      currentOccupation: "",
      addresOfhisResidenceInHisCountry: "",
      languagesSpokenOrRead: "",
      nationality: "",
      wifeOrHusbandName: "",
      occupatoin: "",
      hPlaceOfBirth: "",
      // hDateOfBirth: "",
      placeOfHusbandOrWifeWork: "",
      PassportNumber: "",
      issuingCountry: "",
      expPassport: "",
      dateOfIssue: "",
      accompaniedPersons: "",
      proffession: "",
      certificates: "",
      placeOfIssuingCertificates: "",
      dateOfIssueCertificates: "",
      placeOfIssuingVisa: "",
      placeProceedFrom: "",
      placeOfEntering: "",
      purposeOfEnteringIraq: "",
      expectedTimeOfResidenceInIraq: "",
      fullAddressForStayingInIraq: "",
      fullAddressForPlaceOfWorkInIraq: "",
      nameOfContractingFirmInIraq: "",
      numberOfPreviousEntringToIraq: "",
      dateOfTheLastPreviousEntryToIraq: "",
      previousOccupationInIraq: "",
      placesOfPreciousResidenceInIraq: "",
    },
    validationSchema: Yup.object({
      nameAndSurname: Yup.string("يجب ان يكون الاسم صحيح")
        .required("يجب ادخال الاسم")
        .min(3)
        .max(100)
        .required(),
      religion: Yup.string().required(),
      gender: Yup.string().required(),
      originalNationality: Yup.string().required(),
      currentNationality: Yup.string().required(),
      countryOfBirth: Yup.string().required(),
      dateOfBirth: Yup.date().required(),
      previosOccupation: Yup.string().required(),
      currentOccupation: Yup.string().required(),
      addresOfhisResidenceInHisCountry: Yup.string().required(),
      languagesSpokenOrRead: Yup.string().required(),
      nationality: Yup.string().required(),
      wifeOrHusbandName: Yup.string().required(),
      occupatoin: Yup.string().required(),
      hPlaceOfBirth: Yup.string().required(),
      hDateOfBirth: Yup.date().required(),
      placeOfHusbandOrWifeWork: Yup.string().required(),
      PassportNumber: Yup.number().required(),
      issuingCountry: Yup.string().required(),
      expPassport: Yup.string().required(),
      dateOfIssue: Yup.string().required(),
      accompaniedPersons: Yup.string().required(),
      proffession: Yup.string().required(),
      certificates: Yup.string().required(),
      placeOfIssuingCertificates: Yup.string().required(),
      dateOfIssueCertificates: Yup.string().required(),
      placeOfIssuingVisa: Yup.string().required(),
      placeProceedFrom: Yup.string().required(),
      placeOfEntering: Yup.string().required(),
      purposeOfEnteringIraq: Yup.string().required(),
      expectedTimeOfResidenceInIraq: Yup.string().required(),
      fullAddressForStayingInIraq: Yup.string().required(),
      fullAddressForPlaceOfWorkInIraq: Yup.string().required(),
      nameOfContractingFirmInIraq: Yup.string().required(),
      numberOfPreviousEntringToIraq: Yup.string().required(),
      dateOfTheLastPreviousEntryToIraq: Yup.string().required(),
      previousOccupationInIraq: Yup.string().required(),
      placesOfPreciousResidenceInIraq: Yup.string().required(),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div className="flex w-full flex-col m-5 mt-1 p-5 rounded-lg bg-white mr-2 ">
      <h1 className="text-2xl font-bold">Visa Application Form</h1>
      <form onSubmit={formHandler.handleSubmit}>
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-3 gap-4 border-3 rounded-md p-4">
            <Input
              label="الأسم الكامل والشهرة"
              {...formHandler.getFieldProps("nameAndSurname")}
            />
            <Select
              items={["مسلم", "مسيحي", "يهودي", "اخرى"].map((religion) => ({
                name: religion,
                key: religion,
                label: religion,
              }))}
              label="الديانة"
              placeholder="اختر الديانة"
            >
              {(religion) => <SelectItem>{religion.label}</SelectItem>}
            </Select>
            <div className="flex items-center gap-2">
              <p>الجنس:</p>
              <label>
                <Checkbox
                  type="radio"
                  name="gender"
                  value="male"
                  isSelected={formHandler.values.gender === "male"}
                  onChange={() => formHandler.setFieldValue("gender", "male")}
                />{" "}
                ذكر
              </label>
              <label>
                <Checkbox
                  type="radio"
                  name="gender"
                  value="female"
                  isSelected={formHandler.values.gender === "female"}
                  onChange={() => formHandler.setFieldValue("gender", "female")}
                />{" "}
                انثى
              </label>
            </div>
            <Input
              label="الجنسية الأصلية"
              {...formHandler.getFieldProps("originalNationality")}
            />
            <Input
              label="الجنسية الحالية"
              {...formHandler.getFieldProps("currentNationality")}
            />
            <Input
              label="بلد الولادة"
              {...formHandler.getFieldProps("countryOfBirth")}
            />
            <DatePicker label="تاريخ الولادة" />
            <Input
              label="المهنة السابقة"
              {...formHandler.getFieldProps("previosOccupation")}
            />
            <Input
              label="المهنة الحالية"
              {...formHandler.getFieldProps("currentOccupation")}
            />
            <Input
              label="عنوان إقامته في بلده"
              className="col-span-2"
              {...formHandler.getFieldProps("addresOfhisResidenceInHisCountry")}
            />
            <Input
              label="اللغات التي يتحدثها أو يقرأها"
              {...formHandler.getFieldProps("languagesSpokenOrRead")}
            />
          </div>
          <div className="grid grid-cols-3 gap-4 border-3 rounded-md p-4">
            <Input
              label="الجنسية"
              {...formHandler.getFieldProps("nationality")}
            />
            <Input
              label="اسم الزوجة أو الزوج"
              {...formHandler.getFieldProps("wifeOrHusbandName")}
            />
            <Input
              label="المهنة"
              {...formHandler.getFieldProps("occupatoin")}
            />

            <Input
              label="مكان الميلاد"
              {...formHandler.getFieldProps("hPlaceOfBirth")}
            />
            <DatePicker
              label="تاريخ الولادة"
              {...formHandler.getFieldProps("hDateOfBirth")}
            />
            <Input
              label="مكان عمل الزوجة أو الزوج"
              {...formHandler.getFieldProps("placeOfHusbandOrWifeWork")}
            />
          </div>
          <div className="grid grid-cols-3 gap-4 border-3 rounded-md p-4">
            <Input
              label="رقم جواز السفر"
              {...formHandler.getFieldProps("PassportNumber")}
            />
            <Input
              label="بلد الإصدار"
              {...formHandler.getFieldProps("issuingCountry")}
            />
            <Input
              label="تاريخ الإصدار"
              {...formHandler.getFieldProps("dateOfIssue")}
            />
            <Input
              label="تاريخ الانتهاء"
              {...formHandler.getFieldProps("expPassport")}
            />
            <Input
              label="الأشخاص المرافقين"
              {...formHandler.getFieldProps("accompaniedPersons")}
            />
          </div>

          <div className="grid grid-cols-3 gap-4 border-3 rounded-md p-4">
            <Input
              label="الشهادات"
              {...formHandler.getFieldProps("certificates")}
            />
            <Input
              label="المهنة"
              {...formHandler.getFieldProps("proffession")}
            />
            <Input
              label="مكان إصدار الشهادات"
              {...formHandler.getFieldProps("placeOfIssuingCertificates")}
            />
            <Input
              label="تاريخ إصدار الشهادات"
              {...formHandler.getFieldProps("dateOfIssueCertificates")}
            />
          </div>
          <div className="grid grid-cols-3 gap-4 border-3 rounded-md p-4">
            <Input
              label="مكان إصدار التأشيرة"
              {...formHandler.getFieldProps("placeOfIssuingVisa")}
            />
            <Input
              label="مكان المغادرة"
              {...formHandler.getFieldProps("placeProceedFrom")}
            />
            <Input
              label="مكان الدخول"
              {...formHandler.getFieldProps("placeOfEntering")}
            />
            <Input
              label="الغرض من دخول العراق"
              {...formHandler.getFieldProps("purposeOfEnteringIraq")}
            />
            <Input
              label="الوقت المتوقع للإقامة في العراق"
              {...formHandler.getFieldProps("expectedTimeOfResidenceInIraq")}
            />
          </div>
          <div className="grid grid-cols-3 gap-4 border-3 rounded-md p-4">
            <Input
              label="العنوان الكامل للإقامة في العراق"
              {...formHandler.getFieldProps("fullAddressForStayingInIraq")}
            />

            <Input
              label="العنوان الكامل لمكان العمل في العراق"
              {...formHandler.getFieldProps("fullAddressForPlaceOfWorkInIraq")}
            />
            <Input
              label="اسم الشركة المتعاقدة في العراق"
              {...formHandler.getFieldProps("nameOfContractingFirmInIraq")}
            />
          </div>
          <div className="grid grid-cols-3 gap-4 border-3 rounded-md p-4">
            <Input
              label="عدد الدخولات السابقة إلى العراق"
              {...formHandler.getFieldProps("numberOfPreviousEntringToIraq")}
            />
            <Input
              label="تاريخ آخر دخول إلى العراق"
              {...formHandler.getFieldProps("dateOfTheLastPreviousEntryToIraq")}
            />
            <Input
              label="المهنة السابقة في العراق"
              {...formHandler.getFieldProps("previousOccupationInIraq")}
            />
            <Input
              label="أماكن الإقامة السابقة في العراق"
              {...formHandler.getFieldProps("placesOfPreciousResidenceInIraq")}
            />
          </div>

          <TravellerFileUploader
            key={2}
            TravellerFiles={[1, 2]}
            idx={2}
            setIsUploading={formHandler.setFieldValue}
          />
        </div>
        <Button className="bg-foreground text-background mt-2" size="lg">
          طلب التأشيرة
        </Button>
      </form>
    </div>
  );
};

export default VisaApplicationForm;
