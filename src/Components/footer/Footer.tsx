import React from "react";
import { Link } from "react-router-dom";

import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ShowChartOutlinedIcon from "@mui/icons-material/ShowChartOutlined";
import AccessibilityNewOutlinedIcon from "@mui/icons-material/AccessibilityNewOutlined";
import QuizOutlinedIcon from "@mui/icons-material/QuizOutlined";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faVk, faInstagram, faGithub } from "@fortawesome/free-brands-svg-icons";

import "./footer.scss";

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="footer__information">
                <div className="footer__title">Weats</div>
                <div className="footer__reg">
                    <p>&#169; Weats.ru - est. 2023. Все права защищены.</p>
                    <p>
                        Использование материалов сайта разрешено только со ссылкой на первоисточник.
                    </p>
                    <p>
                        Информация представленная на сайте имеет ознакомительный характер и не
                        является публичной офертой.
                    </p>
                </div>
            </div>
            <div className="footer__links">
                <ul className="footer__navigation">
                    <li className="footer__navigation_item">
                        <Link to={"/info/advert"} className="footer__link">
                            <ShowChartOutlinedIcon className="footer__icon" /> <span>Реклама</span>
                        </Link>
                    </li>
                    <li className="footer__navigation_item">
                        <Link to={"/info/about"} className="footer__link">
                            <InfoOutlinedIcon className="footer__icon" /> <span>О нас</span>
                        </Link>
                    </li>
                    <li className="footer__navigation_item">
                        <Link to={"#"} className="footer__link">
                            <SupportAgentOutlinedIcon className="footer__icon" />
                            <span>Поддержка</span>
                        </Link>
                    </li>
                    <li className="footer__navigation_item">
                        <Link to={"#"} className="footer__link">
                            <AccessibilityNewOutlinedIcon className="footer__icon" />{" "}
                            <span>Сотрудничество</span>
                        </Link>
                    </li>
                    <li className="footer__navigation_item">
                        <Link to={"#"} className="footer__link">
                            <QuizOutlinedIcon className="footer__icon" /> <span>FAQ</span>
                        </Link>
                    </li>
                </ul>
                <ul className="footer__social">
                    <li className="footer__social_link">
                        <Link to={"#"}>
                            <FontAwesomeIcon icon={faTwitter} />
                        </Link>
                    </li>
                    <li className="footer__social_link">
                        <Link to={"#"}>
                            <FontAwesomeIcon icon={faVk} />
                        </Link>
                    </li>
                    <li className="footer__social_link">
                        <Link to={"#"}>
                            <FontAwesomeIcon icon={faInstagram} />
                        </Link>
                    </li>
                    <li className="footer__social_link">
                        <Link to={"#"}>
                            <FontAwesomeIcon icon={faGithub} />
                        </Link>
                    </li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;
