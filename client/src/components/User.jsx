import React, { Component } from 'react';
// import Navbar from './Navbar';
// import {Link} from 'react-router-dom';
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

    playlistSelected = (id,name) => {
        getPlaylist(id).then(tracks =>{
            this.setState({...this.state, selectedPlaylist: {
                playlist_id: id,
                playlist_name: name,
                tracks
            }})
        })

    }

    deleteTrack = (track_id, playlist_id, playlist_name) =>{
        removeTrack(track_id, playlist_id);
        
        getPlaylist(playlist_id).then(tracks=>{
            this.setState({...this.state, selectedPlaylist: {
                playlist_id, playlist_name, tracks}})
        })
    }

      
    render() {
        console.log(this.state);
        
        return (
            <div id="account" className="p-2 mb-5">
                <div className="container bg-dark text-white mt-5 p-5">
                    {this.state.user ? <h3 className="text-center">Welcome {this.state.user.display_name} </h3> : (
                        <div className="spinner-border text-success" role="status">
                          <span className="sr-only">Loading...</span>
                        </div>)}
                    <p className="lead mt-5">Your Playlists</p>
                    <div className="row">
                        <div className="col-md-6 px-3">
                            {this.state.playlists ? this.state.playlists.map(playlist =>(
                                <div id="playlists-display" className="media mt-5 ml-5 text-light text-decoration-none" key={playlist.id} onClick={() => this.playlistSelected(playlist.id, playlist.name)}>
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
                            {this.state.selectedPlaylist ? <Playlist playlist={this.state.selectedPlaylist} deleteTrack={this.deleteTrack} /> : <div></div>}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default User;
