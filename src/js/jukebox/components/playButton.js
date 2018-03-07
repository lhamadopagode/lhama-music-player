import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faPlay from '@fortawesome/fontawesome-free-solid/faPlay';
import faPause from '@fortawesome/fontawesome-free-solid/faPause';
import faCircleNotch from '@fortawesome/fontawesome-free-solid/faCircleNotch';

export default function PlayButton(props) {
  if (props.isFetched) {
    
    if (props.isPlaying) {
      return (
        <button
          className="jukebox__play-pause"
          onClick={props.pause.bind(this)}
        >
          <FontAwesomeIcon
            icon={faPause}
            className={props.isPlaying ? '' : 'jukebox__play-pause-icon'}
          />
        </button>);
    }
    return (
      <button
        className="jukebox__play-pause"
        onClick={props.playSong.bind(this)}
      >
        <FontAwesomeIcon
          icon={faPlay}
          className="jukebox__play-pause-icon"
        />
      </button>);
  }
  // debugger;
  return (
    <button
      disabled
      className="jukebox__play-pause"
    >
      <FontAwesomeIcon spin icon={faCircleNotch} />
  </button>);
}
