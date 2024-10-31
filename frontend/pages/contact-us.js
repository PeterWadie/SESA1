import Head from "next/head";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import ContactUs from "../components/ContactUs/ContactUs";

export default function () {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{`${t("common:layout_contact")}`}</title>
      </Head>
      <ContactUs />
    </>
  );
}
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
    revalidate: 60 * 60 * 12,
  };
}
