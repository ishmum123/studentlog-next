/*import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp*/
import App from "next/app";
import {appWithTranslation} from "../src/i18n";
import Header from "../modules/Header";

const MyApp = ({Component, pageProps}) => {
    return (
        <>
            <Header/>

            <Component {...pageProps} />
        </>
    );
};

async function getProps(appContext) {
    return await App.getInitialProps(appContext);
}

MyApp.getInitialProps = getProps;

export default appWithTranslation(MyApp);
