const path = require("path");
const i18nextHttpBackend = require("i18next-http-backend/cjs").default;

module.exports = {
    i18n: {
        defaultLocale: "en",
        locales: ["en", "bn"],
    },
    backend: {
        loadPath: path.resolve("./public/locales"),
        crossDomain: true,
    },
    use: [i18nextHttpBackend],
    ns: ["common"],
    debug: true,
    serializeConfig: false,
};
