import PresenceInfo from "./PresenceInfo"

const Attendance = ({attendance}) => {
  return (
    <div>
      <ul style={{listStyleType: "none"}}>
        <li>Date: { attendance.date }</li>
        <ol>
          { attendance.attendance_list.map((student) => (
            <li>
              <PresenceInfo student={ student }/>
            </li>
        ))}
        </ol>
      </ul>
      <br />
    </div>
  );
}
 
export default Attendance;