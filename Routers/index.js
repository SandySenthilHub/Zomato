const express = require('express');
const routes = express.Router();
const UserModel = require('../Models/users')


// Import all required controlling functions
const restuarantsController = require('../Controllers/RestaurantsControllers');
const locationsController = require('../Controllers/location');
const mealtypeController = require('../Controllers/mealtypes');
const menuItemsController = require('../Controllers/MenuItemsControllers');
const userController = require('../Controllers/userController');
const paymentController = require('../Controllers/Payment');


routes.get('/',(req,res)=>res.send("Backend Works !!"));
routes.get('/locations',locationsController.getLocations);
routes.get('/mealtypes',mealtypeController.getMealtypes);
routes.post('/filter', restuarantsController.filter);
routes.get("/restaurants", restuarantsController.getAllRestuarant);
routes.get('/locations/:id', restuarantsController.getRestaurantByLocation);
routes.get('/restaurants/:id', restuarantsController.getRestaurantById);
routes.get('/getmenu/:id', menuItemsController.getMenuItemsByRestaurant);
routes.post('/signup', userController.signUp);
// routes.post('/login', userController.logIn);
routes.post('/payment', paymentController.handlePayment);


// app.get('/dashboard',varifyUser ,(req, res) => {
//     res.json("Success")
// })


routes.post('/register', (req, res) => {
   
    UserModel.create(req.body)
    .then(user => res.json(user))
    .catch(err => res.json(err))

})

routes.post('/login', (req, res) => {
    const {email, password} = req.body;
    UserModel.findOne({email: email})
    .then(user => {
        if(user) {
                if(user.password === password){
                res.json('Success')
            }
                else {
                     res.json("The password is incorrect")
                }
            
        } else {
             res.json("No record existed")
        }
    })
})



module.exports = routes; 
