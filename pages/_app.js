import App from "next/app";
import {appWithTranslation} from "../next-i18next.config";
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
