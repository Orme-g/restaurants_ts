import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Collapse } from "@mui/material"
import { useSelector, useDispatch } from "react-redux"
import { toggleSideMenu } from "../../reducers/restoApp"
import { useState } from "react";

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SearchIcon from '@mui/icons-material/Search';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import PhoneInTalkOutlinedIcon from '@mui/icons-material/PhoneInTalkOutlined';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';


import './sideMenu.sass'


const SideMenu = () => {

    const [contactUs, setContactUs] = useState(false)
    const dispatch = useDispatch()
    const {sideMenu} = useSelector(state => state.restoReducer)
    const toggleContact = () => {
        setContactUs(!contactUs)
    }

    return (
        <Drawer
            anchor="left"
            open={sideMenu}
            onClose={() => dispatch(toggleSideMenu())}
            >
            <List sx={{width: '300px'}}>
                <ListItemButton>
                    <ListItemIcon>
                        <HomeOutlinedIcon fontSize="medium"/>
                    </ListItemIcon>
                    <ListItemText primary='Главная страница'/>
                </ListItemButton>
                <ListItemButton>
                    <ListItemIcon>
                        <SearchIcon fontSize="medium"/>
                    </ListItemIcon>
                    <ListItemText primary='Подобрать ресторан'/>
                </ListItemButton>
                <ListItemButton>
                    <ListItemIcon>
                        <StarBorderOutlinedIcon fontSize="medium"/>
                    </ListItemIcon>
                    <ListItemText primary='Лучшая шаверма'/>
                </ListItemButton>
                <ListItemButton>
                    <ListItemIcon>
                        <ChatOutlinedIcon fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText primary='Блог'/>
                </ListItemButton>

                <ListItemButton onClick={toggleContact}>
                    <ListItemIcon>
                        <InfoOutlinedIcon fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText primary="Связаться с нами" />
                    {contactUs ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={contactUs} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <SendOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Написать письмо" />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <PhoneInTalkOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Позвонить" />
                    </ListItemButton>
                    </List>
                </Collapse>
            </List>
        </Drawer>
    )
}




export default SideMenu



// Custom made side menu

            //  <div className="container">
            //     <ul className="side-list">
            //         <li className="side-list__item">
            //         eslint-disable-next-line
            //             <a href="#">
            //             <span className="side-list__icon"><HomeOutlinedIcon fontSize="medium"/></span>
            //                 Главная страница
            //             </a>
            //         </li>
            //         <li className="side-list__item">
            //         eslint-disable-next-line
            //             <a href="#">
            //             <span className="side-list__icon"><SearchIcon fontSize="medium"/></span>
            //                 Подбор ресторана
            //             </a>
            //         </li>
            //         <li className="side-list__item">
            //         eslint-disable-next-line
            //             <a href="#">
            //             <span className="side-list__icon"><StarBorderOutlinedIcon fontSize="medium"/></span>
            //                 Лучшая шаверма
            //             </a>
            //         </li>
            //         <li className="side-list__item">
            //         eslint-disable-next-line
            //             <a href="#">
            //             <span className="side-list__icon"><ChatOutlinedIcon fontSize="small"/></span>
            //                 Блог
            //             </a>
            //         </li>
            //         <li className="side-list__item">
            //         eslint-disable-next-line
            //             <a href="#">
            //                 <span className="side-list__icon"><InfoOutlinedIcon fontSize="small"/></span>
            //                 О нас
            //             </a>
            //         </li>
            //     </ul>
            // </div>  