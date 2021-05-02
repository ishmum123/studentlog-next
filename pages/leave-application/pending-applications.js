import {useState, useEffect} from "react";
import styles from '../../styles/Home.module.css'
import Head from "next/head";
import Link from "next/link";
import axios from "axios";


const leave_application_api_address = "http://localhost:3001/leave_application/"

export default function PendingApplications() {
    const [leaveApplicationList, setLeaveApplicationList] = useState("");

    useEffect( async () => {
        await axios.get(leave_application_api_address)
            .then(res => {
                setLeaveApplicationList(res.data.filter(a => a.approvedBy === null));
                console.log(leaveApplicationList)
            })
            .catch(error => {
                console.log("Error: " + error);
            })
    }, [setLeaveApplicationList])

    const leaveApplicationApproveProcess = (e, leaveApplication) => {
        e.preventDefault();
        axios.put(leave_application_api_address + leaveApplication.id,
            {...leaveApplication, approvedBy: 1 }) //TODO: replace approvedBy : 1 with appropriate id
            .then(res => {
                console.log("Updated attendance: ", res);
                setLeaveApplicationList(leaveApplicationList.filter(item => item.id !== leaveApplication.id));
            })
            .catch(error => {
                console.log('Error occured ' + error)
            })
    }

    return (
        <div>
            <Head>
                <title>Pending Leave Applications</title>
                <link rel="icon" href="../../public/favicon.ico"/>
            </Head>

            <main>
                <h1 className={styles.title}>
                    Pending Leave Applications
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

                <ol>
                    { leaveApplicationList && leaveApplicationList.map((leaveApplication) => (
                        <li>
                            <ul style={{listStyleType: "none"}}>
                                <form>
                                    <li>Student ID: { leaveApplication.studentId }</li>
                                    <li>Date form: { leaveApplication.dateFrom }</li>
                                    <li>Date To: { leaveApplication.dateTo }</li>
                                    <li>Application Body: { leaveApplication.applicationBody }</li>
                                    {leaveApplication.supportedDocument &&
                                        <li>Supported Document:{ leaveApplication.supportedDocument.name }</li>
                                    }
                                    <button
                                        type="button"
                                        onClick={e => leaveApplicationApproveProcess(e, leaveApplication)}>
                                        Approve
                                    </button>
                                </form>
                            </ul>
                        </li>
                    ))}
                </ol>



            </main>

            <br/>

            <footer className={styles.footer}>
            </footer>
        </div>
    );
}