import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {withTranslation} from "../next-i18next.config";
import {I18nContext} from "next-i18next";
import {i18n, config, Link} from "../next-i18next.config";
import {useContext} from "react";

const Home = ({t, i18n}) => {

  const {i18n: {language}} = useContext(I18nContext);

  const onLocaleChangeClick = (locale) => {
      console.log(locale);
      i18n.changeLanguage(locale);
  };

  return (

      <>
        <div>
          {config.allLanguages.map((locale) => (

              <button key={locale} onClick={() => onLocaleChangeClick(locale)}>
                {`${locale.toUpperCase()}`}
              </button>
          ))}
        </div>
        <div>


          {t("welcomeMessage")}

        </div>

        <div>

        </div>
      </>
  )
}
export default withTranslation("common")(Home);
