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
router.post("/store/:id/product", (req, res) => {
    try{
        Store.findById(req.params.id, (error, foundStore)=>{
            foundStore.productList.push(req.body)
            foundStore.save(async (err)=> {
                err ? console.log(err) : res.json(foundStore.productList)
            })
        })
    } catch (error) {
        // send error
        res.status(400).json(error);
    }
})

// product Delete Route
<<<<<<< Updated upstream
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
=======
router.delete("/store/:storeId/product/:prodId", (req, res) => {
  try {
    Store.findById(req.params.storeId, async (error, foundStore) => {
      await foundStore.productList.id(req.params.prodId).remove()
      foundStore.save(async (err) => {
        err ? console.log(err) : res.json(foundStore.productList)
      });
    });
  } catch (error) {
    // send error
    res.status(400).json(error);
  }
});
>>>>>>> Stashed changes


// product Update Route
router.put("/store/:storeId/product/:prodId", (req, res) => {
    try {
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