import Avatar from 'antd/lib/avatar/avatar'
import React from 'react'
import '../styles/Post.less'

const Post = ({ data }) => {
    console.log(data)
    debugger
    return (
        <div className="post">
            <div className="post__header">
                <Avatar className="post__avatar" > {data.username.charAt(0)}</Avatar>
                <h3>{data.username}</h3>
            </div>

            <img className="post__image" src={data.imageUrl} alt="" />

            <h4 className="post__text">
                <strong>{data.caption}</strong>
            </h4>

        </div>
    )
}

export default Post
