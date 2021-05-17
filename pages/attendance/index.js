import Layout from "../../modules/shared/layout";
import { useEffect, useState } from "react";
import axios from "axios";
import { InputText } from "primereact/inputtext";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const BASE_URL_STUDENT = "http://localhost:8080/students"

const AttendanceHome = () => {
  const [studentList, setStudentList] = useState([]);
  const [globalFilter, setGlobalFilter] = useState(null);

  useEffect(async () => {
    await axios.get(BASE_URL_STUDENT)
      .then(res => setStudentList(res.data))
      .catch(error => console.log("Error occured " + error))
  }, [])

  const header =
    <div className="table-header">
      <h5 className="p-m-0">Search Students</h5>
      <span className="p-input-icon-left">
          <i className="pi pi-search"/>
          <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..."/>
        </span>
    </div>

  return (
    <div className="card">
      <DataTable
        value={studentList}
        globalFilter={globalFilter}
        header={header}
        paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products">
        <Column field="name" header="Name" sortable/>
        <Column field="studentId" header="Student ID" sortable/>
        {/*<Column field="date" header="Date" sortable/>*/}
      </DataTable>
    </div>
  );
}

export default AttendanceHome;