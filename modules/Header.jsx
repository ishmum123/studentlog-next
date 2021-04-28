
import { Link, withTranslation } from "../src/i18n";
import { useRouter } from "next/router";
import LocalePicker from "./LocalePicker";

const Header = ({ t }) => {
  const { pathname } = useRouter();

  const buttons = [
    { path: "/", text: "home", icon: "home" },
    { path: "/about", text: "about", icon: "question" },
  ];

  return (
      <>
        {buttons.map((button) => (
            <Link key={button.text} href={button.path}>
              {/*<Menu.Item active={pathname === button.path}>
                <Icon name={button.icon} />*/}
                {t(button.text)}
             {/* </Menu.Item>*/}
            </Link>
        ))}

        <div>

            <LocalePicker />
        </div>
        </>
  );
};

Header.getInitialProps = async () => ({
  namespacesRequired: ["common"],
});

export default withTranslation("common")(Header);
