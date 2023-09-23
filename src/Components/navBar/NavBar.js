

import {AppBar, IconButton, Toolbar, Typography, Button} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import { toggleSideMenu } from '../../reducers/restoApp';
import { useDispatch } from 'react-redux';

import './navBar.sass'





const NavBar = () => {

    const dispatch = useDispatch()

    return (
            <AppBar color='inherit'>
                <Toolbar>
                    <IconButton  onClick={() => dispatch(toggleSideMenu())} color='inherit'>
                        <MenuIcon/>
                    </IconButton>
                    <Typography 
                    marginLeft='20px'
                    variant='h5'
                    component='span'>
                        Ресто
                    </Typography>
                    <div className='navbarItems'>
                        <Button color='inherit'>Войти</Button>
                        <Button color='inherit' sx={{ml: '25px'}}>Помощь</Button>
                    </div>
                </Toolbar>
            </AppBar>
    )
}



export default NavBar