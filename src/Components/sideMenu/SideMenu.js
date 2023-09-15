import { Drawer } from "@mui/material"
import { useSelector, useDispatch } from "react-redux"
import { toggleMenu } from "../../reducers/restoApp"




const SideMenu = () => {


    const dispatch = useDispatch()
    const {sideMenu} = useSelector(state => state.restoReducer)

    return (
        <Drawer
        anchor="left"
        open={sideMenu}
        onClose={() => dispatch(toggleMenu())}
        >
        <ul>
            <li>Hello all</li>
        </ul>
        </Drawer>
    )
}




export default SideMenu