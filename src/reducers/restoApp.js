import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    sideMenu: false
}

const restoSlice = createSlice({
    name: 'interactive',
    initialState,
    reducers: {
        toggleSideMenu: state => { state.sideMenu = !state.sideMenu }
    }
})

const {actions, reducer} = restoSlice
export default reducer
export const {toggleSideMenu} = actions