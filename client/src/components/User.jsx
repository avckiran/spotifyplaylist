import React, { Component } from 'react';
// import Navbar from './Navbar';
import {loadUser, loadPlaylists} from './api/Spotify';

class User extends Component {
    constructor(props){
        super(props);
        this.state = {access_token: this.props.location.pathname.substr(4)}
    }
    componentDidMount(){
        if(!localStorage.getItem('access_token')){
            window.localStorage.setItem('access_token',this.props.location.pathname.substr(4));
        }
        loadUser(this.state.access_token).then( user =>{
            this.setState({...this.state, user })
        })
        loadPlaylists(this.state.access_token).then(playlists =>{
            this.setState({...this.state, playlists})
        })
    }
       
    render() {
        console.log(this.state);
        
        return (
            <div id="account" className="p-2">
                <div className="container bg-dark text-white" style={{height:'100%'}}>
                
                    {this.state.user ? <h3 className="text-center">Welcome {this.state.user.display_name} </h3> : (
                        <div className="spinner-border text-success" role="status">
                          <span className="sr-only">Loading...</span>
                        </div>)}
                    <p className="lead mt-5">Your Playlists</p>
                    {this.state.playlists ? this.state.playlists.map(playlist =>(
                        <div className="media mt-5 ml-5" key={playlist.id}>
                            <img src={playlist.images[0].url} className="mr-3 img-fluid" alt="playlist image" width='60px' />
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
            </div>
        )
    }
}

export default User;
