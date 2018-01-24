export const SoundCloudPlayerWrapperEvents = {
  PLAYING: 'playing',
  PAUSED: 'paused',
  FINISHED: 'finished',
};

class SoundCloudPlayerWrapper {
  constructor(musicURI){
    this.id = musicURI;
    this.player = {};
    this.event = {}
    this.event[SoundCloudPlayerWrapperEvents.PLAYING] = new CustomEvent('playing',{
      musicID: this.id,
    });
    this.event[SoundCloudPlayerWrapperEvents.PAUSED] = new CustomEvent('paused',{
      musicID: this.id,
    });
    this.event[SoundCloudPlayerWrapperEvents.FINISHED] = new CustomEvent('finished',{
      musicID: this.id,
    });
    this.event.buffered = new CustomEvent('buffered',{
      musicID: this.id,
    });

  }

  play(){
     SC.stream('tracks/' + this.id).then((player) => {
      // debugger;
      this.player = player;
      this.player.play().then(_=>{
        this.player.on('finish', _ => { 
          window.dispatchEvent(this.event[SoundCloudPlayerWrapperEvents.FINISHED]) 
        });
      });
      window.dispatchEvent(this.event[SoundCloudPlayerWrapperEvents.PLAYING]);
      
    });
  }
  
  pause(){
    this.player.pause();
  }
}


export default SoundCloudPlayerWrapper