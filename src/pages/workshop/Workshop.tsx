import React, { useState } from "react";
import { useAppDispatch } from "../../types/store";

import {
    useLazyTestQuery,
    useRefreshMutation,
    useLogoutMutation,
    useLoginTestMutation,
    useClearAccessTokenMutation,
    authApi,
} from "../../services/authApi";

import "./workshop.scss";

const Workshop: React.FC = () => {
    const [info, setInfo] = useState<string | null>(null);
    const [getData, { data: protectedData, isFetching, isError }] = useLazyTestQuery();
    const [refreshToken, { isLoading }] = useRefreshMutation();
    const [logoutUser] = useLogoutMutation();
    const [loginUser] = useLoginTestMutation();
    const [clearAccessToken] = useClearAccessTokenMutation();
    const dispatch = useAppDispatch();
    async function handleClick() {
        const result = await getData();
        console.log(result);
        if (result.data) {
            setInfo(result.data.message);
        } else {
            setInfo((result.error as any)?.data);
        }
    }
    function refresh() {
        refreshToken()
            .unwrap()
            .then((result) => console.log(result.message))
            .catch((error) => setInfo(error.data));
    }
    function logout() {
        logoutUser()
            .unwrap()
            .then((result) => {
                setInfo(result.message);
                dispatch(authApi.util.resetApiState());
            })
            .catch((error) => setInfo(error.data));
    }
    function login() {
        loginUser()
            .unwrap()
            .then((result) => setInfo(result))
            .catch((error) => setInfo(error.data));
    }
    function clearAccessTokenFn() {
        clearAccessToken()
            .unwrap()
            .then((result) => {
                setInfo(result);
                dispatch(authApi.util.resetApiState());
            })
            .catch((error) => setInfo(error.data));
    }
    return (
        <div className="workshop">
            <button onClick={login}>Login</button>
            <button className="test_btn" onClick={handleClick}>
                Test btn
            </button>
            <button onClick={refresh}>Refresh</button>
            <button onClick={logout}>Logout</button>
            <button onClick={clearAccessTokenFn}>Clear access token</button>
            <div className="result">{info}</div>
        </div>
    );
};

export default Workshop;
