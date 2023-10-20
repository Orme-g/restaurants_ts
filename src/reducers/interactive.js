import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    sideMenu: false,
    modalWindowLogin: false,
    modalWindowRegister: false,
    passAuth: false,
    userData: null,
    showSnackbar: false,
    snackBarData: {},
}

const interactiveSlice = createSlice({
    name: "interactive",
    initialState,
    reducers: {
        toggleSideMenu: (state) => {
            state.sideMenu = !state.sideMenu
        },
        toggleModalWindowLogin: (state) => {
            state.modalWindowLogin = !state.modalWindowLogin
        },
        toggleRegisterWindowModal: (state) => {
            state.modalWindowRegister = !state.modalWindowRegister
        },
        toggleSnackbar: (state) => {
            state.showSnackbar = !state.showSnackbar
        },
        callSnackbar: (state, action) => {
            state.snackBarData = action.payload
            state.showSnackbar = !state.showSnackbar
        },
        setPassAuth: (state, action) => {
            state.passAuth = action.payload
        },
        setUserData: (state, action) => {
            state.userData = action.payload
        },
    },
})

const { actions, reducer } = interactiveSlice
export default reducer
export const {
    toggleSideMenu,
    toggleModalWindowLogin,
    toggleRegisterWindowModal,
    toggleSnackbar,
    setPassAuth,
    callSnackbar,
    setUserData,
} = actions
