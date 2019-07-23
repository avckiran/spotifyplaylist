import React from 'react';
// import axios from 'axios';

const Signin = () => {
    return (
            <div id="signin-box" className="d-flex flex-column space-between mx-auto text-center my-auto bg-dark text-white border-dark p-5">
                <div className="mt-3">
                    <img id='logo' src="/assets/logo.png" className="img-fluid" alt=""/>
                    <br/>
                    <h4 className="d-inline">Spotify Playlist Manager</h4>
                </div>
                <div className="mt-3">
                    <p className="lead">Please login to your spotify account to manage your playlists!</p>
                </div>
                <div className="my-3">
                    <a href="http://localhost:5000/api/login" className="btn btn-lg btn-outline-success">Login to Spotify</a>
                    {/* <a href="http://localhost:5000/api/login" className="btn btn-lg btn-outline-danger">Login</a> */}
                    <br/>
                    <small className="text-muted">You may redirect to Spotify for the login process</small>
                </div>
            </div>
    )
}

export default Signin
