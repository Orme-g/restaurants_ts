import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    sideMenu: false
}

const interactiveSlice = createSlice({
    name: 'interactive',
    initialState,
    reducers: {
        toggleSideMenu: state => { state.sideMenu = !state.sideMenu }
    }
})

const {actions, reducer} = interactiveSlice
export default reducer
export const {toggleSideMenu} = actions