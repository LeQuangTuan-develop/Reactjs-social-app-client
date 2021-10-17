import { useEffect, useState } from 'react'
import Api from '../../util/Api'
import './chatOnline.css'

export default function ChatOnline({onlineUsers, currentId, setCurrentChat}) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const [friends, setFriends] = useState([])
    const [onlineFriends, setOnlineFriends] = useState([])

    useEffect(() => {
        const getFriends = async () => {
            try {
                const friendsData = await Api.get(`users/friends/${currentId}`)
                setFriends(friendsData.data)
            } catch (error) {
                console.log(error);
            }
        }
        getFriends()
    }, [currentId])

    useEffect(() => {
        setOnlineFriends(friends.filter(friend => onlineUsers.includes(friend._id)))
    }, [friends, onlineUsers])

    const handleClick = async (user) => {
        try {
            const conversation = await Api.get(`conversations/find/${currentId}/${user._id}`)
            setCurrentChat(conversation.data)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="chatOnline">
            {onlineFriends.map(friend => 
                <div className="chatOnlineFriend" onClick={() => handleClick(friend)}>
                    <div className="chatOnlineImgContainer">
                        <img 
                            src={ friend.profilePicture ? PF + friend.profilePicture : PF + "person/avatar-default.png" } 
                            alt="" 
                            className="chatOnlineImg"
                        />
                        <div className="chatOnlineBadge"></div>
                    </div>
                    <span className="chatOnlineName">{friend.username}</span>
                </div>
            )}
        </div>
    )
}
