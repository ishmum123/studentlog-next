import { useState } from "react";


const Attendance = (props) => {
  const attendance = props.attendance
  const pushUpdatedAttendanceFunction = props.pushUpdatedAttendanceFunction;
  const [giveAttendance, setGiveAttendance] = useState(attendance.presenceStatus)

  return (
    <div>
        <ul style={{listStyleType: "none"}}>
          <li>Name: { attendance.name }</li>
          <li>Roll Number: { attendance.rollNumber }</li>
          <li>Presence Status: { giveAttendance.toString() }</li>
          <li><input type="checkbox" checked={ giveAttendance === true} onChange={ () => setGiveAttendance(!giveAttendance)} onClick={() => pushUpdatedAttendanceFunction(attendance)}/></li>
        </ul>
      <br />
    </div>
  );
}
 
export default Attendance;