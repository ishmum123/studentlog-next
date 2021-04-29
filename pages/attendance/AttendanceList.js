import Attendance from "./Attendance"

const AttendanceList = (props) => {
  const attendanceList = props.attendanceList;
  return (
    <div>
      <ol>
        { attendanceList.map((attendance) => (
          <li>
            <Attendance key={ attendance.id} attendance={ attendance }/>
          </li>
        ))}
      </ol>
    </div>
  );
}
 
export default AttendanceList;