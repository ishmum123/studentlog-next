import axios from "axios";
import { useEffect, useState } from "react";
import AttendanceList from "./AttendanceList";

const BASE_URL = "http://localhost:3001/attendances"

const AttendanceHome = () => {
  const [attendanceList, setAttendanceList] = useState("");
  
  useEffect( async () => {
    await axios.get(BASE_URL)
    .then(res => {
      console.log(res.data)
      setAttendanceList(res.data);
    })
    .catch(error => {
      console.log("Error occured " + error);
    })
  }, [setAttendanceList])

  return (
    <AttendanceList attendanceList={ attendanceList }/>
  );
}
 
export default AttendanceHome;