import React, { Component } from 'react';
import {loadUser, loadPlaylists, getPlaylist, removeTrack} from './api/Spotify';
import Playlist from './playlists/Playlist';

class User extends Component {
    constructor(props){
        super(props);
        this.state = {access_token: this.props.location.pathname.substr(4)}
    }

    componentDidMount(){
        localStorage.setItem('access_token',this.props.location.pathname.substr(4));
        loadUser(this.state.access_token).then( user =>{
            this.setState({...this.state, user })
        })
        loadPlaylists(this.state.access_token).then(playlists =>{
            this.setState({...this.state, playlists})
        })
    }

    playlistSelected = (id,name, owner) => {
        getPlaylist(id).then(tracks =>{
            this.setState({...this.state, selectedPlaylist: {
                playlist_id: id,
                playlist_name: name,
                playlist_owner: owner,
                tracks
            }})
        })

    }

    deleteTrack = (track_id, playlist_id, playlist_name, playlist_owner) =>{
        const response = removeTrack(track_id, playlist_id);
        if(response){
            if(this.state.selectedPlaylist){
            this.setState({...this.state, 
                selectedPlaylist: { 
                    playlist_id,
                    playlist_name,
                    playlist_owner,
                    tracks: this.state.selectedPlaylist.tracks.filter(item => (item.track.id !== track_id))
                }
            })
            }
        }
    }
      
    render() {
        console.log(this.state);
        return (
            <div id="account" className="p-2 mb-5">
                <div className="container bg-dark text-white mt-5 p-5">
                    {this.state.user ? <div>
                        <p className="lead mb-0">{this.state.user.display_name} </p>
                        <small className="text-muted">{this.state.user.followers.total} Followers, </small>
                        {this.state.playlists ? 
                            <small className="text-muted">{this.state.playlists.length} Playlists</small>
                            : <div></div>
                        }
                        </div>
                      : (
                        <div></div>)}
                    <h4 className="display-4 text-center">Manage Your Playlists</h4>
                    
                    {/* <p className="lead mt-5">Your Playlists</p> */}
                    <div className="row mt-5 border-top pt-3">
                        <div className="col-md-6 px-3">
                            <div className="text-center lead">Your Playlists</div>
                            {this.state.playlists ? this.state.playlists.map(playlist =>(
                                <div id="playlists-display" className="media mt-5 ml-5 text-light text-decoration-none" key={playlist.id} onClick={() => this.playlistSelected(playlist.id, playlist.name, playlist.owner.id)}>
                                    <img src={playlist.images[0].url} className="mr-3 img-fluid" alt="playlist" width='60px' />
                                    <div className="media-body">
                                        <h5 className="mt-0">{playlist.name}</h5>
                                        <small>by {playlist.owner.display_name}
                                            {playlist.tracks ? <small className="text-muted ml-2"> {playlist.tracks.total+' '} tracks </small> : <small></small>}
                                        </small>
                                        
                                    </div>
                                </div>
                            )) 
                            :   <div className="spinner-grow text-light" role="status">Loading</div>
                            }
                        </div>
                        <div className="col-md-6 px-3">
                            <div className="text-center lead mb-3">Tracks</div>
                            <div id="track-area">
                                {this.state.selectedPlaylist ? <Playlist playlist={this.state.selectedPlaylist} user_id={this.state.user.id} deleteTrack={this.deleteTrack} /> : <div className="text-muted text-center" style={{paddingTop:'30%'}}>Please select a playlist to view tracks</div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default User;
