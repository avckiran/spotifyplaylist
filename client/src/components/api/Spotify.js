import axios from 'axios';

export const loadUser = async(token) => {
    try{
        const res = await axios.get('https://api.spotify.com/v1/me', {
            headers:{
                "Authorization": "Bearer "+ token
            }
        })
        return (res.data);
    }catch(err){
        console.log(err);
    }
}

export const loadPlaylists = async(token) =>{
    try{
        const res = await axios.get('https://api.spotify.com/v1/me/playlists', {
            headers:{
                'Authorization': 'Bearer '+token
            }
        })
        return (res.data.items);
    }catch(err){
        console.log(err);
    }
}