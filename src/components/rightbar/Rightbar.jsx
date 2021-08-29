import "./rightbar.css"
import Online from "../online/Online"
import { Users } from '../../dummyData'

function Rightbar() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER

    return (
        <div className="rightbar">
            <div className="rightbarWrapper">
                <div className="birthdayContainer">
                    <img src={PF + "gift.png"} alt="" className="birthdayImg" />
                    <span className="birthdayText">
                        <b>Lộc Sarma</b> và <b>3 người khác</b> có ngày sinh nhật hôm nay
                    </span>
                </div>
                <img src={PF + "birthday.jpg"} alt="" className="rightbarAd" />
                <h4 className="rightbarTitle">Đang hoạt động</h4>
                <ul className="rightbarFriendList">
                    {Users.map(user => <Online key={user.id} user={user}/>)}
                </ul>
            </div>
        </div>
    )
}

export default Rightbar