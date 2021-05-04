import Link from 'next/link'
import axios from "axios";
import { useEffect, useState } from "react/cjs/react.development";
import Attendance from "./Attendance";

const BASE_URL_ATTENDANCE = "http://localhost:3001/dummy_data"

const List = () => {
  const [attendanceList, setAttendanceList] = useState("");
  
  useEffect( async () => {
    await axios.get(BASE_URL_ATTENDANCE)
    .then(res => {
      console.log(res.data)
      setAttendanceList(res.data);
    })
    .catch(error => {
      console.log("Error occured " + error);
    })
  }, [setAttendanceList])

  return (
    <div>
      <Link href="/attendance/students"><h1>Student List</h1></Link>
      <h1>Attendance List:</h1>
      <ol>
        { attendanceList && attendanceList.map((attendance) => (
          <li>
            <Attendance key={ attendance.id} attendance={ attendance } />
          </li>
        ))}
      </ol>
    </div>
  );
}
 
export default List;