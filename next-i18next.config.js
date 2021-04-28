const NextI18Next = require("next-i18next").default;
const path = require("path");

module.exports = new NextI18Next({
  defaultLanguage: "en",
  otherLanguages: ["en","bn"],
  localeSubpaths: {
    es: "en",
    bn: "bn",
  },
  localePath: path.resolve("./public/locales"),
});
