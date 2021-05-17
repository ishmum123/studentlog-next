import {useState} from "react";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {useRouter} from "next/router";

export default function ApplicationsTable({applications, notFound}) {
  const [globalFilter, setGlobalFilter] = useState(null);
  const router = useRouter();

  if(notFound){
    return <div> Unable to retrieve data </div>
  }
  else if(!applications){
    return <div> Loading... </div>

  }

  applications.forEach( a => {
    a.appliedDatePretty = String(a.appliedDate).split(/[\sT]+/)[0]
  })

  const viewApplication = (rowData) => {
    return (
      <Button icon="pi pi-eye"
              className="p-button-rounded p-button-success p-mr-2"
              onClick={() => router.push('/registration/application/'+rowData.id)} />
    );
  }

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
        value={applications}
        globalFilter={globalFilter}
        header={header}
        paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products">
        <Column field="registrationId" header="Registration ID" sortable/>
        <Column field="name" header="Name" sortable/>
        <Column field="appliedDatePretty" header="Date" sortable/>
        <Column field="status" header="Status" sortable/>
        <Column header="View" body={viewApplication}></Column>
      </DataTable>
    </div>
  );

}