import { Formik } from "formik";
import { useTranslation } from "next-i18next";
import { useRef } from "react";
import PhoneInputWithCountrySelect from "react-phone-number-input";

import reactQuery from "../../helpers/reactQuery";
import { ContactUsSchema } from "../../schemas";
import { contactService } from "../../services";
import FormSubmission from "../General/FormSubmission";
import Input from "../General/Inputs/Input";
import TextArea from "../General/Inputs/TextArea";

export default function () {
  const { t } = useTranslation();
  const formikRef = useRef();
  const createMutation = reactQuery.mutation(
    contactService.create,
    "contacts",
    () => {
      formikRef.current?.setSubmitting(false);
      formikRef.current?.resetForm();
    },
    () => formikRef.current?.setSubmitting(false),
  );
  const contact = ["name", "phoneNumber", "contactEmail", "subject", "message"];
  return (
    <div className="w-full lg:w-2/3 mx-auto">
      <Formik
        innerRef={formikRef}
        initialValues={contact.reduce((obj, prop) => {
          obj[prop] = "";
          return obj;
        }, {})}
        validationSchema={ContactUsSchema}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          createMutation.mutate(values);
        }}
      >
        {({
          values,
          errors,
          touched,
          setTouched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
            <div className="flex flex-wrap mb-3">
              <div className="w-full lg:w-1/2 lg:px-2 mb-3 lg:mb-0">
                <Input
                  placeholder={`${t("common:fs1_input1")}`}
                  name={contact[0]}
                  value={values[contact[0]]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="block w-full py-2 px-4 text-lg border-b outline-golden bg-transparent border border-golden focus:outline-stone-700 placeholder:text-sm text-neutral-450"
                />
              </div>
              <div className="w-full lg:w-1/2 lg:px-2">
                <PhoneInputWithCountrySelect
                  international
                  defaultCountry="CA"
                  name={contact[1]}
                  value={values[contact[1]]}
                  onChange={(v) => setFieldValue(contact[1], v)}
                  onBlur={handleBlur}
                  className="block w-full py-2 px-4 text-lg border-b outline-golden bg-transparent border border-golden focus:outline-stone-700 placeholder:text-sm text-neutral-450"
                  numberInputProps={{ className: "bg-transparent" }}
                />
              </div>
            </div>
            <div className="flex flex-wrap mb-3">
              <div className="w-full lg:w-1/2 lg:px-2 mb-3 lg:mb-0">
                <Input
                  placeholder={`${t("common:fs1_input3")}`}
                  name={contact[2]}
                  value={values[contact[2]]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="email"
                  className="block w-full py-2 px-4 text-lg border-b outline-golden bg-transparent border border-golden focus:outline-stone-700 placeholder:text-sm text-neutral-450"
                />
              </div>
              <div className="w-full lg:w-1/2 lg:px-2">
                <Input
                  placeholder={`${t("common:fs1_input4")}`}
                  name={contact[3]}
                  value={values[contact[3]]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="block w-full py-2 px-4 text-lg border-b outline-golden bg-transparent border border-golden focus:outline-stone-700 placeholder:text-sm text-neutral-450"
                />
              </div>
            </div>
            <div className="lg:mx-2 mb-3">
              <TextArea
                placeholder={`${t("common:fs1_input5")}`}
                name={contact[4]}
                value={values[contact[4]]}
                onChange={handleChange}
                onBlur={handleBlur}
                className="block w-full py-2 px-4 text-lg border-b outline-golden resize-none bg-transparent border border-golden focus:outline-stone-700 placeholder:text-sm text-neutral-450"
              />
            </div>
            <div className="lg:mx-2">
              <FormSubmission
                isSubmitting={isSubmitting}
                errors={errors}
                touched={touched}
                setTouched={setTouched}
                text={t("common:fs1_btn2")}
                className="block w-full py-2 px-4 border-b outline-none hover:bg-white hover:text-golden font-bold resize-none bg-golden border border-golden focus:outline-stone-700 text-sm text-white"
              />
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}
