import React, {useState, useRef} from "react";
import styles from '../../styles/Home.module.css'
import Head from "next/head";
import axios from "axios";
import Layout from "../../modules/shared/layout";
import {InputTextarea} from 'primereact/inputtextarea';
import {Calendar} from "primereact/calendar";
import {Button} from "primereact/button";
import {Toast} from "primereact/toast";
import {FileUpload} from "primereact/fileupload";


const leave_application_api_address = "http://localhost:8080/leave-applications/";

export default function NewApplication() {
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [applicationBody, setApplicationBody] = useState("");
  const [supportedDocument, setSupportedDocument] = useState("");

  const toast = useRef(null);

  const ref = useRef();

  const isValidApplicationBody = applicationBody.match(/^[\s\S]{10,1000}$/);

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
      return;
    }

    const post_body = {
      studentId: 1, //TODO: replace studentId: 1 with appropriate id
      dateFrom: dateFrom,
      dateTo: dateTo,
      applicationBody: applicationBody,
      supportedDocumentName: supportedDocument ? supportedDocument.name : "",
      supportedDocumentType: supportedDocument ? supportedDocument.type : "",
      supportedDocumentSize: supportedDocument ? supportedDocument.size : "",
      supportedDocumentBase64: supportedDocument ? supportedDocument.base64 : ""
    };

    axios.post(leave_application_api_address, post_body)
      .then(_ => {
        toast.current.show({
          severity: 'success',
          summary: 'Successful',
          detail: 'Form Submitted successfully',
          life: 3000
        });
        clearData();
      })
      .catch(error => console.log(error));
  }

  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

  const handleFileUpload = async event => {
    let file = {
      name: event.files[0].name,
      type: event.files[0].type,
      size: event.files[0].size,
      base64: await toBase64(event.files[0])
    }
    setSupportedDocument(file);
  }

  return (
    <Layout>
      <Toast ref={toast}/>
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

          <div className="p-fluid p-formgrid p-grid">

            <div className="p-field p-col-12 p-md-6">
              <label htmlFor="date_from">Date From</label>
              <Calendar
                monthNavigator
                dateFormat="dd-mm-yy"
                id="date_from"
                value={dateFrom}
                onChange={event => setDateFrom(event.target.value)}
              />
            </div>

            <div className="p-field p-col-12 p-md-6">
              <label htmlFor="date_to">Date To</label>
              <Calendar
                monthNavigator
                dateFormat="dd-mm-yy"
                id="date_to"
                value={dateTo}
                onChange={event => setDateTo(event.target.value)}
              />
            </div>

            <div className="p-field p-col-12">
              <label htmlFor="application_body">Application Body</label>
              <InputTextarea
                id="application_body"
                type="text"
                rows="4"
                value={applicationBody}
                onChange={event => setApplicationBody(event.target.value)}
              />
              {
                (applicationBody && !isValidApplicationBody) &&
                <small id="application_body_help" className="p-error p-d-block">
                  Application must be between 10 to 1000 characters
                </small>
              }
            </div>

            <div>
              <label htmlFor="supported_document_1">Supported Documents (if any): </label>
              <FileUpload
                name='supported_document_1' //todo: change it to every student id
                customUpload={true}
                uploadHandler={handleFileUpload}
                accept='text/*'
                maxFileSize={1000000}
                mode="basic"
                auto
              />

            </div>

            <Button
              disabled={!isValidData}
              label="Submit"
              icon="pi pi-save"
              className="p-button-success p-sm-12"
              onClick={postStudentApplicationData}/>
          </div>
        </main>

        <footer className={styles.footer}>
        </footer>
      </div>
    </Layout>
  );
}