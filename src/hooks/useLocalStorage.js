const useLocalStorage = () => {
    

    const setData = (data) => {
        const newData = JSON.stringify(data)
        localStorage.setItem('userData', newData)

    }

    const getUserData = () => {
        const userData = JSON.parse(localStorage.getItem('userData'))
        return userData
    }

    const clearData = (data) => {

        localStorage.removeItem(data)
    }


    return {setData, getUserData, clearData}
}

export default useLocalStorage
