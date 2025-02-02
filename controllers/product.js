// DEPENDENCIES
const express = require('express');
const router = express.Router()
const Store = require('../models/store.js');

// product Index Route
router.get("/store/:id/product", async (req, res) => {
    try{
        // this returns all products. I'm not sure why I had to use two lines of code, but it works.
        let foundStore = await Store.findById(req.params.id)
        res.json(foundStore.productList);
    } catch (error) {
        //send error
        res.status(400).json(error);
    }
})

// product Create Route
router.post("/store/:id/product", async (req, res) => {
    try{
        // this creates, and postman will return the store object with the prodcutsList, 
        // but your new product will NOT be displayed for some reason. 
        res.json(await Store.findByIdAndUpdate(
            req.params.id, 
            // thanks to Bryce in the engineering channel and this stackoverflow doc to find this!
            // https://stackoverflow.com/questions/33049707/push-items-into-mongo-array-via-mongoose
            {$push: {productList: req.body}}
            ));
    } catch (error) {
        // send error
        res.status(400).json(error);
    }
})

// product Delete Route
router.delete("/store/:storeId/product/:prodId", (req,res)=> {
    try{
        // This deletes, but running on postman will NOT post what you just deleted for some reason...
        // I removed async/await, so this route can work. 
        Store.findById(req.params.storeId, (error, foundStore) =>{
            res.json(foundStore.productList.id(req.params.prodId).remove());
            foundStore.save()
        })
    } catch (error) {
        // send error
        res.status(400).json(error)
    }
})

// product Update Route
router.put("/store/:storeId/product/:prodId", (req, res) => {
    try {
      // THIS is still a WIP. not complete! 
      Store.findById(req.params.storeId, (error, foundStore) =>{
        res.json(foundStore.productList.id(req.params.prodId).overwrite(req.body));
        foundStore.save()
    })
    } catch (error) {
      // send error
      res.status(400).json(error);
    }
  });





module.exports = router