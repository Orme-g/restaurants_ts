// Common import
import { useSelector, useDispatch } from "react-redux"
import { toggleSideMenu } from "../../reducers/interactive"
import { useState } from "react";
import { Link } from "react-router-dom";

// MUI Components import
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Collapse } from "@mui/material"

// MUI Icons import
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SearchIcon from '@mui/icons-material/Search';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import PhoneInTalkOutlinedIcon from '@mui/icons-material/PhoneInTalkOutlined';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';


// Styles import
import './sideMenu.sass'


const SideMenu = () => {

    const [contactUs, setContactUs] = useState(false)
    const dispatch = useDispatch()
    const {sideMenu} = useSelector(state => state.interactive)
    const toggleContact = () => {
        setContactUs(!contactUs)
    }

    return (
        <Drawer
            anchor="left"
            open={sideMenu}
            onClose={() => dispatch(toggleSideMenu())}
            >
            <List sx={{width: '300px'}} className="side-list">
               <Link to='/'> 
                    <ListItemButton onClick={() => dispatch(toggleSideMenu())}>
                        <ListItemIcon>
                            <HomeOutlinedIcon fontSize="medium"/>
                        </ListItemIcon>
                        <ListItemText primary='Главная страница'/>
                    </ListItemButton>
                 </Link>
                <Link to='*'>  
                    <ListItemButton onClick={() => dispatch(toggleSideMenu())}>
                        <ListItemIcon>
                            <SearchIcon fontSize="medium"/>
                        </ListItemIcon>
                        <ListItemText primary='Подобрать ресторан'/>
                    </ListItemButton>
                </Link>
                <ListItemButton>
                    <ListItemIcon>
                        <StarBorderOutlinedIcon fontSize="medium"/>
                    </ListItemIcon>
                    <ListItemText primary='Лучшая шаверма'/>
                </ListItemButton>
                <Link to='/blog'>
                    <ListItemButton onClick={() => dispatch(toggleSideMenu())}>
                        <ListItemIcon>
                            <ChatOutlinedIcon fontSize="small"/>
                        </ListItemIcon>
                        <ListItemText primary='Блог'/>
                    </ListItemButton>
                </Link>

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

