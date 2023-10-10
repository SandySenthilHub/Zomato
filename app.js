const express = require('express');
const mongoose = require('mongoose');
// const cors = require('cors');

//import router
const routes = require('./Routers/index');




const host = "localhost";
const port = 9876;

// MogngoDB connecting string
// const uri = "mongodb+srv://sandysenthil9234:Sandy12@cluster0.lq4yjjb.mongodb.net/DB?retryWrites=true&w=majority";
const app = express();
// app.use(cors());

const uri = "mongodb+srv://sandysenthil9234:Sandy12@cluster0.lq4yjjb.mongodb.net/DB?retryWrites=true&w=majority";

// Middleware to handle json date
app.use(express.json());





app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
  });



// Handling CORS
app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-type', 'Authorization');
    next();
})


// Navigate all req to router
app.use('/',routes);


// Connect to Database and starting server
mongoose.connect(uri,{useNewUrlParser: true, useUnifiedTopology: true}).
    then(() => {
        app.listen(process.env.PORT || 9876,host,() => {
            console.log(`Server running at ${host}:${port}`);
        });
    }).
    catch((err) => {
        console.log(err);
    }
)


