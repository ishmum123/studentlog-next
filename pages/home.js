import { withTranslation } from "../next-i18next.config";

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