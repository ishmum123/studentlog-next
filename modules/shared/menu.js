import Link from 'next/link'
import { withTranslation } from "next-i18next";
import styles from './menu.module.css';
import { useKeycloak } from "@react-keycloak/ssr";

const Menu = ({t}) => {
  const items = [
    {label: t('students'), url: '/attendance/', role: 'teacher'},
    {label: t('attendance'), url: '/attendance/list', role: 'teacher'},
    {label: t('new_leave_application'), url: '/leave-application/new-application', role: 'student'},
    {label: t('pending_leave_applications'), url: '/leave-application/pending-applications', role: 'teacher'},
    {label: t('student_registration'), url: '/registration', role: 'admin'}
  ]

  const keycloak = useKeycloak();

  const menuItems = keycloak.keycloak.tokenParsed ?
    items.filter(item => keycloak.keycloak.tokenParsed.realm_access.roles.includes(item.role)) :
    [];

  return (
    <div className={styles.menu}>
      {menuItems.map(item =>
        <Link href={item.url} key={item.label}>
          <a className={styles.menuItem + " p-d-block"}>{item.label}</a>
        </Link>)
      }
    </div>
  );
}

Menu.getInitialProps = async () => (
  {
    namespacesRequired: ['common'],
  }
)

export default withTranslation('common')(Menu);
