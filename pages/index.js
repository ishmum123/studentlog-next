import { config, Link, withTranslation } from "../next-i18next.config";
import { default as React } from "react";

import { useKeycloak } from "@react-keycloak/ssr";
import { Button } from "primereact/button";

const Home = ({t, i18n}) => {
  const keycloak = useKeycloak();

  return (
    <>
    </>
  );
};

Home.getInitialProps = async () => ({
  namespacesRequired: ['common'],
})


export default withTranslation('common')(Home);

