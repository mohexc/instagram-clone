import { Button, Row } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import './App.less';
import Post from './components/Post';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import { db } from './config/firebase.js'
import { useAuthContext } from './context/AuthContext';


// main
const App = () => {

  const [posts, setPosts] = useState([])
  const signinModalRef = useRef()
  const signupModalRef = useRef()
  const { user, logout } = useAuthContext()

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

          <div >
            {user
              ? <Button onClick={() => logout()}>Logout</Button>
              : (
                <div>
                  <Button style={{ marginRight: '1rem' }} onClick={() => signinModalRef.current.showModal()}>Sign In</Button>
                  <Button onClick={() => signupModalRef.current.showModal()}>Sign Up</Button>
                </div>
              )
            }

          </div>
        </Row>
        <SignIn ref={signinModalRef} />
        <SignUp ref={signupModalRef} />
      </div>
      <div>
        {user && <p>{user.email}</p>}
      </div>
      {posts.map(post => <Post key={post.id} data={post} />)}
    </div>
  );
}

export default App;