import { useReducer } from "react"
import { createContext } from "react"
import AuthReducer from "./AuthReducer"
import storage from "../util/storage"

const INITIAL_STATE = {
    user: storage.get(),
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