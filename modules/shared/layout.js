import {useKeycloak} from "@react-keycloak/ssr";
import Dashboard from "./dashboard";
import Visitor from "./visitor";

const Layout = ({children}) => {
  const keycloak = useKeycloak();
  const Component = keycloak.keycloak.authenticated ? Dashboard : Visitor;

  return <Component>{children}</Component>;
}

export default Layout;