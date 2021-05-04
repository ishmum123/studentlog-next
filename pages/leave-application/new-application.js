import {useState, useRef} from "react";
import styles from '../../styles/Home.module.css'
import Head from "next/head";
import Link from "next/link";
import FileBase64 from 'react-file-base64';

const axios = require('axios');
const leave_application_api_address = "http://localhost:3001/leave_application/";

export default function NewApplication() {
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");
    const [applicationBody, setApplicationBody] = useState("");
    const [supportedDocument, setSupportedDocument] = useState("");

    const ref = useRef();

    const isValidApplicationBody = applicationBody.match(/^(\w| ){10,1000}$/);

    const isValidData = dateFrom && dateTo && isValidApplicationBody;

    const clearData = () => {
        setDateFrom("");
        setDateTo("");
        setApplicationBody("");
        setSupportedDocument("");
    }

    const postStudentApplicationData = () => {
        const confirmForm = confirm("Submit the form?");
        if (!confirmForm) {
            return
        }

        const post_body = {
            studentId: 1, //TODO: replace studentId: 1 with appropriate id
            dateFrom: dateFrom,
            dateTo: dateTo,
            applicationBody: applicationBody,
            supportedDocument: supportedDocument,
            approvedBy: null,
        };
        console.log(post_body);

        axios.post(leave_application_api_address, post_body)
            .then(resp => {
                console.log(resp.data);
                alert("Form Submitted successfully");   //TODO: check if actually successful
                clearData();
            }).catch(error => {
            console.log(error);
        });
    }

    const handleFileUpload = event => {
        console.log(event);
        setSupportedDocument(event)
    }

    return (
        <div>
            <Head>
                <title>New Leave Application</title>
                <link rel="icon" href="../../public/favicon.ico"/>
            </Head>

            <main>
                <h1 className={styles.title}>
                    Leave Application Form
                </h1>

                <br/>

                <div>
                    <p>
                        <Link href="/">
                            <a style={{color: "blue"}}>Home Page</a>
                        </Link>
                    </p>

                    <p>
                        <Link href="/leave-application">
                            <a style={{color: "blue"}}>Leave Application Home Page</a>
                        </Link>
                    </p>
                </div>

                <br/>

                <form id="leaveApplicationForm" action="none">
                    <div>
                        <label htmlFor="date_from">Date From: </label>
                        <input
                            value={dateFrom}
                            id="date_from"
                            type="date"
                            onChange={event => setDateFrom(event.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="date_to">Date To: </label>
                        <input
                            value={dateTo}
                            id="date_To"
                            type="date"
                            onChange={event => setDateTo(event.target.value)}/>
                    </div>

                    <div>
                        <label htmlFor="application_body">Application Body: </label>
                        <input
                            value={applicationBody}
                            id="date_of_birth"
                            form='leaveApplicationForm'
                            type="text"
                            onChange={event => setApplicationBody(event.target.value)}/>
                        {(applicationBody && !isValidApplicationBody) && <p style={{color: 'red'}}>
                            Application Must be between 10 to 1000 characters</p>}
                    </div>

                    <div>
                        <label htmlFor="supported_document">Supported Documents (if any): </label>
                        <FileBase64
                            ref={ref}
                            multiple={false}
                            onDone={handleFileUpload}/>
                    </div>

                    <button
                        disabled={!isValidData}
                        type="button"
                        onClick={postStudentApplicationData}>
                        Submit
                    </button>
                </form>
            </main>

            <br/>

            <footer className={styles.footer}>
            </footer>
        </div>
    );
}