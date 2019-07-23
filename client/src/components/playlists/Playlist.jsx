import React, { Component } from 'react';
import Track from './Track';


class Playlist extends Component {
    
     render() {
        console.log(this.props);
        const tracks = this.props.playlist.tracks;
        return (
            <div className="mt-3">
                {/* <h5>{playlist_name}</h5> */}
                <div id="tracks" className="mt-5"> 
                {tracks.map(track => (
                    <Track track={track.track} playlist_id={this.props.playlist.playlist_id} playlist_name={this.props.playlist.playlist_name} deleteTrack={this.props.deleteTrack} deletedTrack={this.props.deletedTrack} key={track.track.id} />
                ))}
                </div>
            </div>
        )
    }
}

export default Playlist;