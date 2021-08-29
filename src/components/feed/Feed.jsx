import "./feed.css"
import Share from "../share/Share"
import Post from "../post/Post"
import { useState, useEffect } from "react"
import API from "../../util/Api"
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function Feed({ username }) {
    const [posts, setPosts] = useState([])
    const {user} = useContext(AuthContext)

    useEffect(() => {
        const fetchPosts = async () => {
            const res = username   
            ? await API.get(`posts/profile/${username}`) 
            : await API.get(`posts/newfeed/${user._id}`)
            setPosts(res.data.sort((p1, p2) => {
                return new Date(p2.createdAt) - new Date(p1.createdAt)
            }))
        }
        fetchPosts()
    }, [username, user._id])

    return (
        <div className="feed">
            <div className="feedWrapper">
                { (!username || user.username === username) && <Share /> }
                {posts.map(post => <Post key={post._id} post={post} />)}
            </div>
        </div>
    )
}

export default Feed