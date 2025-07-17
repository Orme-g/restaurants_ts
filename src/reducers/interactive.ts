import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { IUserStoreData } from "../types/userData";
interface ISnackBarData {
    text: string;
    type: "error" | "info" | "success" | "warning";
}
interface IinitialSTate {
    sideMenu: boolean;
    isAuth: boolean | null;
    userData: IUserStoreData | null;
    showSnackbar: boolean;
    snackBarData: ISnackBarData;
}

const initialState: IinitialSTate = {
    sideMenu: false,
    isAuth: null,
    userData: null,
    showSnackbar: false,
    snackBarData: { text: "", type: "success" },
};

const interactiveSlice = createSlice({
    name: "interactive",
    initialState,
    reducers: {
        toggleSideMenu: (state) => {
            state.sideMenu = !state.sideMenu;
        },
        toggleSnackbar: (state) => {
            state.showSnackbar = !state.showSnackbar;
        },
        callSnackbar: (state, action: PayloadAction<ISnackBarData>) => {
            state.snackBarData = action.payload;
            state.showSnackbar = !state.showSnackbar;
        },
        setIsAuth: (state, action: PayloadAction<boolean | null>) => {
            state.isAuth = action.payload;
        },
        setUserDataAndAuth: (state, action: PayloadAction<IUserStoreData | null>) => {
            state.isAuth = true;
            state.userData = action.payload;
        },
        logoutUser: (state) => {
            state.isAuth = false;
            state.userData = null;
        },
    },
});

const { actions, reducer } = interactiveSlice;
export default reducer;
export const {
    toggleSideMenu,
    toggleSnackbar,
    callSnackbar,
    setUserDataAndAuth,
    setIsAuth,
    logoutUser,
} = actions;
