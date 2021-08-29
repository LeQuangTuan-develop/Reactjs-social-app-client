import "./register.css"
import {Link} from "react-router-dom"
import {useHistory} from "react-router"
import { useRef } from "react"
import Api from "../../util/Api"

export default function Register() {
    const username = useRef()
    const email = useRef()
    const password = useRef()
    const confirmPassword = useRef()
    const history = useHistory()

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (confirmPassword.current.value !== password.current.value) {
            confirmPassword.current.setCustomValidity("Mật khẩu nhập lại không khớp");
        } else {
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value,
            }

            try {
                await Api.post("auth/register", user)
                history.push("/login")
            } catch (error) {
                console.log(error);
            }
        }
    }

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
                    <form className="registerBox" onSubmit={handleSubmit}>
                        <input 
                            placeholder="Tên người dùng" 
                            type="text" 
                            required
                            className="loginInput" 
                            ref={username}
                        />
                        <input 
                            placeholder="Địa chỉ Email" 
                            type="email" 
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
                        <input 
                            placeholder="Nhập lại mật khẩu"
                             type="password" 
                            required
                            minLength="6"
                            className="loginInput" 
                            ref={confirmPassword}
                        />
                        <button className="loginButton">Đăng ký</button>
                        <button className="loginRegisterButton">
                            <Link to="/login" style={{textDecoration: "none", color: "white"}}>
                                Đăng nhập tài khoản
                            </Link>                           
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
