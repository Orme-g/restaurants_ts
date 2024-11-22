const useLocalStorage = () => {
    const setData = (data) => {
        const newData = JSON.stringify(data);
        localStorage.setItem("userData", newData);
    };

    const getUserData = () => {
        const userData = JSON.parse(localStorage.getItem("userData"));
        return userData;
    };
    const getUserId = () => {
        const userData = JSON.parse(localStorage.getItem("userData"));
        return userData._id;
    };

    const clearData = (data) => {
        localStorage.removeItem(data);
    };

    return { setData, getUserData, clearData, getUserId };
};

export default useLocalStorage;
