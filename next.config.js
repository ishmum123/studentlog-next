const { nextI18NextRewrites } = require("next-i18next/rewrites");

const localeSubpaths = {
  nl: "nl",
  no: "no",
  es: "es",
  bn: "bn"
};

module.exports = {
  rewrites: async () => nextI18NextRewrites(localeSubpaths),
  publicRuntimeConfig: {
    localeSubpaths,
  },
};
