import Link from 'next/link'
import { Menu } from "primereact/menu";

const Layout = ({children}) => {
  const items = [
    {label: 'Student List', url: '/attendance/'},
    {label: 'Attendance List', url: '/attendance/list'},
  ]

  return (
    <>
      <Menu id="navbar" model={items}/>
      <div style={{marginLeft: "200px", marginTop: "50px"}}>
        {children}
      </div>
    </>
  );
}

export default Layout;