import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    sideMenu: false,
    check: 0
}

const restoSlice = createSlice({
    name: 'resto',
    initialState,
    reducers: {
        toggleMenu: state => { state.sideMenu = !state.sideMenu },
        tryCheck: state => {state.check = state.check + 1}
    }
})

const {actions, reducer} = restoSlice
export default reducer
export const {toggleMenu, tryCheck} = actions