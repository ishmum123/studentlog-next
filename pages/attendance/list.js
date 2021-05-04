import Layout from "../../modules/shared/layout";
import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import {InputText} from "primereact/inputtext";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Toolbar} from 'primereact/toolbar';
import {Button} from 'primereact/button';
import {Toast} from "primereact/toast";
import {Calendar} from "primereact/calendar";

const BASE_URL_STUDENT = "http://localhost:8080/students"
const BASE_URL_ATTENDANCE = "http://localhost:8080/attendance"

const AttendanceHome = () => {
  const [studentList, setStudentList] = useState([]);
  const [selectedStudentList, setSelectedStudentList] = useState([]);
  const [date, setDate] = useState(new Date());
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);

  useEffect(async () => {
    await axios.get(BASE_URL_STUDENT)
      .then(res => setStudentList(res.data) || setSelectedStudentList(res.data))
      .catch(error => console.log("Error occured " + error))
  }, [])

  const submitAttendance = () => {
    const attendanceObject = {};

    studentList.forEach(student => attendanceObject[student.id] = false);
    selectedStudentList.forEach(student => attendanceObject[student.id] = true);

    const attendanceList = [];

    Object
      .getOwnPropertyNames(attendanceObject)
      .forEach(name => attendanceList.push({id: name, present: attendanceObject[name]}));

    axios
      .post(BASE_URL_ATTENDANCE + '/save', { date: date.toISOString(), list: attendanceList })
      .then(_ => toast.current.show({
        severity: 'success',
        summary: 'Successful',
        detail: 'Attendance Saved',
        life: 3000
      }))
      .catch(error => console.log("Error occured " + error));
  }

  const submitTemplate = () =>
    <React.Fragment>
      <Button label="Submit" icon="pi pi-save" className="p-button-success p-mr-2" onClick={submitAttendance}/>
    </React.Fragment>

  const datePickerTemplate = () =>
    <React.Fragment>
      <Calendar
        monthNavigator
        dateFormat="yy-mm-dd"
        id="date"
        value={date}
        onChange={event => setDate(event.target.value)}
      />
    </React.Fragment>

  const header =
    <div className="table-header">
      <h5 className="p-m-0">Attendance</h5>
      <span className="p-input-icon-left">
          <i className="pi pi-search"/>
          <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..."/>
      </span>
    </div>

  return (
    <Layout>
      <Toast ref={toast}/>
      <div className="card">
        <Toolbar className="p-mb-4" left={submitTemplate} right={datePickerTemplate}/>
        <DataTable
          value={studentList}
          globalFilter={globalFilter}
          header={header}
          datakey="id"
          paginator rows={10}
          rowsPerPageOptions={[5, 10, 25]}
          selection={selectedStudentList}
          onSelectionChange={({value}) => setSelectedStudentList(value)}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products">
          <Column selectionMode="multiple" headerStyle={{width: '3rem'}}/>
          <Column field="name" header="Name" sortable/>
          <Column field="studentId" header="Student ID" sortable/>
        </DataTable>
      </div>
    </Layout>
  );
}

export default AttendanceHome;