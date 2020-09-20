import React, { useEffect, useState } from 'react';
import './App.less';
import Post from './components/Post';
import { db } from './config/firebase.js'

const App = () => {

  const [posts, setPosts] = useState([])
  useEffect(() => {
    db.collection('posts').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => {
        return { ...doc.data(), id: doc.id }
      }))
    })
  }, [])
  return (
    <div className="app">
      <div className="app__header">
        <img
          className="app__headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt="instagram clone" />
      </div>
      {posts.map(post => <Post key={post.id} data={post} />)}
    </div>
  );
}

export default App;