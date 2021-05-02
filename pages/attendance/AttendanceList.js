import axios from "axios";
import Attendance from "./Attendance"
const BASE_URL = "http://localhost:3001/attendances/"


const AttendanceList = (props) => {
  const attendanceList = props.attendanceList;
  const updatedList = [];


  const pushUpdatedAttendanceFunction = (attendance) => {
    if(!updatedList.includes(attendance)){
      updatedList.push(attendance)
    }
  }

  const submitButtonClickHandler = async (e) => {
    e.preventDefault();
    await updatedList.forEach(attendance => {
      axios.put(BASE_URL + attendance.id, {...attendance, presenceStatus: false })
      .then(res => {
        console.log("Updated attendance: ", res)
      })
      .catch(error => {
        console.log('Error occured ' + error)
      })
    });
  }

  return (
    <div>
      <form>
        <ol>
          { attendanceList && attendanceList.map((attendance) => (
            <li>
              <Attendance key={ attendance.id} attendance={ attendance } pushUpdatedAttendanceFunction={ pushUpdatedAttendanceFunction } />
            </li>
          ))}
        </ol>
        <input type="submit" onClick={(e) => submitButtonClickHandler(e)}/>
      </form>
    </div>
  );
}
 
export default AttendanceList;