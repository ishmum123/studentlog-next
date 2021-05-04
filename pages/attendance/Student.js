const Student = ({student, pushAbsentStudentIdFunction}) => {
  return (
    <div>
      <ul style={{listStyleType: "none"}}>
        <li>Name: { student.name }</li>
        <li>Roll Number: { student.rollNumber }</li>
        <li><input type="checkbox" defaultChecked="true" onClick={() => pushAbsentStudentIdFunction(student)}/></li>
      </ul>
    </div>
  );
}
 
export default Student;