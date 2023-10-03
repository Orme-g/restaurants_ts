
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ShowChartOutlinedIcon from '@mui/icons-material/ShowChartOutlined';
import AccessibilityNewOutlinedIcon from '@mui/icons-material/AccessibilityNewOutlined';
import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTwitter, faVk, faInstagram, faGithub} from '@fortawesome/free-brands-svg-icons'


import './footer.sass'


const Footer = () => {

    return (
        <div className='footer'>
            <div className="footer__information">
                <div className="footer__title">Whereats</div>
                <div className="footer__reg">
                    <p>&#169; Whereats.ru - est. 2023. Все права защищены.</p>
                    <p>Использование материалов сайта разрешено только со ссылкой на первоисточник.</p>
                    <p>Информация представленная на сайте имеет ознакомительный характер и не является публичной офертой.</p>
                </div>
            </div>
            <div className="footer__links">
                <ul className="footer__navigation">
                    {/* eslint-disable-next-line */}
                    <li className="footer__navigation_item"><a href="#"><ShowChartOutlinedIcon className='footer__icon'/> Реклама</a></li> 
                    {/* eslint-disable-next-line */}
                    <li className="footer__navigation_item"><a href="#"><InfoOutlinedIcon className='footer__icon'/> О нас</a></li>
                    {/* eslint-disable-next-line */}
                    <li className="footer__navigation_item"><a href="#"><SupportAgentOutlinedIcon className='footer__icon'/> Поддержка</a></li>
                    {/* eslint-disable-next-line */}
                    <li className="footer__navigation_item"><a href="#"><AccessibilityNewOutlinedIcon className='footer__icon'/> Сотрудничество</a></li>
                    {/* eslint-disable-next-line */}
                    <li className="footer__navigation_item"><a href="#"><QuizOutlinedIcon className='footer__icon'/> FAQ</a></li> 
                </ul>
                <ul className="footer__social">
                    {/* eslint-disable-next-line */}
                    <li className="footer__social_link"><a href="#"><FontAwesomeIcon icon={faTwitter}/></a></li>
                    {/* eslint-disable-next-line */}
                    <li className="footer__social_link"><a href="#"><FontAwesomeIcon icon={faVk} /></a></li>
                    {/* eslint-disable-next-line */}
                    <li className="footer__social_link"><a href="#"><FontAwesomeIcon icon={faInstagram} /></a></li>
                    {/* eslint-disable-next-line */}
                    <li className="footer__social_link"><a href="#"><FontAwesomeIcon icon={faGithub} /></a></li>
                </ul>
            </div>
        </div>
    )
}


export default Footer