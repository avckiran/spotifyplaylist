//libraries
const express = require('express');
const request = require('request');
const querystring = require('querystring');
//internal files/modules
const config = require('./config/config');

//Initialization
const app = express();
const client_id = config.spotify_client_id;
const client_secret = config.spotify_client_secret;
const redirect_uri = 'http://localhost:5000/account';


//Landing Route
app.get('/', (req,res) => {
    res.send("API is running!")
});

//Login to Spotify
app.get('/api/login', (req,res)=>{
    res.redirect('https://accounts.spotify.com/authorize?'+
    querystring.stringify({
        response_type: 'code',
        client_id,
        scope: 'user-read-private user-read-email playlist-modify playlist-modify-private',
        redirect_uri
    }))
});

app.get('/account', (req,res)=>{
    let code = req.query.code || null;

    let authOptions = {
        url:'https://accounts.spotify.com/api/token',
        form:{
            code,
            redirect_uri,
            grant_type: 'authorization_code'
        },
        headers:{
            'Authorization':'Basic '+(new Buffer(client_id+':'+client_secret).toString('base64'))
        },
        json: true
    }

    request.post(authOptions, (err, response, body)=>{
        if(!err){
            const access_token = body.access_token;
            const redirect_uri = 'http://localhost:3000/me'
            // console.log(access_token);
            res.redirect(redirect_uri+'/'+access_token);
            // res.json({access_token})
        }
    })

})

//Unhandled Routes
app.get('*', (req,res) =>{
    res.json({
        'status': '404',
        'msg':'Not Found'
    })
})



//Configuring PORT and the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>{
    console.log(`Server started on ${PORT}`);
})