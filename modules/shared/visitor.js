import styles from './visitor.module.css';
import Image from 'next/image';
import {useKeycloak} from "@react-keycloak/ssr";
import { Button } from 'primereact/button';

const Visitor = () => {
  const keycloak = useKeycloak();

  const createLogin = () => window.location.href = keycloak.keycloak.createLoginUrl();
  return (
    <div className={styles.body}>
      <div className={styles.bgimg}>
        <div className={styles.topleft}>
          <Image src="/logo.jpeg" alt="me" width="64" height="64" />
        </div>
        <div className={styles.middle}>
          <h1>Student Management</h1>
        </div>
        <div className={styles.topright}>
          <Button
            label="Login"
            onClick={createLogin}
            className="p-button-raised p-button-warning"
            icon="pi pi-lock-open"
          />
        </div>
      </div>
    </div>
  );
}

export default Visitor;