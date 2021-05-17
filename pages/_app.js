import '../styles/globals.css'
import {appWithTranslation} from "../next-i18next.config";
import '../styles/navbar.css'
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

import cookie from "cookie";
import App from "next/app"
import {SSRKeycloakProvider, SSRCookies} from "@react-keycloak/ssr";
import Layout from "../modules/shared/layout";

const keycloakCfg = {
  url: "http://localhost:8080/auth",
  realm: "MyDemo",
  clientId: "my-react-client",
  onLoad: 'login-required'
};

function MyApp({Component, pageProps, cookies}) {
  return (
      <>

        <SSRKeycloakProvider
            keycloakConfig={keycloakCfg}
            persistor={SSRCookies(cookies)}
        >
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SSRKeycloakProvider>

      </>
  );
}

function parseCookies(req) {
  if (!req || !req.headers) {
    return {};
  }
  return cookie.parse(req.headers.cookie || "");
}

MyApp.getInitialProps = async (context) => {
  // Extract cookies from AppContext
  const appProps = await App.getInitialProps(context)
  return {
    ...appProps,
    cookies: parseCookies(context?.ctx?.req)
  };
};

export default appWithTranslation(MyApp);
