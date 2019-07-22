const express = require('express');
const app = express();


//Landing Route
app.get('/', (req,res) => {
    res.send("API is running!")
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