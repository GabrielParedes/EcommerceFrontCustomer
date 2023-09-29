const getSessionStatus = () => {
    console.log('================================= STATUS SESSION')
    console.log(localStorage.getItem('isSessionActive') || false)

    return localStorage.getItem('isSessionActive') || false
}

export {
    getSessionStatus
}