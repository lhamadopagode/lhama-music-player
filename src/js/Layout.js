import React, { Component } from 'react';
import Navbar from './components/Navbar';
import Jukebox from './jukebox/main';

class Layout extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render(){
    return(
      <div>
        <Navbar />
        <Jukebox />
      </div>
    )
  }
}

export default Layout