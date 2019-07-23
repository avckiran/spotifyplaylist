import axios from 'axios';

//Initialize access token and headers object

const token = window.localStorage.getItem('access_token');
const headers = {
    "Authorization": "Bearer "+token 
}

export const loadUser = async(token) => {
    try{
        const res = await axios.get('https://api.spotify.com/v1/me', {
            headers
        })
        return (res.data);
    }catch(err){
        console.log(err);
    }
}

export const loadPlaylists = async(token) =>{
    try{
        const res = await axios.get('https://api.spotify.com/v1/me/playlists', {headers});
        return (res.data.items);
    }catch(err){
        console.log(err);
    }
}

export const getPlaylist = async(playlist_id) =>{
    try{
            const res = await axios.get(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks`, {headers})
            return (res.data.items);
        }catch(err){
        console.log(err);
    }
}

export const removeTrack = async(track_id, playlist_id) =>{
    try{
        const tracks = [{'uri':`spotify:track:${track_id}`}]
        const config={
            headers:{
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            data:{ tracks }
        }
        const res = await axios.delete(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks`, config)
        return (res.data);
    }catch(err){
        console.log(err);
    }
}