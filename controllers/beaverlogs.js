const express  = require('express');
const router   = express.Router();
const Beaver   = require("../models/beaver")
const Logger = require("../models/beaverlog")

router.get('/beavers/:id/log', (req, res) => {
    console.log('Displaying log form')
     Beaver.findOne(req, function(result) {
        res.render('logform.ejs', {beaverinfo: result});
    })
})

router.post('/beavers/:id/newlog', (req, res) => {
    console.log('saving log')
    Logger.create(req, function(){
    	Beaver.update(req, function(){
    		res.redirect('/beavers/show/'+req.params.id)
    	}) 
    })
})

router.get('/beavers/:id/showlog', (req, res) => {
    console.log('Displaying this beavers log')
     Logger.all(function(result) {
        res.render('beaverlog.ejs', {logger: result, beaver_id: req.params.id});
    })
})

router.post('/beavers/:id/log/:logid', (req, res) => {
    Logger.delete(req, function(){
        res.redirect('/beavers/'+req.params.id+'/showlog')
    })
})

module.exports = router