import {useState} from "react";
import styles from '../../styles/Home.module.css'
import Head from "next/head";
import Link from "next/link";


const post_api_address = "http://localhost:3001/student_application"

export default function NewApplication() {
    const [name, setName] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [bloodGroup, setBloodGroup] = useState("");
    const [birthRegistrationId, setBirthRegistrationId] = useState("");
    const [registrationId, setRegistrationId] = useState("");
    const [presentAddress, setPresentAddress] = useState("");
    const [permanentAddress, setPermanentAddress] = useState("");
    const [guardianName, setGuardianName] = useState("");
    const [guardianEmail, setGuardianEmail] = useState("");
    const [guardianPhone, setGuardianPhone] = useState("");
    const [appliedForGrade, setAppliedForGrade] = useState("");

    const isValidName = name.match(/^(\w| ){5,50}$/);
    const isValidDateOfBirth = dateOfBirth.match(/^[\d]{4}-[\d]{2}-[\d]{2}$/);
    const isValidBloodGroup = bloodGroup.match(/^(A|B|AB|O)[+-]$/);
    const isValidBirthRegistrationId = birthRegistrationId.match(/^[\d]{8,20}$/);
    const isValidRegistrationId = registrationId.match(/^[\d]{8,20}$/);
    const isValidPresentAddress = presentAddress.match(/^(\w| ){5,100}$/);
    const isValidPermanentAddress = permanentAddress.match(/^(\w| ){5,100}$/);
    const isValidGuardianName = guardianName.match(/^(\w| ){5,100}$/);
    const isValidGuardianEmail = true;
    const isValidGuardianPhone = guardianPhone.match(/^(\+88)?01[0-9]{9}$/);
    const isValidAppliedForGrade = appliedForGrade.match(/^([\d]|10)$/)

    const isValidData = isValidName && isValidDateOfBirth && isValidBloodGroup && isValidBirthRegistrationId
        && isValidRegistrationId && isValidPresentAddress && isValidPermanentAddress && isValidGuardianName
        && isValidGuardianEmail && isValidGuardianPhone && isValidAppliedForGrade;

    const getDate = () => {
        //TODO: generate appropriate date format
        let date = new Date();

        console.log(date)
        return date;
    }

    const clearData = () =>{
        setName("");
        setDateOfBirth("");
        setBloodGroup("");
        setBirthRegistrationId("");
        setRegistrationId("");
        setPresentAddress("");
        setPermanentAddress("");
        setGuardianName("");
        setGuardianEmail("");
        setGuardianPhone("");
        setAppliedForGrade("");
    }

    const postStudentApplicationData = (e) => {
        const confirmForm = confirm("Submit the form?");
        if(!confirmForm){return}

        const post_body = {
            applied_date: getDate(),
            approved_by_id: null,
            name: name,
            date_of_birth: dateOfBirth+" 06:00:01",
            blood_group: bloodGroup,
            birth_registration_id: birthRegistrationId,
            registration_id: registrationId,
            present_address: presentAddress,
            permanent_address: permanentAddress,
            guardian_name: guardianName,
            guardian_email: guardianEmail,
            guardian_phone: guardianPhone,
            applied_for_grade: appliedForGrade
        };
        console.log(post_body);

        const axios = require('axios');
        axios.post(post_api_address, post_body).then(resp => {
            console.log(resp.data);
            alert("Form Submitted successfully");   //TODO: check if actually successful
            clearData();
        }).catch(error => {
            console.log(error);
        });

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

                <form id="applicationForm" action="none">
                    <div>
                        <label htmlFor="name">Student Name:</label>
                        <input
                            value={name}
                            id="name"
                            type="text"
                            onChange={event => setName(event.target.value)} />
                        {(name && !isValidName) && <p style={{color: 'red'}}>
                            Name must be between 5 to 50 characters</p>}
                    </div>

                    <div>
                        <label htmlFor="date_of_birth">Date of Birth:</label>
                        <input
                            value={dateOfBirth}
                            id="date_of_birth"
                            type="text"
                            onChange={event => setDateOfBirth(event.target.value)} />
                        {(dateOfBirth && !isValidDateOfBirth) && <p style={{color: 'red'}}>
                            Date must be in yyyy-mm-dd format</p>}
                    </div>

                    <div>
                        <label htmlFor="blood_group">Blood Group:</label>
                        <input
                            value={bloodGroup}
                            id="blood_group"
                            type="text"
                            onChange={event => setBloodGroup(event.target.value)} />
                        {(bloodGroup && !isValidBloodGroup) && <p style={{color: 'red'}}>
                            Invalid blood group</p>}
                    </div>

                    <div>
                        <label htmlFor="birth_registration_id">Birth Registration ID:</label>
                        <input
                            value={birthRegistrationId}
                            id="birth_registration_id"
                            type="text"
                            onChange={event => setBirthRegistrationId(event.target.value)} />
                        {(birthRegistrationId && !isValidBirthRegistrationId) && <p style={{color: 'red'}}>
                            Birth Registration ID must be between 8 to 20 digits</p>}
                    </div>

                    <div>
                        <label htmlFor="registration_id">Registration ID:</label>
                        <input
                            value={registrationId}
                            id="registration_id"
                            type="text"
                            onChange={event => setRegistrationId(event.target.value)} />
                        {(registrationId && !isValidRegistrationId) && <p style={{color: 'red'}}>
                            Registration ID must be between 8 to 20 digits</p>}
                    </div>

                    <div>
                        <label htmlFor="present_address">Present Address:</label>
                        <input
                            value={presentAddress}
                            id="present_address"
                            type="text"
                            onChange={event => setPresentAddress(event.target.value)} />
                        {(presentAddress && !isValidPresentAddress) && <p style={{color: 'red'}}>
                            Present Address must be between 5 to 100 characters</p>}
                    </div>

                    <div>
                        <label htmlFor="permanent_address">Permanent Address:</label>
                        <input
                            value={permanentAddress}
                            id="permanent_address"
                            type="text"
                            onChange={event => setPermanentAddress(event.target.value)} />
                        {(permanentAddress && !isValidPermanentAddress) && <p style={{color: 'red'}}>
                            Permanent Address must be between 5 to 100 characters</p>}
                    </div>

                    <div>
                        <label htmlFor="guardian_name">Guardian Name:</label>
                        <input
                            value={guardianName}
                            id="guardian_name"
                            type="text"
                            onChange={event => setGuardianName(event.target.value)} />
                        {(guardianName && !isValidGuardianName) && <p style={{color: 'red'}}>
                            Guardian Name must be between 5 to 50 characters</p>}
                    </div>

                    <div>
                        <label htmlFor="guardian_email">Guardian Email:</label>
                        <input
                            value={guardianEmail}
                            id="guardian_email"
                            type="text"
                            onChange={event => setGuardianEmail(event.target.value)} />
                        {(guardianEmail && !isValidGuardianEmail) && <p style={{color: 'red'}}>
                            Invalid Guardian Email Entered</p>}
                    </div>

                    <div>
                        <label htmlFor="guardian_phone">Guardian Phone:</label>
                        <input
                            value={guardianPhone}
                            id="guardian_phone"
                            type="text"
                            onChange={event => setGuardianPhone(event.target.value)} />
                        {(guardianPhone && !isValidGuardianPhone) && <p style={{color: 'red'}}>
                            Invalid Phone Number Entered</p>}
                    </div>

                    <div>
                        <label htmlFor="applied_for_grade">Applied for Grade:</label>
                        <input
                            value={appliedForGrade}
                            id="applied_for_grade"
                            type="text"
                            onChange={event => setAppliedForGrade(event.target.value)} />
                        {(appliedForGrade && !isValidAppliedForGrade) && <p style={{color: 'red'}}>
                            Invalid Grade Entered</p>}
                    </div>

                    <hr/>

                    <button
                        disabled={!isValidData}
                        type="button"
                        onClick={postStudentApplicationData}>
                        Submit
                    </button>
                </form>
            </main>

            <footer className={styles.footer}>
            </footer>
        </div>
    );
}