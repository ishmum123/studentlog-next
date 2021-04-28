import { withTranslation } from "../src/i18n";

const Home = ({ t }) => {

    return (
        <>
            <div>
                {t("welcomeMessage")}
            </div>
        </>
    );
}
/*

export default Home;*/
Home.getInitialProps = async () => ({
    namespacesRequired: ["about","common"],
});

export default withTranslation("common")(Home);