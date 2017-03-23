const express = require('express');
const router = express.Router();
const Beaver = require("../models/beaver")
const Relation = require("../models/relation")
const Mongo = require('mongodb');
const ObjectID = Mongo.ObjectID;

router.get('/', (req, res) => {
    Beaver.all(function(result) {
        res.render('index.ejs', {
            beavers: result
        })
    })
})

router.get('/about', (req, res) => {
    res.render('about.ejs')
})

router.get('/beavers/show/:id', (req, res) => {
    Beaver.findOne(req, function(result) {
        res.render('beaverdetails.ejs', {
            beaverinfo: result
        });
    })
})

router.get('/beavers/new', (req, res) => {
    console.log('rendering create form')
    res.render('createbeaver.ejs')
})

router.get('/beavers/:id/relationshiprequest/:sex', (req, res) => {
    console.log('rendering relationship request form')
    Beaver.all(function(result) {
        Beaver.findOne(req, function(result2) {
            var newpending = []
            for (var i = 0; i < result2.pendingout.length; i++) {
                newpending.push((result2.pendingout[i]).toString())
            }
            console.log(newpending)
            if (req.params.sex == "male") {
                res.render('requestrelation.ejs', {
                    beavers: result,
                    beaverinfo: result2,
                    gender: "female",
                    array: newpending
                })
            } else {
                res.render('requestrelation.ejs', {
                    beavers: result,
                    beaverinfo: result2,
                    gender: "male",
                    array: newpending
                })
            }
        })
    })
})

router.get('/beavers/:id/requests/in', (req, res) => {
    console.log('showing incoming requests')
    Beaver.all(function(result) {
        Beaver.findOne(req, function(result2) {
            res.render('incomingrequests.ejs', {
                beavers: result,
                beaverinfo: result2
            })
        })
    })
})

router.post('/beavers/:toid/acceptrequest/:fromid', (req, res) => {
    console.log("askername: " + req.body.askername)
    console.log("givername: " + req.body.givername)

    console.log('accepting request');
    Relation.create(req, function(a) {
        Beaver.clearrequestout(req, function(b) {
            Beaver.clearrequestin(req, function(c) {
                res.redirect('/beavers/show/' + req.params.toid)
            })
        })
    })
})

router.post('/beavers/:fromid/removerequest/:toid', (req, res) => {
    console.log('removing request');
    Beaver.clearrequestout(req, function() {
        Beaver.clearrequestin(req, function() {
            res.redirect('/beavers/show/' + req.params.fromid)
        })
    })
})

router.get('/beavers/:id/requests/out', (req, res) => {
    console.log('showing outgoing requests')
    Beaver.all(function(result) {
        Beaver.findOne(req, function(result2) {
            res.render('outgoingrequests.ejs', {
                beavers: result,
                beaverinfo: result2
            })

        })
    })
})


router.post('/beavers/:id/requestrelationto/:toid', (req, res) => {
    console.log('Sending request')
    Beaver.requestout(req, function() {
        Beaver.requestin(req, function() {
            res.redirect('/beavers/show/' + req.params.id)
        })
    })
})

router.post('/beavers/create', (req, res) => {
    console.log('Saving beaver to db')
    Beaver.create(req, function() {
        res.redirect('/')
    })
})



// router.get('/beavers/edit/:id', (req, res) => {
//     Beaver.finOne(req, function(result) {
//         res.render('edit.ejs', {beaver: result});
//     })
// })

router.post('/beavers/update/:id', (req, res) => {
    console.log('Saving Changes');
    Beaver.update(req, function() {
        res.redirect('/')
    })
})

router.post('/beavers/delete/:id', (req, res) => {
    Beaver.delete(req, function() {
        res.redirect('/')
    })
})

router.post('/beavers/emptydb', (req, res) => {
    Beaver.empty(req, function() {
        res.redirect('/')
    })
})

module.exports = router