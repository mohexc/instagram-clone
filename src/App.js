import React from 'react';
import './App.less';
import Post from './components/Post';

const morkData = [
  {
    username: "Nanut",
    caption: "Solfware Developer",
    imageUrl: 'https://source.unsplash.com/user/erondu/1600x901'
  },
  {
    username: "Matong",
    caption: "Solfware Developer",
    imageUrl: 'https://source.unsplash.com/user/erondu/1600x902'
  },
  {
    username: "Honda",
    caption: "Solfware Developer",
    imageUrl: 'https://source.unsplash.com/user/erondu/1600x903'
  },
]


const App = () => (
  <div className="app">
    <div className="app__header">
      <img
        className="app__headerImage"
        src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
        alt="instagram clone" />
    </div>

    {morkData.map(data => <Post data={data} />)}
  </div>
);

export default App;