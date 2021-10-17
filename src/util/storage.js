const USER_INFO = 'USER_INFO' 

const storage = {
    get() {
        return JSON.parse(localStorage.getItem(USER_INFO)) || null
    },
    set(user) {
        localStorage.setItem(USER_INFO, JSON.stringify(user))
    }
}

export default storage