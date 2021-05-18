import Link from 'next/link'
import { Button } from "primereact/button";
import { SelectButton } from 'primereact/selectbutton';
import { config, withTranslation } from "../../next-i18next.config";
import styles from './dashboard.module.css';
import Menu from "./menu";
import { useKeycloak } from "@react-keycloak/ssr";

const Dashboard = ({children, t, i18n}) => {
  const keycloak = useKeycloak();

  return (
    <>
      <Menu/>
      <div className={styles.content}>
        <div className={styles.header}>
          <Button className="p-button-rounded p-button-outlined p-mr-2">
            <Link href="/profile">{t("profile")}</Link>
          </Button>
          <Button
            tooltip={t("logout")}
            tooltipOptions={{position: 'bottom'}}
            onClick={() => window.location.href = keycloak.keycloak.createLogoutUrl()}
            className="p-button-secondary p-button-rounded p-button-outlined"
            icon="pi pi-lock"
          />
        </div>
        <div className={styles.children}>{children}</div>
        <SelectButton
          value={i18n.language}
          options={config.allLanguages}
          onChange={({value}) => i18n.changeLanguage(value)}
          itemTemplate={locale => locale.toUpperCase()}
          className={styles.bottomright}
        />
      </div>
    </>
  );
}

Dashboard.getInitialProps = async () => (
  {
    namespacesRequired: ['common'],
  }
)

export default withTranslation('common')(Dashboard);
