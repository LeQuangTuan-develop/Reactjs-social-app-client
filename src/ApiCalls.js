import API from "./util/Api"
import {LoginStart, LoginSuccess, LoginFailue} from "./context/AuthAction"

export const loginCall = async (userCredentials, dispatch) => {
    dispatch(LoginStart(userCredentials))
    try {
        const res = await API.post("auth/login", userCredentials)
        dispatch(LoginSuccess(res.data))
    } catch (err) {
        dispatch(LoginFailue(err))
    }
}