import Head from 'next/head'
import Link from 'next/link'
import styles from '../../styles/Home.module.css'
import Layout from "../../modules/shared/layout";

import { Button } from 'primereact/button';
// import './ButtonDemo.css';

//TODO: create registration home page
export default function RegistrationHome() {
  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>Student Registration</title>
          <link rel="icon" href="../../public/favicon.ico"/>
        </Head>

        <main className={styles.main}>
          <h1 className={styles.title}>
            Student Registration Home
          </h1>

          <h2>
            <p style={{textAlign: "center"}}>
              <Button className="p-button-link">
                <Link href ="/registration/new-application">
                  <a >New Student Application</a>
                </Link>
              </Button>
            </p>

            <p style={{textAlign: "center"}}>
              <Button className="p-button-link">
                <Link href ="/registration/draft-application">
                  <a>Retrieve Draft Student Application</a>
                </Link>
              </Button>
            </p>

            <p style={{textAlign: "center"}}>
              <Button className="p-button-link">
                <Link href ="/registration/pending-applications">
                  <a>View Pending Applications</a>
                </Link>
              </Button>
            </p>

            <p style={{textAlign: "center"}}>
              <Button className="p-button-link">
                <Link href ="/registration/all-applications">
                  <a>View All Applications</a>
                </Link>
              </Button>
            </p>

          </h2>

        </main>

        <footer className={styles.footer}>
        </footer>
      </div>
    </>

  )
}
