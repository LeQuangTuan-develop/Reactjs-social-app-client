import { useReducer } from "react"
import { createContext } from "react"
import AuthReducer from "./AuthReducer"

const INITIAL_STATE = {
    user: {
        "profilePicture": "person/quangtuan165.jpg",
        "coverPicture": "",
        "followers": [],
        "followings": ["6121aaeb3b22fc2a58f73e69", "6121aaf93b22fc2a58f73e6b"],
        "isAdmin": false,
        "_id": "6121aada3b22fc2a58f73e67",
        "username": "Quang Tuan",
        "email": "lequangtuan1605@gmail.com",
        "city": "Hồ Chí Minh",
        "from": "Thủ Đức",
        "relationship": 0,
        "description": "Cuộc sống mà"
    },
    isFetching: false,
    error: false,
}

export const AuthContext = createContext(INITIAL_STATE)

export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE)

    return (
        <AuthContext.Provider value={{
            user: state.user, 
            isFetching: state.isFetching, 
            error: state.error,
            dispatch,
        }}>
            {children}
        </AuthContext.Provider>
    )
}