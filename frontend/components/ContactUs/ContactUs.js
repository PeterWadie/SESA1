import "react-phone-number-input/style.css";

import { useTranslation } from "next-i18next";

import CommonLayout from "../Layouts/CommonLayout";
import ContactForm from "./ContactForm";

export default function () {
  const { t } = useTranslation();
  return (
    <CommonLayout
      titles={[
        { name: "common:layout_home" },
        { name: "common:layout_contact" },
      ]}
    >
      <div className="w-2/3 mx-auto">
        <h2 className="text-center text-3xl sm:text-4xl font-extralight p-4">
          {t("common:contact_h1")}
        </h2>
        <p className="text-white font-extralight text-center p-2">
          {t("common:contact_p")}
        </p>
      </div>
      <div className="mx-auto m-8">
        <ContactForm />
      </div>
    </CommonLayout>
  );
}
