import {useState} from "react";
import { Menu } from 'primereact/menu';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { Calendar } from 'primereact/calendar';
export default function test() {
    let items = [
        {
            label: 'Test',
            items:  [
                        {label: 'New', icon: 'pi pi-fw pi-plus',command:()=>{ window.location.hash="/fileupload"; }},
                        {label: 'Update', icon: 'pi pi-fw pi-undo', url: 'http://primetek.com.tr'},
                        {label: 'Delete', icon: 'pi pi-fw pi-trash', url: 'http://primetek.com.tr'}
                    ]
        }
        // {
        //     label: 'Account',
        //     items: [{label: 'Options', icon: 'pi pi-fw pi-cog',command:()=>{ window.location.hash="/"; }},
        //         {label: 'Sign Out', icon: 'pi pi-fw pi-power-off'} ]
        // }
    ]
    const [subject, setSubject] = useState("");
    const [examiner, setExaminer] = useState("");
    const [date, setDate] = useState("");
    const  SubmitForm = () => {
        let calDate = date.getDate().toString();
        let calMonth = (date.getMonth()+1).toString();
        let calYear = date.getFullYear().toString();
        let formatted_date = calYear +'-' + calMonth.padStart(2, '0')+ '-' + calDate.padStart(2, '0');
        console.log(JSON.stringify({subject: subject, examiner: examiner, date: formatted_date}));
        fetch('http://localhost:9000/tests',
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({subject: subject, examiner: examiner, date: formatted_date})
            })
            .then(response => response.json())
            .then(json => console.log(json));

    }
    return(
        <div>
            <Menu id = "navbar" model={items} />
            {/*<form onSubmit={}>*/}
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
                </div>
            {/*</form>*/}
        </div>
    )
}