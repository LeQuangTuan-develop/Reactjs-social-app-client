import { useRef } from "react";
import "./login.css"
import {loginCall} from "../../ApiCalls"
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import {CircularProgress} from "@material-ui/core"
import { Link } from "react-router-dom";

export default function Login() {
    const email = useRef()
    const password = useRef()
    const {user, isFetching, dispatch} = useContext(AuthContext)

    const handleSubmit = (e) => {
        e.preventDefault();
        loginCall({email: email.current.value, password: password.current.value}, dispatch)
    }

    console.log(user);

    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">Social</h3>
                    <span className="loginDesc">
                        Kết nối với bạn bè và thế giới xung quanh trên Social
                    </span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleSubmit}>
                        <input 
                            placeholder="Địa chỉ Email" 
                            type="text" 
                            required 
                            className="loginInput" 
                            ref={email} 
                        />
                        <input 
                            placeholder="Mật khẩu" 
                            type="password" 
                            required 
                            minLength="6"
                            className="loginInput" 
                            ref={password} 
                        />
                        <button className="loginButton" disabled={isFetching}>
                            {isFetching ? <CircularProgress color="white" size="20px" /> : "Đăng nhập"}
                        </button>
                        <span className="loginForgot">Quên mật khẩu?</span>
                        <button className="loginRegisterButton" disabled={isFetching}>
                            <Link to="/register" style={{textDecoration: "none", color: "white"}}>
                                Tạo tài khoản mới
                            </Link>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
