

import {AppBar, IconButton, Toolbar, Typography, Button} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import { toggleMenu, tryCheck } from '../../reducers/restoApp';

import './header.sass'
import { useDispatch } from 'react-redux';




const Header = () => {

    const dispatch = useDispatch()


    return (
            <AppBar>
                <Toolbar>
                    <IconButton  onClick={() => dispatch(toggleMenu())} color='inherit'>
                        <MenuIcon/>
                    </IconButton>
                    <Typography 
                    marginLeft='20px'
                    variant='h5'
                    component='span'>
                        Resto
                    </Typography>
                    <div className='navbarItems'>
                        <Button color='inherit'>Login</Button>
                        <Button color='inherit' sx={{ml: '25px'}}>Help</Button>
                        <button onClick={() => dispatch(tryCheck())}>Click</button>
                    </div>
                    <div></div>
                </Toolbar>
            </AppBar>
    )
}



export default Header