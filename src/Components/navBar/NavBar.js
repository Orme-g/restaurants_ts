

import {AppBar, IconButton, Toolbar, Typography, Button} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import { toggleSideMenu, toggleModalWindowLogin } from '../../reducers/interactive';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import './navBar.sass'




const NavBar = () => {

    const dispatch = useDispatch()

    return (
            <AppBar color='inherit'>
                <Toolbar>
                    <IconButton  onClick={() => dispatch(toggleSideMenu())} color='inherit'>
                        <MenuIcon/>
                    </IconButton>
                    <Link to={'/'}>
                        <Typography 
                        marginLeft='20px'
                        variant='h5'
                        component='span'
                        sx={{fontWeight: 500, letterSpacing: 1.25}}>
                            Whereats
                        </Typography>
                    </Link>
                    <div className='navbarItems'>
                        <Button color='inherit' onClick={() => dispatch(toggleModalWindowLogin())}>Войти</Button>
                        <Button color='inherit' sx={{ml: '25px'}}>Помощь</Button>
                    </div>
                </Toolbar>
            </AppBar>
    )
}



export default NavBar