import React, {useEffect, useState} from "react";
import styles from '../../../styles/Home.module.css'
import Head from "next/head";
import Link from "next/link";
import {useRouter} from "next/router";
import {Button} from "primereact/button";
import {Divider} from "primereact/divider";
import {InputText} from "primereact/inputtext";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";

const axios = require('axios')
const student_application_api_address = "http://localhost:8080/student-applications"

const getDecidedById = () => {
  //TODO: get admin/teacher id from context
  return 1;
}

export async function getStaticPaths() {
  const res = await fetch(student_application_api_address)
  const applications = await res.json()

  if (!applications) {
    return {
      notFound: true,
    }
  }

  const paths = applications.map(a =>{
    return {params: { application_id: a.id.toString() }}
  });

  return {
    paths,
    fallback: true
  };
}

export async function getStaticProps({ params }) {
  const res = await fetch(student_application_api_address+"/"+params.application_id)
  const application = await res.json()

  if (!application) {
    return {
      notFound: true,
    }
  }

  // Pass application data to the page via props
  return {
    props: { application },
    revalidate: 1,
    notFound: false
  }
}

export default function StudentApplication({application}) {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>
  }

  if(!application){
    return <div>Error...</div>

  }

  const sendDecision = (e, decision) => {
    e.preventDefault();
    const confirmForm = confirm("Submit the decision?");
    if (confirmForm) {
      const changedApplication = {...application, decidedById: getDecidedById(), status : decision}
      axios.patch(student_application_api_address+"/"+application.id, changedApplication).then(resp => {
        alert("Saved Successfully");
        router.reload();
      }).catch(error => {
        // console.log(error);
        alert("Error occurred: \n"+ JSON.stringify(error))
        router.reload();

      });
    }
  }

  const convertObject = (obj) => {
    let arr = [];

    arr.push({field: "Applied Date", value: String(application.appliedDate).split('T')[0]});
    arr.push({field: "Decided by ID", value: application.decidedById});
    arr.push({field: "Name", value: application.name});
    arr.push({field: "Date of Birth", value: String(application.dateOfBirth).split('T')[0]});
    arr.push({field: "Blood Group", value: application.bloodGroup});
    arr.push({field: "Birth Registration ID", value: application.birthRegistrationId});
    arr.push({field: "Registration ID", value: application.registrationId});
    arr.push({field: "Present Address", value: application.presentAddress});
    arr.push({field: "Permanent Address", value: application.permanentAddress});
    arr.push({field: "Guardian Name", value: application.guardianName});
    arr.push({field: "Guardian Email", value: application.guardianEmail});
    arr.push({field: "Guardian Phone", value: application.guardianPhone});
    arr.push({field: "Applied for Grade", value: application.appliedForGrade});
    arr.push({field: "Status", value: application.status});

    return arr;
  }

  const tableFormattedData = convertObject(application)

  return (
    <div >
      <Head>
        <title>Student Applications Details</title>
        <link rel="icon" href="../../../public/favicon.ico"/>
      </Head>

      <main >
        <h1 className={styles.title}>
          Student Applications Details
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

        <div className="card">
          <DataTable
            value={tableFormattedData}>
            <Column field="field" header="Registration ID"/>
            <Column field="value" header="Name"/>
          </DataTable>
        </div>

        <Divider />

        <div style={{ margin: "auto", marginBottom: "1em" }}>

          <form id="decisionForm">
            <Button
              disabled={application.status !== "submitted"}
              onClick={(e) => sendDecision(e, "approved")}
              icon="pi pi-check"
              className="p-button-success p-mr-2"
              style={{width:'220px'}}
              label="Approve Application"/>

            <Button
              disabled={application.status !== "submitted"}
              type="button"
              className="p-button-danger p-mr-2"
              onClick={(e) => sendDecision(e, "rejected")}
              icon="pi pi-times"
              style={{width:'220px'}}
              label="Reject Application"/>
          </form>

        </div>

      </main>

      <footer className={styles.footer}>
      </footer>
    </div>
  );
}
