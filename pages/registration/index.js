import Head from 'next/head'
import Link from 'next/link'
import styles from '../../styles/Home.module.css'

//TODO: create registration home page
export default function RegistrationHome() {
  return (
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
            <p><Link href ="/registration/new-application">
            <a style={{color: "blue"}}>New Student Application</a>
            </Link></p>

            <p><Link href ="/registration/draft-application">
                <a style={{color: "blue"}}>Retrieve Draft Student Application</a>
            </Link></p>

            <p><Link href ="/registration/pending-applications">
                <a style={{color: "blue"}}>View Pending Applications</a>
            </Link></p>

            <p><Link href ="/registration/all-applications">
              <a style={{color: "blue"}}>View All Applications</a>
            </Link></p>

        </h2>

      </main>

      <footer className={styles.footer}>
      </footer>
    </div>
  )
}
