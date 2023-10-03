import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    sideMenu: false,
    modalWindowLogin: false
}

const interactiveSlice = createSlice({
    name: 'interactive',
    initialState,
    reducers: {
        toggleSideMenu: state => { state.sideMenu = !state.sideMenu },
        toggleModalWindowLogin: state => { state.modalWindowLogin = !state.modalWindowLogin}
    }
})

const {actions, reducer} = interactiveSlice
export default reducer
export const {
    toggleSideMenu, 
    toggleModalWindowLogin
} = actions