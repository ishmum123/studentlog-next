import {useState} from "react";
import List from "../modules/registration/list";
import 'bootstrap/dist/css/bootstrap.css';

//TODO: remove this page later. this file is for template use.
export default function Register() {
    const [studentName, setStudentName] = useState("");
    const [studentRegId, setStudentRegId] = useState("");

    const isValidRegId = !!studentRegId.match(/^[0-9]{4}-[0-9]{3}-[0-9]{4}$/);
    const isValidData = studentName && isValidRegId;

    const callJsonPlaceholder = () =>
        fetch('https://jsonplaceholder.typicode.com/users', {
            method: 'POST',
            body: JSON.stringify({name: studentName, regId: studentRegId})
        })
            .then(response => response.json())
            .then(json => console.log(json))

    return (
        <form action="none">
            <div>
                <div class = "row">
                    <div class = "col-md-2">
                    <label htmlFor="student_name">Student Name:</label>
                    </div>
                    <div class = "col-md-6">
                        <input class = "form-control"
                        value={studentName}
                        id="student_name"
                        type="text"
                        onChange={event => setStudentName(event.target.value)} />
                    </div>
                </div>
            </div>
            <div>
                <div className="row">
                    <div className="col-md-2">
                        <label htmlFor="student_birth_reg_id">Student Birth Registration ID:</label>
                    </div>
                    <div className="col-md-6">
                        <input class = "form-control"
                        value={studentRegId}
                        id="student_birth_reg_id"
                        type="text"
                        onChange={({ target: { value } }) => setStudentRegId(value)} />
                        {(studentRegId && !isValidRegId) && <p style={{color: 'red'}}>Invalid ID Entered</p>}
                    </div>
                </div>
            </div>
            <button class = "btn btn-primary"
                disabled={!isValidData}
                type="button"
                onClick={callJsonPlaceholder}>
                Submit
            </button>
            <List />
        </form>
    );
}