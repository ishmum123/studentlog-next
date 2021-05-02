import axios from "axios";
import { useState } from "react";
const BASE_URL = "http://localhost:3001/attendances/"


const Attendance = (props) => {
  const attendance = props.attendance
  const [giveAttendance, setGiveAttendance] = useState(attendance.presenceStatus)

  const submitButtonClickHandler = (e, attendance) => {
    e.preventDefault();
    axios.put(BASE_URL + attendance.id, {...attendance, presenceStatus: giveAttendance })
    .then(res => {
      console.log("Updated attendance: ", res)
    })
    .catch(error => {
      console.log('Error occured ' + error)
    })
  }

  return (
    <div>
      <ul style={{listStyleType: "none"}}>
        <form>
          <li>Name: { attendance.name }</li>
          <li>Roll Number: { attendance.rollNumber }</li>
          <li>Presence Status: { giveAttendance.toString() }</li>
          <li><input type="checkbox" checked={ giveAttendance === true} onChange={() => setGiveAttendance(!attendance.presenceStatus)}/></li>
          <input type="submit" onClick={ (e) => submitButtonClickHandler(e, attendance) }/>
        </form>
      </ul>
      <br />
    </div>
  );
}
 
export default Attendance;