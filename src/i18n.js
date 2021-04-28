const NextI18Next = require("next-i18next").default;
const path = require("path");

module.exports = new NextI18Next({
  defaultLanguage: "en",
  otherLanguages: ["nl", "no", "es","bn"],
  localeSubpaths: {
    nl: "nl",
    no: "no",
    es: "es",
    bn: "bn",
  },
  localePath: path.resolve("./public/static/locales"),
});
