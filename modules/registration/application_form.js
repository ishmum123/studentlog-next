import React, {useEffect, useRef, useState} from "react";
import {useRouter} from "next/router";
import {InputText} from "primereact/inputtext";
import { Divider } from 'primereact/divider';
import {Button} from "primereact/button";
import { InputTextarea } from 'primereact/inputtextarea';
import 'primeflex/primeflex.css';
import {Calendar} from "primereact/calendar";
import { confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';

const axios = require('axios')
const student_application_api_address = "http://localhost:8080/student-applications"


const clean = (obj) => {
  let cleanedObj = {};
  Object.getOwnPropertyNames(obj).forEach(propName => {
    if (obj[propName]) {
      cleanedObj[propName] = obj[propName]
    }
  })
  return cleanedObj;
}

export default function ApplicationForm(props){
  const router = useRouter();

  const applicationToast = useRef(null);

  const applicationId = props.applicationId;
  const retrievedData = props.retrievedData

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

  const [buttonsDisabled, setButtonsDisabled] = useState(false);
  const [onHideAction, setOnHideAction] = useState("");

  const onToastHide = () => {
    if(onHideAction==="registration"){
        router.push("/registration");
    }
    if(onHideAction==="application"){
      router.push("/registration/application/"+applicationId);
    }
  }

  useEffect(() => { // side effect hook
    if(retrievedData){
      setName(retrievedData.name ? String(retrievedData.name) : "");
      setDateOfBirth(retrievedData.dateOfBirth ? new Date(retrievedData.dateOfBirth): "");
      setBloodGroup(retrievedData.bloodGroup ? String(retrievedData.bloodGroup) : "");
      setBirthRegistrationId(retrievedData.birthRegistrationId ? String(retrievedData.birthRegistrationId) : "");
      setRegistrationId(retrievedData.registrationId ? String(retrievedData.registrationId) : "");
      setPresentAddress(retrievedData.presentAddress ? String(retrievedData.presentAddress) : "");
      setPermanentAddress(retrievedData.permanentAddress ? String(retrievedData.permanentAddress) : "");
      setGuardianName(retrievedData.guardianName ? String(retrievedData.guardianName) : "");
      setGuardianEmail(retrievedData.guardianEmail ? String(retrievedData.guardianEmail) : "");
      setGuardianPhone(retrievedData.guardianPhone ? String(retrievedData.guardianPhone) : "");
      setAppliedForGrade(retrievedData.appliedForGrade ? String(retrievedData.appliedForGrade) : "");
    }
  }, [retrievedData]);

  const isValidName = name.match(/^(\w| ){5,50}$/);
  const isValidDateOfBirth = !isNaN(new Date(dateOfBirth).getTime());
  const isValidBloodGroup = bloodGroup.match(/^(A|B|AB|O)[+-]$/);
  const isValidBirthRegistrationId = birthRegistrationId.match(/^[\d]{8,20}$/);
  const isValidRegistrationId = registrationId.match(/^[\d]{8,20}$/);
  const isValidPresentAddress = presentAddress.match(/^(\w| ){5,100}$/);
  const isValidPermanentAddress = permanentAddress.match(/^(\w| ){5,100}$/);
  const isValidGuardianName = guardianName.match(/^(\w| ){5,100}$/);
  const isValidGuardianEmail = true;
  const isValidGuardianPhone = guardianPhone.match(/^(\+88)?01[0-9]{9}$/);
  const isValidAppliedForGrade = appliedForGrade.match(/^([\d]|10)$/)

  const isValidData = !!(isValidName && isValidDateOfBirth && isValidBloodGroup && isValidBirthRegistrationId
    && isValidRegistrationId && isValidPresentAddress && isValidPermanentAddress && isValidGuardianName
    && isValidGuardianEmail && isValidGuardianPhone && isValidAppliedForGrade);

  const getDate = () => {
    //TODO: generate appropriate date format
    return new Date();
  }

  const postStudentApplicationData = (status) => {
    if(!applicationId){
      setButtonsDisabled(true);
      setOnHideAction("registration");
      applicationToast.current.show({severity:'error', summary: 'Error Occurred',
        detail:"Application ID: " + applicationId, life: 3000});
    }
    let application_body = {
      id: applicationId,
      appliedDate: getDate(),
      decidedById: null,
      name: name,
      dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
      bloodGroup: bloodGroup,
      birthRegistrationId: birthRegistrationId,
      registrationId: registrationId,
      presentAddress: presentAddress,
      permanentAddress: permanentAddress,
      guardianName: guardianName,
      guardianEmail: guardianEmail,
      guardianPhone: guardianPhone,
      appliedForGrade: appliedForGrade,
      status: status
    };
    const cleaned_application_body =  clean(application_body);

    axios.patch(student_application_api_address+"/"+applicationId, cleaned_application_body).then(resp => {
      if(status === "draft"){
        setOnHideAction("");
        applicationToast.current.show({severity:'success', summary: 'Draft Saved Successfully',
          detail:"Application ID: "+applicationId, life: 3000});
      }
      else if(status === "submitted"){
        setButtonsDisabled(true);
        setOnHideAction("application");
        applicationToast.current.show({severity:'success', summary: 'Application Submitted Successfully',
          detail:"Application ID: "+applicationId, life: 3000});
      }
    }).catch(error => {
      // console.log(error);
      setButtonsDisabled(true);
      setOnHideAction("registration");
      applicationToast.current.show({severity:'error', summary: 'Error Occurred',
        detail:"Failed", life: 3000});
    });

  }

  const confirmApplication = (msg, status) => {
    confirmDialog({
      message: msg,
      header: 'Confirmation',
      icon: 'pi pi-save',
      accept: () => postStudentApplicationData(status)
    });
  }

  const saveStudentApplicationData = (e) =>{
    e.preventDefault();
    confirmApplication("Save the form?", "draft")
  }

  const submitStudentApplicationData = (e) => {
    e.preventDefault();
    confirmApplication("Submit the form?", "submitted")
  }

  return (
    <React.Fragment>
      <Toast  id="application_toast"
              ref={applicationToast}
              position="top-right"
              onHide={onToastHide}
      />

      <form id="applicationForm" action="none">
        <div className="p-field p-grid">
          {/*TODO: use registration Id to retrieve when backend is integrated*/}
          <label htmlFor="id" className="p-col-fixed" style={{width:'180px'}}>Application id:</label>
          <div className="p-col">
            <InputText
              value={applicationId}
              id="id"
              type="text"
              style={{width:'300px'}}
              disabled
            />
            <small id="id-help" className="p-d-block">
              Please keep this ID for retrieval.
            </small>
          </div>

        </div>

        <div className="p-field p-grid">
          <label htmlFor="name" className="p-col-fixed" style={{width:'180px'}}>Student Name:</label>
          <div className="p-col">
            <InputText
              value={name}
              id="name"
              type="text"
              style={{width:'300px'}}
              onChange={event => setName(event.target.value)} />
            {(name && !isValidName) && <small id="id-help" className="p-d-block">
              Name must be between 5 to 50 characters.
            </small>}
          </div>
        </div>

        <div className="p-field p-grid">
          <label htmlFor="date_of_birth" className="p-col-fixed" style={{width:'180px'}}>Date of Birth:</label>
          <div className="p-col">
            <Calendar
              monthNavigator
              yearNavigator
              yearRange="1900:2100"
              dateFormat="yy-mm-dd"
              id="date_of_birth"
              value={new Date(dateOfBirth)}
              onChange={event => setDateOfBirth(event.target.value)}
            />
          </div>
        </div>

        <div className="p-field p-grid">
          <label htmlFor="blood_group" className="p-col-fixed" style={{width:'180px'}}>Blood Group:</label>
          <div className="p-col">
            <InputText
              value={bloodGroup}
              id="blood_group"
              type="text"
              style={{width:'300px'}}
              onChange={event => setBloodGroup(event.target.value)} />
            {(bloodGroup && !isValidBloodGroup) && <small id="id-help" className="p-d-block">
              Invalid blood group.
            </small>}
          </div>
        </div>

        <div className="p-field p-grid">
          <label htmlFor="birth_registration_id" className="p-col-fixed" style={{width:'180px'}}>Birth Registration ID:</label>
          <div className="p-col">
            <InputText
              value={birthRegistrationId}
              id="birth_registration_id"
              type="text"
              style={{width:'300px'}}
              onChange={event => setBirthRegistrationId(event.target.value)} />
            {(birthRegistrationId && !isValidBirthRegistrationId) && <small id="id-help" className="p-d-block">
              Birth Registration ID must be between 8 to 20 digits.
            </small>}
          </div>
        </div>

        <div className="p-field p-grid">
          <label htmlFor="registration_id" className="p-col-fixed" style={{width:'180px'}}>Registration ID:</label>
          <div className="p-col">
            <InputText
              value={registrationId}
              id="registration_id"
              type="text"
              style={{width:'300px'}}
              onChange={event => setRegistrationId(event.target.value)} />
            {(registrationId && !isValidRegistrationId) && <small id="id-help" className="p-d-block">
              Registration ID must be between 8 to 20 digits.
            </small>}
          </div>
        </div>

        <div className="p-field p-grid">
          <label htmlFor="present_address" className="p-col-fixed" style={{width:'180px'}}>Present Address:</label>
          <div className="p-col">
            <InputTextarea
              value={presentAddress}
              id="present_address"
              type="text"
              style={{width:'300px'}}
              rows="2"
              onChange={event => setPresentAddress(event.target.value)} />
            {(presentAddress && !isValidPresentAddress) && <small id="id-help" className="p-d-block">
              Present Address must be between 5 to 100 characters.
            </small>}
          </div>
        </div>

        <div className="p-field p-grid">
          <label htmlFor="permanent_address" className="p-col-fixed" style={{width:'180px'}}>Permanent Address:</label>
          <div className="p-col">
            <InputTextarea
              value={permanentAddress}
              id="permanent_address"
              type="text"
              style={{width:'300px'}}
              rows="2"
              onChange={event => setPermanentAddress(event.target.value)} />
            {(permanentAddress && !isValidPermanentAddress) && <small id="id-help" className="p-d-block">
              Permanent Address must be between 5 to 100 characters.
            </small>}
          </div>
        </div>

        <div className="p-field p-grid">
          <label htmlFor="guardian_name" className="p-col-fixed" style={{width:'180px'}}>Guardian Name:</label>
          <div className="p-col">
            <InputText
              value={guardianName}
              id="guardian_name"
              type="text"
              style={{width:'300px'}}
              onChange={event => setGuardianName(event.target.value)} />
            {(guardianName && !isValidGuardianName) && <small id="id-help" className="p-d-block">
              Guardian Name must be between 5 to 50 characters.
            </small>}
          </div>
        </div>

        <div className="p-field p-grid">
          <label htmlFor="guardian_email" className="p-col-fixed" style={{width:'180px'}}>Guardian Email:</label>
          <div className="p-col">
            <InputText
              value={guardianEmail}
              id="guardian_email"
              type="text"
              style={{width:'300px'}}
              onChange={event => setGuardianEmail(event.target.value)} />
            {(guardianEmail && !isValidGuardianEmail) && <small id="id-help" className="p-d-block">
              Invalid Guardian Email Entered.
            </small>}
          </div>
        </div>

        <div className="p-field p-grid">
          <label htmlFor="guardian_phone" className="p-col-fixed" style={{width:'180px'}}>Guardian Phone:</label>
          <div className="p-col">
            <InputText
              value={guardianPhone}
              id="guardian_phone"
              type="text"
              style={{width:'300px'}}
              onChange={event => setGuardianPhone(event.target.value)} />
            {(guardianPhone && !isValidGuardianPhone) && <small id="id-help" className="p-d-block">
              Invalid Phone Number Entered.
            </small>}
          </div>
        </div>

        <div className="p-field p-grid">
          <label htmlFor="applied_for_grade" className="p-col-fixed" style={{width:'180px'}}>Applied for Grade:</label>
          <div className="p-col">
            <InputText
              value={appliedForGrade}
              id="applied_for_grade"
              type="text"
              style={{width:'300px'}}
              onChange={event => setAppliedForGrade(event.target.value)} />
            {(appliedForGrade && !isValidAppliedForGrade) && <small id="id-help" className="p-d-block">
              Invalid Grade Entered.
            </small>}
          </div>
        </div>

        <Divider/>

        <div style={{ margin: "auto", marginBottom: "1em" }}>
          <Button
            onClick={saveStudentApplicationData}
            icon="pi pi-save"
            className="p-button-success p-mr-2"
            style={{width:'150px'}}
            label="Save Draft"
            disabled={buttonsDisabled}
          />

          <Button
            disabled={!isValidData || buttonsDisabled}
            onClick={submitStudentApplicationData}
            icon="pi pi-check"
            className="p-button-primary p-mr-2"
            style={{width:'150px'}}
            label="Submit"
          />
        </div>

      </form>
    </React.Fragment>

  );
}