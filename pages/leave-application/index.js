import Head from 'next/head'
import Link from 'next/link'
import styles from '../../styles/Home.module.css'

export default function LeaveApplicationHome() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Leave Application Management</title>
        <link rel="icon" href="../../public/favicon.ico"/>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
            Leave Application Management
        </h1>

        <h2>
            <p><Link href ="/leave-application/new-application">
            <a style={{color: "blue"}}>New Student Application</a>
            </Link></p>

            <p><Link href ="/leave-application/pending-applications">
                <a style={{color: "blue"}}>View Pending Applications</a>
            </Link></p>
        </h2>
      </main>

      <footer className={styles.footer}>
      </footer>
    </div>
  )
}
