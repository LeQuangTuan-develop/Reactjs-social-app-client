import "./topbar.css";
import { Search, Person, Chat, Notifications, ArrowDropDown } from '@material-ui/icons'
import {Link} from 'react-router-dom'
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function Topbar() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const {user} = useContext(AuthContext)

    return (
        <div className="topbarContainer">
            <div className="topbarLeft">
                <Link to="/" style={{textDecoration: "none"}}>
                    <span className="topbarLogo">Social</span>
                </Link>
            </div>
            <div className="topbarCenter">
                <div className="searchbar">
                    <Search className="searchIcon"/>
                    <input placeholder="Tìm kiếm bạn, bài đăng hoặc video" className="searchInput" />
                </div>
            </div>
            <div className="topbarRight">
                <div className="topbarLinks">
                    <span className="topbarLink">Home</span>
                    <span className="topbarLink">Newfeed</span>
                </div>
                <div className="topbarIcons">
                    <div className="topbarIconItem">
                        <Person/>
                        <span className="topbarIconBadge">1</span>
                    </div>
                    <div className="topbarIconItem">
                        <Chat/>
                        <span className="topbarIconBadge">1</span>
                    </div>
                    <div className="topbarIconItem">
                        <Notifications/>
                        <span className="topbarIconBadge">1</span>
                    </div>
                </div>
                <div className="topbarAccount">
                    <Link to={"/profile/" + user.username}>
                        <img src={user.profilePicture ? PF + user.profilePicture : PF + "person/avatar-default.png"} alt="" className="topbarImg" />
                    </Link>
                    <span className="topbarAccountName">{user.username}</span>
                    <ArrowDropDown/>
                </div>
            </div>
        </div>
    )
}

export default Topbar