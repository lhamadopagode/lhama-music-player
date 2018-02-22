import _ from 'lodash';
import React from 'react';
import SoundCloudPlayerWrapper, { SoundCloudPlayerWrapperEvents } from './components/soundCloudPlayerWrapper';
import PlayButton from './components/playButton';

class Jukebox extends React.Component {
  constructor(props) {
    super(props);

    this.clientId = 'XKuHKW11tHj45yuqhpxy2eC04Z0I9rIi';

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

    window.addEventListener(SoundCloudPlayerWrapperEvents.PLAYING, _=> this.setState({ isPlaying: true}));
    window.addEventListener(SoundCloudPlayerWrapperEvents.FINISHED, _=> { this.playNextSong(); this.setState({ isPlaying: false }) });
  }

  componentWillMount() {
    SC.initialize({
      client_id: this.clientId
    });

    fetch('https://cassandra-ced35.firebaseio.com/playlists.json').then((response) => {
      return response.json();
    }).then((json) => {
      this.tracks = json[0].tracks;
    }).catch( error => console.log(error));;
  }

  pause() {
    this.player.pause();
    this.setState({
      isPlaying: false,
    });
  }

  playNextSong() {
    // debugger;
    this.musicPosition++;
    this.player.kill();
    this.player = new SoundCloudPlayerWrapper(this.state.tracks[this.musicPosition].track_id);
    this.setState({
      nowPlaying: {
        trackName: this.state.tracks[this.musicPosition].track_title,
        artistName: this.state.tracks[this.musicPosition].track_artist,
      }
    });
    fetch('http://api.soundcloud.com/tracks/'+ this.state.tracks[this.musicPosition].track_id +'?client_id='+ this.clientId)
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          playingCover: json.artwork_url.replace('large','t500x500')
        })
      });
    this.player.play();
  }

  playSong() {
    // debugger;
    if (_.isUndefined(this.player)) {
      this.musicPosition = 0
      this.player = new SoundCloudPlayerWrapper(this.state.tracks[this.musicPosition].track_id);
      this.setState({
        nowPlaying: {
          trackName: this.state.tracks[this.musicPosition].track_title,
          artistName: this.state.tracks[this.musicPosition].track_artist,
        }
      });
      fetch('http://api.soundcloud.com/tracks/' + this.state.tracks[this.musicPosition].track_id + '?client_id=' + this.clientId)
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

  renderPlayButton() {
    if (this.state.tracks.length) {
      if (this.state.isPlaying) {
        return <button className="jukebox__play-pause" onClick={this.pause.bind(this)}><FontAwesomeIcon icon={faPause} className={this.state.isPlaying ? '' : 'jukebox__play-pause-icon'} /></button>
      }
        return (<button
          className="jukebox__play-pause"
          onClick={this.playSong.bind(this)}
        >
          <FontAwesomeIcon
              icon={faPlay}
              className="jukebox__play-pause-icon"
          />
        </button>)
    }
    return <button disabled className="jukebox__play-pause"><FontAwesomeIcon icon={faCircleNotch} /></button>
  }

  render() {
    return (
      <div className="jukebox__wrapper">
        <div className="jukebox">
          <div className="jukebox__cover">
             <PlayButton
              tracks={this.tracks}
              pause={this.pause}
              isPlaying={this.state.isPlaying}
              playSong={this.playSong}
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