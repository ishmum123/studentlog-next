
import {i18n, config, Link} from "../next-i18next.config";
import { I18nContext } from "next-i18next";
import { useContext } from "react";

const LocalePicker = () => {
  const {
    i18n: { language },
  } = useContext(I18nContext);

  return (

      <div>
        {config.allLanguages.map((locale) => (

            <button onClick={() => i18n.changeLanguage(locale)}>
              {` ${locale.toUpperCase()}`}
            </button>
        ))}
      </div>

  );
};

export default LocalePicker;
