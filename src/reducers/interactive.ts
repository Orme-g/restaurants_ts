import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useHttp } from "../hooks/http.hook";
import type { IUserData } from "../types/userData";

interface ISnackBarData {
    text: string;
    type: "error" | "info" | "success" | "warning";
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

export const updateUserData = createAsyncThunk("interactive/updateUserData", (userId: string) => {
    const { request } = useHttp();
    return request(`http://localhost:4000/user/getdata/${userId}`);
});

const initialState: IinitialSTate = {
    sideMenu: false,
    modalWindowLogin: false,
    modalWindowRegister: false,
    passAuth: false,
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
        setUserData: (state, action: PayloadAction<IUserData | null>) => {
            state.userData = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(updateUserData.fulfilled, (state, action: PayloadAction<IUserData>) => {
            state.userData = action.payload;
        });
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
