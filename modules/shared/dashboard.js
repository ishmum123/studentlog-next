import Link from 'next/link'
import {Menu} from "primereact/menu";

const Dashboard = ({children}) => {
  const items = [
    {label: 'Student List', url: '/attendance/'},
    {label: 'Attendance List', url: '/attendance/list'},
    {label: 'New Leave Application', url: '/leave-application/new-application'},
    {label: 'Pending Leave Applications', url: '/leave-application/pending-applications'},
    {label: 'Student Registration', url: '/registration'}
  ]

  return (
    <>
      <Menu id="navbar" model={items}/>
      <div style={{marginLeft: "200px", marginTop: "50px", marginRight: "40px"}}>
        {children}
      </div>
    </>
  );
}

export default Dashboard;