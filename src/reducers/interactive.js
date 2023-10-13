import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    sideMenu: false,
    modalWindowLogin: false,
    modalWindowRegister: false,
    userToken: null,
    showSnackbar: false,
    snackBarData: {}
}

const interactiveSlice = createSlice({
    name: 'interactive',
    initialState,
    reducers: {
        toggleSideMenu: state => { state.sideMenu = !state.sideMenu },
        toggleModalWindowLogin: state => { state.modalWindowLogin = !state.modalWindowLogin},
        toggleRegisterWindowModal: state => { state.modalWindowRegister = !state.modalWindowRegister},
        toggleSnackbar: state => {state.showSnackbar = !state.showSnackbar},
        getUserToken: (state, action) => {state.userToken = action.payload},
        callSnackbar: (state, action) => {
            state.snackBarData = action.payload;
            state.showSnackbar = !state.showSnackbar
        }


    }
})

const {actions, reducer} = interactiveSlice
export default reducer
export const {
    toggleSideMenu, 
    toggleModalWindowLogin,
    toggleRegisterWindowModal,
    toggleSnackbar,
    getUserToken,
    callSnackbar
} = actions