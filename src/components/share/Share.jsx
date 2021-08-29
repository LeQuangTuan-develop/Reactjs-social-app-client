import "./share.css"
import {PermMedia, Label, Room, EmojiEmotions, Cancel} from "@material-ui/icons"
import { useContext,useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Api from "../../util/Api";

function Share() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const {user} = useContext(AuthContext)
    const desc = useRef()
    const [file, setFile] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        let newPost = {
            userId: user._id,
            description: desc.current.value
        }

        if (file) {
            const data = new FormData()
            data.append("file", file)

            try {
                const fileName = await Api.post("/upload", data)
                
                try {
                    await Api.post("/posts/create", newPost = {
                        ...newPost,
                        img: fileName.data
                    })
                    window.location.reload()
                } catch (error) {
                    console.log(error);
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <div className="share">
            <form className="shareWrapper" onSubmit={handleSubmit}>
                <div className="shareTop">
                    <img src={user.profilePicture ? PF + user.profilePicture : PF + "person/avatar-default.png"} alt="" className="shareProfileImg" />
                    <input 
                        placeholder={`${user.username} bạn đang nghĩ gì?`} 
                        type="text" 
                        className="shareInput" 
                        ref={desc}
                    />
                </div>
                <hr className="shareHr" />
                {file && (
                    <div className="shareImgContainer">
                        <img className="shareImg" alt="" src={URL.createObjectURL(file)}/>
                        <Cancel className="shareCancelImg" onClick={() => { 
                            setFile(null);
                        }}/>
                    </div>    
                )}
                <div className="shareBottom" >
                    <div className="shareOptions">
                        <label htmlFor="file" className="shareOption">
                            <PermMedia htmlColor="pomato" className="shareIcon"/>
                            <span className="shareOptionText">Hình ảnh/Video</span>
                            <input
                                style={{display: "none"}} 
                                type="file" 
                                id="file" 
                                accept=".png,.jpeg,.jpg"
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                        </label>
                        <div className="shareOption">
                            <Label htmlColor="blue" className="shareIcon"/>
                            <span className="shareOptionText">Tag</span>
                        </div>
                        <div className="shareOption">
                            <Room htmlColor="green" className="shareIcon"/>
                            <span className="shareOptionText">Vị trí</span>
                        </div>
                        <div className="shareOption">
                            <EmojiEmotions htmlColor="goldenrod" className="shareIcon"/>
                            <span className="shareOptionText">Cảm xúc</span>
                        </div>
                    </div>
                    <button className="shareButton" type="submit">Chia sẻ</button>
                </div>
            </form>
        </div>
    )
}

export default Share
