import { Button, Row } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import './App.less';
import Post from './components/Post';
import Signin from './components/Signin';
import { db } from './config/firebase.js'

// main
const App = () => {

  const [posts, setPosts] = useState([])
  const signinModalRef = useRef()

  useEffect(() => {
    db.collection('posts').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => {
        return { ...doc.data(), id: doc.id }
      }))
    })
  }, [])

  return (
    <div className="app">
      <div className="app__header" >
        <Row justify="space-between">
          <img
            className="app__headerImage"
            src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
            alt="instagram clone" />

          <Button onClick={() => signinModalRef.current.showModal()}>Signin</Button>

        </Row>
        <Signin ref={signinModalRef} />
      </div>
      {posts.map(post => <Post key={post.id} data={post} />)}
    </div>
  );
}

export default App;