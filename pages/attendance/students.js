import Link from 'next/link'
import axios from "axios";
import { useEffect, useState } from "react/cjs/react.development";
import Student from "./Student";
import Router from 'next/router'

const BASE_URL_STUDENT = "http://localhost:3001/students"
const BASE_URL_ATTENDANCE = "http://localhost:3001/attendances"


const StudentList = () => {
  const [studentList, setStudentList] = useState("");
  
  useEffect( async () => {
    await axios.get(BASE_URL_STUDENT)
    .then(res => {
      setStudentList(res.data);
    })
    .catch(error => {
      console.log("Error occured " + error);
    })
  }, [setStudentList])


  const absentStudentListId = [];
  const pushAbsentStudentIdFunction = (student) => {
    console.log(student)
    if(!absentStudentListId.includes(student)){
      absentStudentListId.push(student.id)
    }
  }

  const submitButtonClickHandler = async (e) => {
    e.preventDefault();
    if(absentStudentListId.length === 0)
      return;
    const post_body = {
      date: new Date(),
      absent_students_id: absentStudentListId
  };
    await axios.post(BASE_URL_ATTENDANCE, post_body)
    .then(res => {
      console.log("Added ", res.data)
      Router.push('/attendance/list')
    })
    .catch(error => {
      console.log("Error occured ", error)
    })
  }

  return (
    <div>
      <Link href="/attendance/list"><h1>See Attendance List</h1></Link>
      <h1>List of Students:</h1>
      <form>
        <ol>
          { studentList && studentList.map((student) => (
            <li>
              <Student key={ student.id} student={ student } pushAbsentStudentIdFunction={ pushAbsentStudentIdFunction } />
            </li>
          ))}
        </ol>
        <input type="submit" onClick={(e) => submitButtonClickHandler(e)}/>
      </form>
    </div>
  );
}
 
export default StudentList;