import { Button, Row } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import './App.less';
import Post from './components/Post';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import { db, auth } from './config/firebase.js'
import { useAuthContext } from './context/AuthContext';


// main
const App = () => {

  const [posts, setPosts] = useState([])
  const [userInfo, setUserInfo] = useState(null)
  const [username, setUsername] = useState('')
  const signinModalRef = useRef()
  const signupModalRef = useRef()
  const { user, setUser } = useAuthContext()


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser)
        // user has logged in...
      } else {
        // user has logged out...
        setUserInfo(null)
      }
    })

    return () => { unsubscribe() }
  }, [userInfo, username, setUser])

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
              ? <Button onClick={() => auth.signOut()}>Logout</Button>
              : <div>
                <Button style={{ marginRight: '1rem' }} onClick={() => signinModalRef.current.showModal()}>Sign In</Button>
                <Button onClick={() => signupModalRef.current.showModal()}>Sign Up</Button>
              </div>
            }

          </div>
        </Row>
        <SignIn ref={signinModalRef} />
        <SignUp ref={signupModalRef} setUsername={setUsername} />
      </div>
      {posts.map(post => <Post key={post.id} data={post} />)}
    </div>
  );
}

export default App;