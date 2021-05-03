import Link from 'next/link'

const AttendanceHome = () => {
  return (
    <div>
      <Link href="/attendance/students"><h1>Student List</h1></Link>
      <Link href="/attendance/list"><h1>Attendance List</h1></Link>
    </div>

  );
}
 
export default AttendanceHome;