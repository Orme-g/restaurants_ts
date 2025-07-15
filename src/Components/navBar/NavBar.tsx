import React, { useState } from "react";
import {
    AppBar,
    IconButton,
    Toolbar,
    Typography,
    Button,
    Menu,
    MenuItem,
    ListItemIcon,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { toggleSideMenu, callSnackbar, logoutUser } from "../../reducers/interactive";
import { useLogoutMutation } from "../../services/authApi";
import { useAppDispatch, useAppSelector } from "../../types/store";
// import { shallowEqual, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SmallSpinner from "../svg/SmallSpinner";
// import useLocalStorage from "../../hooks/useLocalStorage";

import "./navBar.scss";
import { RootState } from "../../store";

const NavBar: React.FC = () => {
    console.log("Render Nav");
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const dispatch = useAppDispatch();
    const [logout] = useLogoutMutation();
    // const isAuth = useAppSelector(selectIsAuth);
    const handleProfile = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const userData = useAppSelector((state) => state.interactive.userData);
    const isAuth = useAppSelector((state) => state.interactive.isAuth);
    const name = userData?.name;
    const _id = userData?._id;
    const role = userData?.role;
    const isAdmin = role?.includes("admin");
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleLogout = () => {
        logout()
            .unwrap()
            .then((result) => {
                dispatch(callSnackbar({ type: "info", text: result.message }));
                dispatch(logoutUser());
            })
            .catch((error) =>
                dispatch(callSnackbar({ type: "error", text: "Что-то пошло не так" }))
            );
        handleClose();
    };
    const admin = (
        <Link to={`/admin`} onClick={handleClose}>
            <MenuItem>
                <ListItemIcon>
                    <AdminPanelSettingsIcon />
                </ListItemIcon>
                Админ панель
            </MenuItem>
        </Link>
    );
    const isLoading = (
        <div className="navbar-spinner">
            <SmallSpinner />
        </div>
    );
    const ifUnAuth = (
        <Button color="inherit">
            <Link to={`/login`}>Войти</Link>
        </Button>
    );
    const ifAuth = (
        <>
            <IconButton
                size="large"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleProfile}
            >
                <AccountCircleIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                <div className="navbar-menu__username">{name}</div>
                <Link to={`/profile/${_id}`} onClick={handleClose}>
                    <MenuItem>
                        <ListItemIcon>
                            <PersonIcon />
                        </ListItemIcon>
                        Посмотреть профиль
                    </MenuItem>
                </Link>
                {isAdmin ? admin : null}
                <Link to={"/"}>
                    <MenuItem onClick={handleLogout}>
                        <ListItemIcon>
                            <LogoutIcon />
                        </ListItemIcon>
                        Выйти
                    </MenuItem>
                </Link>
            </Menu>
        </>
    );

    return (
        <AppBar color="inherit" sx={{ backgroundColor: "rgb(244, 244, 244)", color: "#494949" }}>
            <Toolbar>
                <IconButton onClick={() => dispatch(toggleSideMenu())} color="inherit">
                    <MenuIcon />
                </IconButton>
                <Link to={"/"}>
                    <Typography
                        marginLeft="20px"
                        variant="h5"
                        component="span"
                        sx={{ fontWeight: 500, letterSpacing: 1.25 }}
                    >
                        Weats
                    </Typography>
                </Link>
                <div className="navbarItems">
                    {/* {isAuth ? ifAuth : ifUnAuth} */}
                    {/* {isLoading} */}
                    {isAuth === null ? isLoading : isAuth === false ? ifUnAuth : ifAuth}

                    <Button color="inherit" sx={{ ml: "25px" }}>
                        Помощь
                    </Button>
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
