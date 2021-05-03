const PresenceInfo = ({student}) => {
  return (
    <div>
      <ul style={{listStyleType: "none"}}>
        <li>Name: {student.name}</li>
        <li>Roll Number: {student.rollNumber}</li>
        <li>Presence Status: {student.status.toString()}</li>
      </ul>
    </div>
  );
}
 
export default PresenceInfo;