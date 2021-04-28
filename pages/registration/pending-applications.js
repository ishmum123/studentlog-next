import styles from '../../styles/Home.module.css'
import Head from "next/head";
import Link from "next/link";

const student_application_api_address = "http://localhost:3001/student_application"

// used server side rendering for now. need discussion and further understanding
export async function getServerSideProps({ params }) {
    const res = await fetch(student_application_api_address)
    const applications = await res.json()

    if (!applications) {
        return {
            notFound: true,
        }
    }
    // console.log("applications:")
    // console.log(applications);

    //TODO: add submitted flag in db
    //this filter includes if submitted flag is absent from application
    const pendingApplications = applications.filter(a =>
        !a.approved_by_id
        // && a.submitted
)

    // Pass applications data to the page via props
    return {
        props: { pendingApplications },
        notFound: false
    }
}

export default function PendingApplications({pendingApplications, notFound}) {
    if(notFound){
        return <div> Unable to retrieve data </div>
    }

    return (
        <div >
            <Head>
                <title>Pending Student Applications</title>
                <link rel="icon" href="../../public/favicon.ico"/>
            </Head>

            <main >
                <h1 className={styles.title}>
                    Pending Student Applications
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

                {pendingApplications && <ol>
                    {pendingApplications.map(a => <li key={a.id}>
                        <Link href={"/registration/application/"+a.id}>
                            <a> Name: {a.name} <br/>
                                Registration ID: {a.registration_id} <br/>
                                Application Date: {String(a.applied_date).split(/[\sT]+/)[0]}
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