import { Link } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import Api from "../../util/Api"
import "./rightbarProfile.css"
import { AuthContext } from "../../context/AuthContext"
import {Add, Remove} from "@material-ui/icons"
import { Follow, Unfollow } from "../../context/AuthAction"

export default function RightbarProfile({ user }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const [friends, setFriends] = useState([])
    const {user:currentUser, dispatch} = useContext(AuthContext)
    const [followed, setFollowed] = useState(false)

    useEffect(() => {
        setFollowed(currentUser.followings.includes(user._id))
    }, [currentUser, user._id])

    useEffect(() => {
        const fetchFriendList = async () => {
            const listFriends = await Api.get("users/friends/" + user._id)
            setFriends(listFriends.data)
        }
        fetchFriendList()
    }, [user._id])

    const handleFollow = async () => {
        try {
            if (followed) {
                await Api.put(`users/${user._id}/unfollow`, {userId: currentUser._id})
                dispatch(Unfollow(user._id))
            } else {
                await Api.put(`users/${user._id}/follow`, {userId: currentUser._id})
                dispatch(Follow(user._id))
            }
        } catch (error) {
            console.log(error);
        }
        setFollowed(!followed)
    }
    
    return (
        <div className="rightbarProfile">
            {user.username !== currentUser.username && (
                <button className="rightbarFollowButton" onClick={handleFollow}>
                    {followed ? "Bỏ theo dõi" : "Theo dõi"}
                    {followed ? <Remove/> : <Add/>}
                    
                </button>
            )}
            <div className="rightbarWrapper">
                <h4 className="rightbarTitle">Thông tin cá nhân</h4>
                <div className="rightbarInfo">
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">Thành phố: </span>
                        <span className="rightbarInfoValue">{user.city}</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">Đến từ: </span>
                        <span className="rightbarInfoValue">{user.from}</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">Tình trạng: </span>
                        <span className="rightbarInfoValue">
                            {user.relationship === 0 ? "độc thân" : user.relationship === 1 ? "có người yêu" : "đã kết hôn"}
                        </span>
                    </div>
                </div>
                <h4 className="rightbarTitle">Bạn bè</h4>
                <div className="rightbarFollowings">
                    {friends.map(friend => (
                        <Link to={"/profile/" + friend.username} style={{textDecoration: "none", color: "#333"}}>
                            <div className="rightbarFollowing">
                                <img 
                                    src={friend.profilePicture ? PF + friend.profilePicture : PF + "person/avatar-default.png"} 
                                    alt="" 
                                    className="rightbarFollowingImg" 
                                />
                                <span className="rightbarFollowingName">{friend.username}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}
