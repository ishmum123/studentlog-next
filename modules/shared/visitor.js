import styles from './visitor.module.css';
import Image from 'next/image';
import { useKeycloak } from "@react-keycloak/ssr";
import { Button } from 'primereact/button';
import { useRouter } from "next/router";
import { useEffect } from "react";

const Visitor = () => {
  const keycloak = useKeycloak();
  const router = useRouter();

  useEffect(() => {
    if (router.pathname !== '/') {
      router.push('/');
    }
  }, [router.pathname]);

  return (
    <div className={styles.bgimg}>
      <div className={styles.topleft}>
        <Image src="/logo.jpeg" alt="me" width="64" height="64"/>
      </div>
      <div className={styles.middle}>
        <h1>Student Management</h1>
      </div>
      <div className={styles.topright}>
        <Button
          label="Login"
          onClick={() => window.location.href = keycloak.keycloak.createLoginUrl()}
          className="p-button-raised p-button-warning"
          icon="pi pi-user"
        />
      </div>
    </div>
  );
}

export default Visitor;