
import { useSelector, useDispatch } from "react-redux";
import { Snackbar  } from "@mui/material";
import MuiAlert from '@mui/material/Alert'

import { toggleSnackbar } from "../../reducers/interactive";
import './snackbar.sass'


const Snack = () => {
    const dispatch = useDispatch()
    const { showSnackbar, snackBarData } = useSelector(state => state.interactive)

  return (
    <Snackbar
        open={showSnackbar}
        autoHideDuration={4000}
        onClose={() => dispatch(toggleSnackbar())}
        >
        <MuiAlert elevation={6} variant="filled" severity={snackBarData.type}>
            {snackBarData.text}
        </MuiAlert>
    </Snackbar>
  )
};

export default Snack
