import React from "react";
import { useAppDispatch, useAppSelector } from "../../types/store";
// import { useSelector, useDispatch } from "react-redux";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

import { toggleSnackbar } from "../../reducers/interactive";
import "./snackbar.sass";

const Snack = () => {
    const dispatch = useAppDispatch();
    const { showSnackbar, snackBarData } = useAppSelector((state) => state.interactive);

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
    );
};

export default Snack;
