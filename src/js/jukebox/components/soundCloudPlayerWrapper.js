class SoundCloudPlayerWrapper {
  constructor(musicURI){
    this.id = musicURI;
    this.player = {};
  }

  play(){
    this.player = SC.stream('tracks/' + this.id).then((player) => {
      debugger;
      player.play();
    });
  }
  
  pause(){
    this.player.pause();
  }
}

export default SoundCloudPlayerWrapper