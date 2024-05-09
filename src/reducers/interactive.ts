import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { IUserData } from "../types/userData";

interface ISnackBarData {
    text: string;
    type: string;
}
interface IinitialSTate {
    sideMenu: boolean;
    modalWindowLogin: boolean;
    modalWindowRegister: boolean;
    passAuth: boolean;
    userData: IUserData | null;
    showSnackbar: boolean;
    snackBarData: ISnackBarData;
}

const initialState: IinitialSTate = {
    sideMenu: false,
    modalWindowLogin: false,
    modalWindowRegister: false,
    passAuth: false,
    userData: null,
    showSnackbar: false,
    snackBarData: { text: "", type: "" },
};

const interactiveSlice = createSlice({
    name: "interactive",
    initialState,
    reducers: {
        toggleSideMenu: (state) => {
            state.sideMenu = !state.sideMenu;
        },
        toggleModalWindowLogin: (state) => {
            state.modalWindowLogin = !state.modalWindowLogin;
        },
        toggleRegisterWindowModal: (state) => {
            state.modalWindowRegister = !state.modalWindowRegister;
        },
        toggleSnackbar: (state) => {
            state.showSnackbar = !state.showSnackbar;
        },
        callSnackbar: (state, action: PayloadAction<ISnackBarData>) => {
            state.snackBarData = action.payload;
            state.showSnackbar = !state.showSnackbar;
        },
        setPassAuth: (state, action: PayloadAction<boolean>) => {
            state.passAuth = action.payload;
        },
        setUserData: (state, action: PayloadAction<IUserData>) => {
            state.userData = action.payload;
        },
    },
});

const { actions, reducer } = interactiveSlice;
export default reducer;
export const {
    toggleSideMenu,
    toggleModalWindowLogin,
    toggleRegisterWindowModal,
    toggleSnackbar,
    setPassAuth,
    callSnackbar,
    setUserData,
} = actions;
