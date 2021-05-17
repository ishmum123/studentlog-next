import styles from '../../styles/Home.module.css'
import Head from "next/head";
import Link from "next/link";
import Layout from "../../modules/shared/layout";
import ApplicationsTable from "../../modules/registration/application_table";
import {Button} from "primereact/button";
import { Divider } from 'primereact/divider';

const student_application_api_address = "http://localhost:8080/student-applications"

export async function getStaticProps({ params }) {
  const res = await fetch(student_application_api_address)
  const applications = await res.json()

  if (!applications) {
    return {
      notFound: true,
    }
  }

  // Pass applications data to the page via props
  return {
    props: { applications },
    revalidate: 1,
    notFound: false
  }
}

export default function AllApplications({applications, notFound}) {

  return (
    <>
      <div >
        <Head>
          <title>All Student Applications</title>
          <link rel="icon" href="../../public/favicon.ico"/>
        </Head>

        <main >
          <h1 className={styles.title}>
            All Student Applications
          </h1>

          <Divider />

          <div className="card">
            <p><Button className="p-button-link">
              <Link href ="/">
                <a>Home Page</a>
              </Link>
            </Button></p>

            <p><Button className="p-button-link">
              <Link href ="/registration">
                <a>Registration Home Page</a>
              </Link>
            </Button></p>
          </div>

          <Divider />

          <ApplicationsTable applications={applications}
                             notFound={notFound}/>

        </main>

        <footer className={styles.footer}>
        </footer>
      </div>
    </>

  );
}