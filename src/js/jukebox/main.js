import React, { Component } from 'react';
import SoundCloudPlayerWrapper, { SoundCloudPlayerWrapperEvents } from './components/soundCloudPlayerWrapper';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faPlay from '@fortawesome/fontawesome-free-solid/faPlay'; 
import faPause from '@fortawesome/fontawesome-free-solid/faPause';
import faCircleNotch from '@fortawesome/fontawesome-free-solid/faCircleNotch';

class Jukebox extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      tracks: [],
      trackPosition: 0,
      isPlaying: false,
      playingCover: 'http://placehold.it/500x500',
      nowPlaying: {
        trackName: 'No Name',
        artistName: 'No Artist',
      },
      player: {},
    }
  }

  componentWillMount(){
    SC.initialize({
      client_id: 'XKuHKW11tHj45yuqhpxy2eC04Z0I9rIi',
    });
    
    fetch('https://cassandra-ced35.firebaseio.com/playlists.json').then((response) => {
      return Response.json();
    }).then((json) => {
      this.setState({
        tracks: json[0],
      })
    });
    /* fetch('http://api.soundcloud.com/playlists/413389793?client_id=XKuHKW11tHj45yuqhpxy2eC04Z0I9rIi').then((response) => {
      return response.json();
    }).then((json) => {
      this.setState({
        tracks: json.tracks
      })
      window.pagode = this.state;
    }); */
  }

  play(){
/*     if(this.state.isPlaying){
      this.state.player.pause();
      this.setState({
        isPlaying: false,
      });
    }
    else{
      debugger;
      if(this.state.player){
        SC.stream('/tracks/' + this.state.tracks[this.state.trackPosition].id).then((player) => {
          let isPlaying = player;
          isPlaying.play();
          return isPlaying;
        }).then((isPlaying) => {
          this.setState({ player: isPlaying });
          window.pagode = this.state;
        });
        this.setState({
          playingCover: this.state.tracks[this.state.trackPosition].artwork_url,
          isPlaying: true,
          nowPlaying: {
            trackName: this.state.tracks[this.state.trackPosition].title,
            artistName: this.state.tracks[this.state.trackPosition].user.username,
          }
        });
        
        let Playing = new CustomEvent('Playing', {
          'track': this.state.tracks[this.state.trackPosition].id,
        });
        
        window.dispatchEvent(Playing);
      }
      else {
        this.state.player.play();
        this.setState({
          isPlaying: true,
        });
      }
    } */
    

  }
  
  render() {
    return (
      <div className="jukebox__wrapper">
        <div className="jukebox">
          <div className="jukebox__cover">
            <button className="jukebox__play-pause" onClick={this.play.bind(this)}><FontAwesomeIcon icon={this.state.isPlaying ? faPause : faPlay} className={this.state.isPlaying ? '' : 'jukebox__play-pause-icon'}/></button>
            <img className="jukebox__cover-img" src={this.state.playingCover} alt="Album Cover"/>
          </div>
          <div className="jukebox__controls">
            <h1 className="jukebox__status">Now Playing</h1>
            <span className="jukebox__track-name">{this.state.nowPlaying.trackName}</span>
            <span className="jukebox__track-artist">{this.state.nowPlaying.artistName}</span>
            <span className="jukebox__track-album">Colors</span>
          </div>
        </div>
      </div>
    )
  }
}

export default Jukebox