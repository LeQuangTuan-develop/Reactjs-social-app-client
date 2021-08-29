import Sidebar from "../../components/sidebar/Sidebar"
import Topbar from "../../components/topbar/Topbar"
import RightbarProfile from "../../components/rightbarProfile/RightbarProfile"
import Feed from "../../components/feed/Feed"
import { useState, useEffect } from "react"
import "./profile.css"
import API from "../../util/Api"
import { useParams } from "react-router"

function Profile() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const [user, setUser] = useState({})
    const { username } = useParams()

    useEffect(() => {
        const fetchUser = async () => {
            const res = await API.get(`/users?username=${username}`)
            setUser(res.data)
        }
        fetchUser()
    }, [username])

    return (
        <>
            <Topbar />
            <div className="profile">
                <Sidebar/>
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img 
                                src={user.coverPicture ? PF + user.coverPicture : PF + "person/cover-default.jpg"} 
                                alt="" 
                                className="profileCoverImg" 
                            />
                            <img 
                                src={user.profilePicture ? PF + user.profilePicture : PF + "person/avatar-default.png"}   
                                alt="" 
                                className="profileUserImg" 
                            />
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName">{user.username}</h4>
                            <span className="profileInfoDesc">{user.description}</span>
                        </div>
                    </div>
                    <div className="profileRightBottom">
                        <Feed username={username} />
                        <RightbarProfile user={user}/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile
