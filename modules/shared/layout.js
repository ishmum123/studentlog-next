import { useKeycloak } from "@react-keycloak/ssr";
import Dashboard from "./dashboard";
import Visitor from "./visitor";

const Layout = ({children}) => {
  const keycloak = useKeycloak();

  return keycloak.keycloak.authenticated ? <Dashboard>{children}</Dashboard> : <Visitor/>;
}

export default Layout;