import { useState } from "react"
import {
    AppBar,
    IconButton,
    Toolbar,
    Typography,
    Button,
    Menu,
    MenuItem,
    ListItemIcon,
} from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import PersonIcon from "@mui/icons-material/Person"
import LogoutIcon from "@mui/icons-material/Logout"
import {
    toggleSideMenu,
    toggleModalWindowLogin,
    setPassAuth,
} from "../../reducers/interactive"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import useLocalStorage from "../../hooks/useLocalStorage"

import "./navBar.sass"

const NavBar = () => {
    const [anchorEl, setAnchorEl] = useState(null)
    const dispatch = useDispatch()
    const { clearData } = useLocalStorage()
    const passAuth = useSelector((state) => state.interactive.passAuth)
    const handleProfile = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }
    const handleLogout = () => {
        clearData("userData")
        dispatch(setPassAuth())
        handleClose()
    }
    const unAuth = (
        <Button
            color="inherit"
            onClick={() => dispatch(toggleModalWindowLogin())}
        >
            Войти
        </Button>
    )
    const isAuth = (
        <>
            <IconButton
                size="large"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleProfile}
            >
                <AccountCircleIcon />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <PersonIcon />
                    </ListItemIcon>
                    Посмотреть профиль
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <LogoutIcon />
                    </ListItemIcon>
                    Выйти
                </MenuItem>
            </Menu>
        </>
    )

    return (
        <AppBar color="inherit">
            <Toolbar>
                <IconButton
                    onClick={() => dispatch(toggleSideMenu())}
                    color="inherit"
                >
                    <MenuIcon />
                </IconButton>
                <Link to={"/"}>
                    <Typography
                        marginLeft="20px"
                        variant="h5"
                        component="span"
                        sx={{ fontWeight: 500, letterSpacing: 1.25 }}
                    >
                        Whereats
                    </Typography>
                </Link>
                <div className="navbarItems">
                    {passAuth ? isAuth : unAuth}

                    <Button color="inherit" sx={{ ml: "25px" }}>
                        Помощь
                    </Button>
                </div>
            </Toolbar>
        </AppBar>
    )
}

export default NavBar
