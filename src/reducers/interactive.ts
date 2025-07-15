import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useHttp } from "../hooks/http.hook";
import { currentUrl } from "../../URLs";
import type { IUserStoreData } from "../types/userData";
import { RootState } from "../store";

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

// export const updateUserData = createAsyncThunk<IUserData, string>(
//     "interactive/updateUserData",
//     (userId) => {
//         const { request } = useHttp();
//         return request(`${currentUrl}/user/getdata/${userId}`);
//     }
// );
// export const updateUserData = createAsyncThunk<IUserData, void>(
//     "interactive/updateUserData",
//     () => {
//         const { request } = useHttp();
//         return request(`${currentUrl}/auth/me`);
//     }
// );

const initialState: IinitialSTate = {
    sideMenu: false,
    isAuth: null,
    userData: null,
    showSnackbar: false,
    snackBarData: { text: "", type: "success" },
    // postFields: [],
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
        setIsAuth: (state, action: PayloadAction<true>) => {
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
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(updateUserData.fulfilled, (state, action: PayloadAction<IUserData>) => {
    //             state.userData = action.payload;
    //             state.isAuth = true;
    //         })
    //         .addCase(updateUserData.rejected, (state) => {
    //             state.userData = null;
    //             state.isAuth = false;
    //         });
    // },
});

const { actions, reducer } = interactiveSlice;
export default reducer;
export const {
    toggleSideMenu,
    // toggleModalWindowLogin,
    // toggleRegisterWindowModal,
    toggleSnackbar,
    // setPassAuth,
    callSnackbar,
    setUserDataAndAuth,
    setIsAuth,
    logoutUser,
} = actions;
