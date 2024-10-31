const path = require("path");

module.exports = {
  i18n: {
    locales: ["en-ae", "en", "ar"],
    defaultLocale: "en-ae",
    localeDetection: false,
    localePath: path.resolve("./public/locales"),
    reloadOnPrerender: process.env.NODE_ENV === "development",
    lowerCaseLng: true,
  },
};
