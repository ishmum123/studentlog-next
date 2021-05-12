import { withTranslation } from "../next-i18next.config";

import {i18n, config, Link} from "../next-i18next.config";
import {default as React, useContext} from "react";

import {useKeycloak} from "@react-keycloak/ssr";
import axios from "axios";
const Home = ({ t, i18n }) => {
    const keycloak = useKeycloak();

    const createLogin = () => {
        if (keycloak) {

            //console.log(keycloak?.keycloak.token);
            //console.log(keycloak?.keycloak.idToken);
            window.location.href = keycloak.keycloak.createLoginUrl()
        }
    }

    const testToken = () =>{

        const token = keycloak?.keycloak.token;

        //console.log(keycloak?.keycloak.token);
        // console.log(keycloak?.keycloak.idToken);
        console.log(keycloak?.keycloak.resourceAccess);

        // const postUrl = 'http://localhost:8888/test/';
        //const postUrl = 'http://localhost:8888/iam/accounts/user_access';
        //const postUrl = 'http://localhost:8888/iam/accounts/authenticated';
        const postUrl = 'http://localhost:8888/iam/accounts/both_test_and_user_access';

        axios.get(postUrl,{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(response => {
            const items = response.data;
            console.log(response);

        });


    }


    const onLocaleChangeClick = (locale) => {
        console.log(locale);
        i18n.changeLanguage(locale);

        console.log(keycloak?.keycloak?.tokenParsed?.name);
    };

    // const { t ,i18n } = useTranslation();

    return (
        <>
            <header className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
                <Link href="/">
                    <a className="my-0 mr-md-auto font-weight-bold text-dark">
                        Next.js + Keycloak
                    </a>
                </Link>
                <nav className="my-2 my-md-0 mr-md-3">
                    <Link href="/profile">
                        <a className="p-2 text-dark">Profile</a>
                    </Link>
                </nav>

                <nav className="my-2 my-md-0 mr-md-3">
                    <Link href="/my-page">
                        <a className="p-2 text-dark">My Page</a>
                    </Link>
                </nav>


                {keycloak?.keycloak.authenticated ? (
                    <>
                        <div>
                            Hello {keycloak?.keycloak?.tokenParsed?.name}
                        </div>
                        <button
                            type="button"
                            className="mx-2 btn btn-outline-primary"
                            onClick={() => {
                                if (keycloak) {
                                    window.location.href = keycloak.keycloak.createAccountUrl()
                                }
                            }}
                        >
                            My Account
                        </button>

                        <button
                            type="button"
                            className="mx-2 btn btn-outline-danger"
                            onClick={testToken}
                        >
                            Test Token
                        </button>

                        <button
                            type="button"
                            className="mx-2 btn btn-outline-danger"
                            onClick={() => {
                                if (keycloak) {
                                    window.location.href = keycloak.keycloak.createLogoutUrl()
                                }
                            }}
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>

                        <button
                            type="button"
                            className="mx-2 btn btn-outline-primary"
                            onClick={() => {
                                if (keycloak) {
                                    window.location.href = keycloak.keycloak.createRegisterUrl()
                                }
                            }}
                        >
                            Signup
                        </button>

                        <button
                            type="button"
                            className="mx-2 btn btn-outline-success"
                            onClick={createLogin}
                        >
                            Login
                        </button>
                    </>
                )}
            </header>




            <div>
                {config.allLanguages.map((locale) => (

                    <button key={locale} onClick={() => onLocaleChangeClick(locale)}>
                        {`${locale.toUpperCase()}`}
                    </button>
                ))}
            </div>

            <div>{t("description")}</div>
        </>
    );
};
Home.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})


export default withTranslation('common')(Home);

