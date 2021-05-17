import Link from 'next/link'
import { Menu } from "primereact/menu";
import { Button } from "primereact/button";
import { SelectButton } from 'primereact/selectbutton';
import { config, withTranslation } from "../../next-i18next.config";
import styles from './dashboard.module.css';

const Dashboard = ({children, t, i18n}) => {
  const items = [
    {label: 'Student List', url: '/attendance/'},
    {label: 'Attendance List', url: '/attendance/list'},
    {label: 'New Leave Application', url: '/leave-application/new-application'},
    {label: 'Pending Leave Applications', url: '/leave-application/pending-applications'},
    {label: 'Student Registration', url: '/registration'}
  ]

  return (
    <>
      <Menu id="navbar" model={items}/>
      <div className={styles.content}>
        <header className={styles.topright}>
          <nav>
            <Button
              onClick={() => window.location.href = keycloak.keycloak.createLogoutUrl()}
              className="p-button-rounded p-button-outlined p-mr-2"
            >
              <Link href="/profile">{t("profile")}</Link>
            </Button>
            <Button
              tooltip={t("logout")}
              tooltipOptions={{position: 'bottom'}}
              onClick={() => window.location.href = keycloak.keycloak.createLogoutUrl()}
              className="p-button-secondary p-button-rounded p-button-outlined"
              icon="pi pi-lock"
            />
          </nav>
        </header>
        {children}
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

Dashboard.getInitialProps = async () => ({
  namespacesRequired: ['common'],
})

export default withTranslation('common')(Dashboard);
