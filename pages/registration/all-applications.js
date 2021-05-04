import styles from '../../styles/Home.module.css'
import Head from "next/head";
import Link from "next/link";

const student_application_api_address = "http://localhost:8080/student-applications"

export async function getStaticProps({ params }) {
    const res = await fetch(student_application_api_address)
    const applications = await res.json()

    if (!applications) {
        return {
            notFound: true,
        }
    }
    // console.log("applications:")
    // console.log(applications);

    // Pass applications data to the page via props
    return {
        props: { applications },
        revalidate: 1,
        notFound: false
    }
}

export default function AllApplications({applications, notFound}) {
    if(notFound){
        return <div> Unable to retrieve data </div>
    }

    return (
        <div >
            <Head>
                <title>All Student Applications</title>
                <link rel="icon" href="../../public/favicon.ico"/>
            </Head>

            <main >
                <h1 className={styles.title}>
                    All Student Applications
                </h1>

                <hr/>

                <div>
                    <p><Link href ="/">
                        <a style={{color: "blue"}}>Home Page</a>
                    </Link></p>

                    <p><Link href ="/registration">
                        <a style={{color: "blue"}}>Registration Home Page</a>
                    </Link></p>
                </div>

                <hr/>

                {applications && <ol>
                    {applications.map(a => <li key={a.id}>
                        <Link href={"/registration/application/"+a.id}>
                            <a> Name: {a.name} <br/>
                                Registration ID: {a.registrationId} <br/>
                                Application Date: {String(a.appliedDate).split(/[\sT]+/)[0]} <br/>
                                Status: {a.status}
                            </a>
                        </Link>
                    </li>)}
                </ol>}

            </main>

            <footer className={styles.footer}>
            </footer>
        </div>
    );
}