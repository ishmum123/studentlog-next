import React, {useEffect, useRef, useState} from "react";
import { Menu } from 'primereact/menu';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { Calendar } from 'primereact/calendar';
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import ProductService from '../service/ProductService';

export default function Test() {

    const apiUrl = "http://localhost:9000/tests";
    const toast = useRef(null);
    const [products, setProducts] = useState([]);
    const productService = new ProductService();
    const [subject, setSubject] = useState("");
    const [examiner, setExaminer] = useState("");
    const [date, setDate] = useState("");
    const [globalFilter, setGlobalFilter] = useState(null);

    let items = [
        {label: 'Test',url: '/test'},
        {label: 'Test Result', url: '/testResult'},
    ]

    useEffect(() => {
        productService.getProducts().then(data => setProducts(data));
    }, []);

    function clearForm(){
        setSubject('');
        setExaminer('');
        setDate('');
    }
    const  SubmitForm = () => {
        let calDate = date.getDate().toString();
        let calMonth = (date.getMonth()+1).toString();
        let calYear = date.getFullYear().toString();
        let formatted_date = calYear +'-' + calMonth.padStart(2, '0')+ '-' + calDate.padStart(2, '0');
        console.log(JSON.stringify({subject: subject, examiner: examiner, date: formatted_date}));
        fetch(apiUrl,
            {
                headers: {'Content-Type': 'application/json'},
                method: 'POST',
                body: JSON.stringify({subject: subject, examiner: examiner, date: formatted_date})
            })
            .then(response => response.json())
            .then(json => setProducts([json, ...products]))
            .then(clearForm())
        ;
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Exam Added', life: 3000 });

    }
    const header = (
        <div className="table-header">
            <h5 className="p-m-0">Search Test</h5>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );
    return(
        <div>
            <Toast ref={toast} />
            <Menu id = "navbar" model={items} />
            <div id = "layout-portlets-cover">
                <div className="card">
                    <div className="p-field p-grid">
                        <label htmlFor="subject" className="p-col-fixed" style={{width:'100px'}}>Subject</label>
                        <div className="p-col">
                            <InputText id="subject" className="midSizeInput" value={subject} onChange={event => setSubject(event.target.value)}  type="text" />
                        </div>
                    </div>
                    <div className="p-field p-grid">
                        <label htmlFor="examiner" className="p-col-fixed" style={{width:'100px'}}>Examiner</label>
                        <div className="p-col">
                            {/*<InputText id="examiner" className="midSizeInput" type="text"/>*/}
                            <InputText id="examiner" className="midSizeInput" value={examiner} onChange={event => setExaminer(event.target.value)}  type="text" />
                        </div>
                    </div>
                    <div className="p-field p-grid">
                        <label htmlFor="examDate" className="p-col-fixed" style={{width:'100px'}}>Exam Date</label>
                        <div className="p-col">
                            <Calendar dateFormat="dd-mm-yy" id="date" className="midSizeInput" value={date} onChange={event => setDate(event.target.value)} monthNavigator yearNavigator yearRange="1900:2100"></Calendar>
                        </div>
                    </div>

                    <div className="p-field p-grid">
                        <Button label="Submit" icon="pi pi-check" onClick={SubmitForm}/>
                    </div>

                </div>

                <div className="card">
                    <DataTable value={products}
                               globalFilter={globalFilter}
                               header={header}
                               paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                               paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                               currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products">
                        <Column field="subject" header="Subject" sortable></Column>
                        <Column field="examiner" header="Examiner" sortable></Column>
                        <Column field="date" header="Date" sortable></Column>
                    </DataTable>
                </div>
            </div>
        </div>
    )
}