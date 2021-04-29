import { dummyAttendanceList } from "../../dummy.data";
import AttendanceList from "./AttendanceList";

const AttendanceHome = () => {
  const attendanceList = dummyAttendanceList
  return (
    <AttendanceList attendanceList={ attendanceList }/>
  );
}
 
export default AttendanceHome;