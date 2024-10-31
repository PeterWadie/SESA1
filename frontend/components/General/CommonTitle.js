import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

const mapper = {
  "common:layout_contact": "contact-us",
};

export default function ({ titles, projects = false }) {
  const { t } = useTranslation();
  const router = useRouter();
  const { locale } = router;
  const getPath = (name) => {
    let pathname = "";
    const query = {};
    for (let i = 0; i < titles.length; i++) {
      if (projects && i === titles.length - 1) pathname += "projects/";
      if (titles[i].subPath) {
        pathname += `[id${i}]`;
        query[`id${i}`] = titles[i].subPath;
      } else pathname += mapper[titles[i].name];
      pathname += "/";
      if (titles[i].name === name) break;
    }
    return { pathname, query };
  };
  return (
    <p className="mb-5 text-sm font-light">
      {titles.map((title, i) => (
        <Link
          key={i}
          href={getPath(title.name)}
          locale={locale === "ar" ? "ar" : "en"}
        >
          <span className={i !== titles.length - 1 ? "" : "text-creamer"}>
            {t(title.name)}
            {i !== titles.length - 1 ? " | " : null}
          </span>
        </Link>
      ))}
    </p>
  );
}
