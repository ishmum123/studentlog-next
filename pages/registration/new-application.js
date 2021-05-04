import {useEffect, useState} from "react";
import styles from '../../styles/Home.module.css'
import Head from "next/head";
import Link from "next/link";
import ApplicationForm from "../../modules/registration/application_form";


const axios = require('axios')
const student_application_api_address = "http://localhost:8080/student-applications"

export default function NewApplication() {
    const [applicationId, setApplicationId] = useState(null);

    useEffect(() => { // side effect hook
        //generating a blank form for getting a unique id for saving as draft
        const application_body = {
            appliedDate: new Date(),
            status: "draft"
        };
        axios.post(student_application_api_address, application_body).then(resp => {
            console.log(resp.data);
            setApplicationId(resp.data.id);
        }).catch(error => {
            console.log(error);
        });

    }, []);

    if(!applicationId){
        return <div>Loading...</div>
    }

    return (
        <div >
            <Head>
                <title>New Student Registration</title>
                <link rel="icon" href="../../public/favicon.ico"/>
            </Head>

            <main >
                <h1 className={styles.title}>
                    Student Application Form
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

                <ApplicationForm applicationId={applicationId}
                                 retrievedData={null}/>

            </main>

            <footer className={styles.footer}>
            </footer>
        </div>
    );
}
