import { TextField } from '@mui/material'
import { styled } from '@mui/material/styles';

import './header.sass'

const Header = () => {

    const SearchBar = styled(TextField)({
        '& label.Mui-focused': {
          color: '#464744',
        },
        '& .MuiInput-underline:after': {
          borderBottomColor: '#B2BAC2',
        },
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: '#E0E3E7',
          },
          '&:hover fieldset': {
            borderColor: '#B2BAC2',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#6F7E8C',
          },
        },
      });

    return (
        <div className='main-page-header'>
            <div className='search-bar'>
                {/* <TextField sx={{border: 'black'}}fullWidth label="Поиск ресторана..." variant="outlined"/> */}
                <SearchBar fullWidth label='Поиск ресторана...' variant='outlined'/>
            </div>
        </div>
    )
}

export default Header