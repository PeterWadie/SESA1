import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

export default function () {
  const { t } = useTranslation();
  const router = useRouter();
  const { locale } = router;
  return (
    <div className="mx-auto py-14 text-center">
      <Link
        href="/contact-us"
        className="px-8 py-2 border border-golden rounded-full text-lg font-light hover:bg-golden hover:text-white block max-w-fit mx-auto"
        locale={locale === "ar" ? "ar" : "en"}
      >
        {t("common:btn")}
      </Link>
    </div>
  );
}
