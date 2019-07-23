import React, { Component } from 'react'

class Track extends Component {


    render() {
        console.log(this.props.user_id === this.props.playlist_owner);
        return (
            <div id="track-display" className="media my-4 text-light overflow-auto" height="600px">
                <img src={this.props.track.album.images[2].url} className="mr-3 img-fluid" alt="album art" width='50px' />
                <div className="media-body">
                    <div className="d-flex justify-content-between">
                    <div>
                        <p className="m-0">{this.props.track.name}</p>
                        {this.props.track.artists.map(artist => (
                            <small className="text-muted" key={artist.name}>{artist.name+' '}</small>
                            ))}
                    </div>
                    <div className='my-auto'>
                        { this.props.user_id === this.props.playlist_owner ? 
                        <button className="btn btn-sm btn-outline-dark" onClick={()=> this.props.deleteTrack(this.props.track.id, this.props.playlist_id, this.props.playlist_name, this.props.playlist_owner)}>Delete</button>
                        : <div></div>}
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Track;