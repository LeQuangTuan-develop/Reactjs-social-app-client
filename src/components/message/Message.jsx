import "./message.css";
import {format} from "timeago.js"
import { useEffect, useState } from "react";
import Api from "../../util/Api";

export default function Message({own, message}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  const [user, setUser] = useState({})

  useEffect(() => {
    const getUser = async () => {
      try {
        const userData = await Api.get(`/users?userId=${message.senderId}`)
        setUser(userData.data) 
      } catch (error) {
        console.log(error);
      }
    }
    getUser()
  }, [message])

  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src={user.profilePicture ? PF + user.profilePicture : PF + "person/avatar-default.png" }
          alt=""
        />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
}
