import { useTranslation } from "next-i18next";

import Button from "./Button";
import Loading from "./Loading";

export default function ({
  isSubmitting,
  errors,
  touched,
  setTouched,
  className,
  text = "Submit",
  payment = false,
}) {
  const { t } = useTranslation();
  return isSubmitting ? (
    <Loading />
  ) : (
    <>
      <Button
        text={text}
        className={className}
        onClick={(e) => {
          const keys = Object.keys(errors);
          if (keys.length) {
            e.preventDefault();
            if (!payment)
              setTouched(
                keys.reduce((obj, key) => {
                  obj[key] = true;
                  return obj;
                }, {}),
              );
          }
        }}
      />
      {Object.keys(touched).some((key) => Object.keys(errors).includes(key)) ? (
        <div className="text-red-500 normal-case">
          {Object.keys(errors)
            .map((prop) => (touched[prop] ? errors[prop] : ""))
            .filter((prop) => prop !== "")
            .join(", ")}{" "}
          {t("common:empty_err")}
        </div>
      ) : null}
    </>
  );
}
