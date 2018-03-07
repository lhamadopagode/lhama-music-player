import _ from 'lodash';
import React from 'react';
import SoundCloudPlayerWrapper, { SoundCloudPlayerWrapperEvents } from './components/soundCloudPlayerWrapper';
import PlayButton from './components/playButton';
import { soundCloudAPIKey, playlistRestURL } from '~/api.config.js';

class Jukebox extends React.Component {
  constructor(props) {
    super(props);

    this.clientId = soundCloudAPIKey;

    this.tracks = [];
    this.state = {
      trackPosition: 0,
      tracksFetched: false,
      isPlaying: false,
      playingCover: 'http://placehold.it/500x500',
      nowPlaying: {
        trackName: 'No Name',
        artistName: 'No Artist',
      },
    }

    window.addEventListener(SoundCloudPlayerWrapperEvents.PLAYING, this.changeState.bind(this));
    window.addEventListener(SoundCloudPlayerWrapperEvents.FINISHED, this.autoSkip.bind(this));
  }


  changeState(){
    this.setState({ isPlaying: true });
  }

  autoSkip(){
    this.playNextSong();
    this.setState({ isPlaying: false }) 
  }

  componentWillMount() {
    SC.initialize({
      client_id: this.clientId
    });

    fetch(playlistRestURL).then((response) => {
      return response.json();
    }).then((json) => {
      this.tracks = json[1].tracks;
      this.setState({
        tracksFetched: true,
      });
    }).catch( error => console.log(error));;
  }

  pause() {
    this.player.pause();
    this.setState({
      isPlaying: false,
    });
  }

  playNextSong() {
    this.musicPosition++;
    this.player.skip();
    this.player = new SoundCloudPlayerWrapper(this.tracks[this.musicPosition].track_id);
    this.setState({
      nowPlaying: {
        trackName: this.tracks[this.musicPosition].track_title,
        artistName: this.tracks[this.musicPosition].track_artist,
      }
    });
    fetch(`http://api.soundcloud.com/tracks/'${this.tracks[this.musicPosition].track_id}'?client_id='${this.clientId}`)
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          playingCover: json.artwork_url.replace('large','t500x500')
        })
      });
    this.player.play();
  }

  playSong() {
    if (_.isUndefined(this.player)) {
      this.musicPosition = 0
      // debugger;
      this.player = new SoundCloudPlayerWrapper(this.tracks[this.musicPosition].track_id);
      this.setState({
        nowPlaying: {
          trackName: this.tracks[this.musicPosition].track_title,
          artistName: this.tracks[this.musicPosition].track_artist,
        }
      });
      fetch(`http://api.soundcloud.com/tracks/'${this.tracks[this.musicPosition].track_id}'?client_id='${this.clientId}`)
        .then((response) => response.json())
        .then((json) => {
          this.setState({
            playingCover: json.artwork_url.replace('large', 't500x500'),
          })
        });
      this.player.play();
    }
    else {
      this.player.play();
    }
  }

  render() {
    return (
      <div className="jukebox__wrapper">
        <div className="jukebox">
          <div className="jukebox__cover">
             <PlayButton
              tracks={this.tracks}
              pause={this.pause.bind(this)}
              isPlaying={this.state.isPlaying}
              playSong={this.playSong.bind(this)}
              isFetched={this.state.tracksFetched}
            />
            <img className="jukebox__cover-img" src={this.state.playingCover} alt="Album Cover"/>
          </div>
          <div className="jukebox__controls">
            <h1 className="jukebox__status">Now Playing</h1>
            <span className="jukebox__track-name">{this.state.nowPlaying.trackName}</span>
            <span className="jukebox__track-artist">{this.state.nowPlaying.artistName}</span>
            <button onClick={this.playNextSong.bind(this)}>Próxima</button>
          </div>
        </div>
      </div>
    )
  }
}

export default Jukebox