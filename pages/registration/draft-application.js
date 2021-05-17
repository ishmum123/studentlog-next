import React, {useRef, useState} from "react";
import styles from '../../styles/Home.module.css'
import Head from "next/head";
import Link from "next/link";
import ApplicationForm from "../../modules/registration/application_form";
import Layout from "../../modules/shared/layout";
import {Button} from "primereact/button";
import {Divider} from "primereact/divider";
import {InputText} from "primereact/inputtext";
import 'primeflex/primeflex.css';
import {Toast} from "primereact/toast";

const axios = require('axios')
const student_application_api_address = "http://localhost:8080/student-applications"

export default function DraftApplication() {
  const [applicationId, setApplicationId] = useState("");
  const [applicationData, setApplicationData] = useState(null);

  const draftToast = useRef(null);

  const retrieveApplication = (e) => {
    e.preventDefault();
    if(!applicationId){
      return;
    }
    axios.get(student_application_api_address+"/"+applicationId, ).then(resp => {
      if(resp.data.status !== "draft"){
        draftToast.current.show({severity:'error', summary: 'Not Found',
          detail:"Application not draft with ID: " + applicationId, life: 3000});
        return;
      }
      setApplicationData(resp.data);

    }).catch(error => {
      draftToast.current.show({severity:'error', summary: 'Not Found',
        detail:"Application not found with ID: " + applicationId, life: 3000});
      // console.log(error);
    });
  }

  return (
    <>
      <div >
        <Head>
          <title>Student Registration</title>
          <link rel="icon" href="../../public/favicon.ico"/>
        </Head>

        <main >
          <Toast  id="draft_toast"
                  ref={draftToast}
                  position="top-right"
          />
          <h1 className={styles.title}>
            Student Application Form
          </h1>

          <Divider />

          <div className="card">
            <p><Button className="p-button-link">
              <Link href ="/">
                <a>Home Page</a>
              </Link>
            </Button></p>

            <p><Button className="p-button-link">
              <Link href ="/registration">
                <a>Registration Home Page</a>
              </Link>
            </Button></p>
          </div>

          <Divider />



          <form id="searchForm" action="none">
            <h3 style={{ "margin": "auto", "marginLeft": "8px" }}>Retrieve draft application</h3>
            <div className="p-col">
                <span className="p-input-icon-left" style={{ margin: "auto", marginRight: "1em" }}>
                  <i className="pi pi-search"/>
                  <InputText
                    value={applicationId}
                    id="id"
                    placeholder="Application ID"
                    type="text"
                    style={{width:'300px'}}
                    disabled={applicationData}
                    onChange={event => setApplicationId(event.target.value)} />
                </span>
              <Button icon="pi pi-search"
                      className="p-button-rounded p-button-success p-button-outlined"
                      disabled={applicationData}
                      onClick={e => retrieveApplication(e)}
              />
            </div>
          </form>

          <Divider />

          {applicationData && <ApplicationForm applicationId={applicationId}
                                               retrievedData={applicationData}/>}

        </main>

        <footer className={styles.footer}>
        </footer>
      </div>
    </>

  );
}
