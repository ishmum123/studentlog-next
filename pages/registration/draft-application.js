import {useEffect, useState} from "react";
import styles from '../../styles/Home.module.css'
import Head from "next/head";
import Link from "next/link";
import ApplicationForm from "../../modules/registration/application_form";


const axios = require('axios')
const student_application_api_address = "http://localhost:8080/student-applications"

export default function DraftApplication() {
    const [applicationId, setApplicationId] = useState("");
    const [applicationData, setApplicationData] = useState(null);

    const retrieveApplication = () => {
        if(!applicationId){
            return;
        }
        axios.get(student_application_api_address+"/"+applicationId, ).then(resp => {
            if(resp.data.status !== "draft"){
                alert("Application not draft with application ID: " + applicationId);
                return;
            }
            console.log(resp.data);
            setApplicationData(resp.data);

        }).catch(error => {
            alert("Application not found with application ID: " + applicationId);
            console.log(error);
        });
    }

    return (
        <div >
            <Head>
                <title>Student Registration</title>
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
                    <form id="searchForm" action="none">
                        <div>
                            <label htmlFor="id">Application id:</label>
                            <input
                                value={applicationId}
                                id="id"
                                type="text"
                                disabled={applicationData}
                                onChange={event => setApplicationId(event.target.value)}
                            />
                            <button
                                type="button"
                                disabled={applicationData}
                                onClick={retrieveApplication}>
                                Retrieve Application
                            </button>
                        </div>
                    </form>

                <hr/>

                {applicationData && <ApplicationForm applicationId={applicationId}
                                 retrievedData={applicationData}/>}

            </main>

            <footer className={styles.footer}>
            </footer>
        </div>
    );
}
