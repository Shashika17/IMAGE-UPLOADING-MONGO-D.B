const express = require('express');
const mongoose = require('mongoose');
const driverrouters =require('./routers/drivers');
const url = 'mongodb+srv://shashigakavinda:Oo9XcQbg6oDEiBAU@cluster0.jukvicp.mongodb.net/?retryWrites=true&w=majority';
const app = express();


// Use mongoose.connection to get the connection object
mongoose.connect(url);
const con = mongoose.connection; 
//-----------------------------------------------------
//Check connection
con.on('open', () => {
  console.log('Connected to MongoDB');
});
//-----------------------------------------------------
//Define data passing structure and use routs for requests
app.use(express.json())
app.use('/drivers',driverrouters)
//-----------------------------------------------------
//define port for run
app.listen(3000,() => {
  console.log('server started')
})
//-----------------------------------------------------

