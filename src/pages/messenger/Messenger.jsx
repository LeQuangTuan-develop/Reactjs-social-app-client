import { useContext, useEffect, useRef, useState } from "react"
import "./messenger.css"
import Topbar from "../../components/topbar/Topbar"
import Conversation from "../../components/conversations/Conversation"
import Message from "../../components/message/Message"
import ChatOnline from "../../components/chatOnline/chatOnline"
import { AuthContext } from "../../context/AuthContext"
import Api from "../../util/Api"
import io from "socket.io-client"

export default function Messenger() {
    const {user} = useContext(AuthContext)
    const [conversations, setConversations] = useState([])
    const [currentChat, setCurrentChat] = useState(null)
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState("")
    const [arrivalMessage, setArrivalMessage] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])
    const socket = useRef()
    const scrollRef = useRef()

    useEffect(() => {
        socket.current = io("ws://localhost:8900")
        socket.current.on("getMessage", (data) => {
            console.log("nhận message", data);
            setArrivalMessage({
                senderId: data.senderId,
                text: data.text,
                createdAt: Date.now(),
                _id: Math.random()*10000000
            })
        })
    }, [])

    useEffect(() =>{
        arrivalMessage && currentChat?.members.includes(arrivalMessage.senderId) && 
        setMessages(preState => [...preState, arrivalMessage])
    }, [arrivalMessage, currentChat]);

    useEffect(() => {
        socket.current.emit("addUser", user._id)
        socket.current.on("getUsers", users => {
            setOnlineUsers(user.followings.filter(f => users.some(u => u.userId === f)))
        })
    }, [user])

    useEffect(() => {
        const fetchConversations = async () => {
            try {
                const conversationsData = await Api.get(`/conversations/${user._id}`)
                setConversations(conversationsData.data)
            } catch (error) {
                console.log(error);
            }
        }
        fetchConversations()
    }, [user._id])

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const messagesData = await Api.get(`/messages/${currentChat?._id}`)
                setMessages(messagesData.data)
            } catch (error) {
                console.log(error);
            }
        }
        fetchMessages()
    }, [currentChat])

    useEffect(() => {
        scrollRef.current?.scrollIntoView()
    }, [messages])

    const handleEnter = async (e) => {
        if (e.keyCode === 13) {
            await handleSubmit()
        }
    }

    const handleSubmit = async () => {
        let NewData = {
           text: newMessage,
           senderId: user._id,
           conversationId: currentChat._id
        }

        const receiverId = currentChat.members.find(member => member !== user._id)

        socket.current.emit("sendMessage", {
            senderId: user._id,
            receiverId,
            text: newMessage
        })

        try {
            const newMes = await Api.post(`/messages/create`, NewData)
            setMessages([...messages, newMes.data])
            setNewMessage("")
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
        <Topbar />
        <div className="messenger">
            <div className="chatMenu">
                <div className="chatMenuWrapper">
                    <input placeholder="Tìm kiếm bạn" className="chatMenuInput" />
                    {conversations.map(conversation =>  
                        <div 
                            key={conversation._id} 
                            onClick={() => setCurrentChat(conversation)}
                        >
                            <Conversation 
                                conversation={conversation} 
                                currentUser={user}
                            />
                        </div>
                    )}
                </div>
            </div>
            <div className="chatBox">
                { currentChat ? 
                <div className="chatBoxWrapper">
                    <div className="chatBoxTop">
                        {messages.map(mes => 
                            <div ref={scrollRef} key={mes._id}>
                                <Message message={mes} own={mes.senderId === user._id} />
                            </div>
                        )}
                    </div>
                    <div className="chatBoxBottom">
                        <input 
                            type="text" 
                            className="chatMessageInput" 
                            placeholder="Nhập tin nhắn" 
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyUp={handleEnter}
                            value={newMessage}
                        />
                        <button className="chatSubmitButton" onClick={handleSubmit}>Gửi</button>
                    </div>
                </div>
                : 
                <span className="noConversationText">Chào mừng bạn đến với social app</span>
                }
            </div>
            <div className="chatOnline">
                <div className="chatOnlineWrapper">
                    <div className="chatOnlineTitle">Bạn bè đang online</div>
                    <ChatOnline onlineUsers={onlineUsers} currentId={user._id} setCurrentChat={setCurrentChat} />
                </div>
            </div>
        </div>
        </>
    )
}
