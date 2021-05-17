import {useState, useEffect} from "react";
import styles from '../../styles/Home.module.css'
import Head from "next/head";
import Link from "next/link";
import axios from "axios";
import Layout from "../../modules/shared/layout";
import {InputText} from "primereact/inputtext";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Button} from 'primereact/button';


const leave_application_api_address = "http://localhost:8080/leave-applications/"

export default function PendingApplications() {
  const [leaveApplicationList, setLeaveApplicationList] = useState([]);
  const [globalFilter, setGlobalFilter] = useState(null);

  useEffect(async () => {
    await axios.get(leave_application_api_address)
      .then(res => {
        //TODO: get only the pending applications from the server side
        setLeaveApplicationList(res.data.filter(a => a.status === "pending"));
        console.log(leaveApplicationList);})
      .catch(error => {
        console.log(error);
      })
  }, [])

  const leaveApplicationApproveProcess = (e, decision, leaveApplication) => {
    e.preventDefault();
    axios.patch(leave_application_api_address + leaveApplication.id,
      {...leaveApplication, status: decision, decisionById: 1})
      //TODO: replace decisionBy : 1 with appropriate id, also make sure no one can modify levaeApplication.id
      .then(res => {
        setLeaveApplicationList(leaveApplicationList.filter(item => item.id !== leaveApplication.id));
      })
      .catch(error => {
        console.log(error)
      })
  }

  const decisionButton = (rowData, column) => {
    return (
      <div>
        <Button
          icon="pi pi-check"
          className="p-button-rounded p-button-text"
          onClick={e => leaveApplicationApproveProcess(e, "approved", rowData)}
        />
        <Button
          icon="pi pi-times"
          className="p-button-rounded p-button-danger p-button-text"
          onClick={e => leaveApplicationApproveProcess(e, "rejected", rowData)}
        />
      </div>
    )
  }

  const header =
    <div className="table-header">
      <h5 className="p-m-0">Search Applications</h5>
      <span className="p-input-icon-left">
        <i className="pi pi-search"/>
        <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..."/>
      </span>
    </div>

  return (
    <>
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

          <div className="card">
            <DataTable
              value={leaveApplicationList}
              globalFilter={globalFilter}
              header={header}
              datakey="id"
              paginator rows={10}
              rowsPerPageOptions={[5, 10, 25]}
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
              currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Leave Applications">
              <Column field="studentId" header="Student ID" sortable/>
              <Column field="dateFrom" header="Date From" sortable/>
              <Column field="dateTo" header="Date To" sortable/>
              <Column field="applicationBody" header="Application Body" sortable/>
              <Column field="supportedDocument.name" header="Supported Document" sortable/>
              <Column header="Decision" body={decisionButton}/>
            </DataTable>
          </div>
        </main>

        <br/>

        <footer className={styles.footer}>
        </footer>
      </div>
    </>
  );
}
