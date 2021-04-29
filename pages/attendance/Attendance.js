const Attendance = (props) => {
  const attendance = props.attendance
  return (
    <div>
      <ul style={{listStyleType: "none"}}>
        <li>Name: { attendance.name }</li>
        <li>Roll Number: { attendance.rollNumber }</li>
        <li>Presence Status: { attendance.presenceStatus.toString() }</li>
      </ul>
      <br />
    </div>
  );
}
 
export default Attendance;