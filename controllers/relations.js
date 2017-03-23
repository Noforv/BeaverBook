const express  = require('express');
const router   = express.Router();
const Relation   = require("../models/relation")
const Beaver = require("../models/beaver")


router.get('/relations', (req,res) => {
    Relation.all(function(result){
            res.render('relationships.ejs', {relations: result})
        }
    )
})

// router.get('/relations/show/:id', (req, res) => {
//     Relation.findOne(req, function(result) {
//         res.render('loveform.ejs', {relationinfo: result});
//     })
// })

router.get('/relations/new', (req, res) => {
    console.log('rendering create relation form')
    Beaver.all(function(result){
        res.render('createrelation.ejs', {beavers: result}
    )})
})

router.post('/relations/create', (req, res) => {
    console.log('Saving relation to db')
    Relation.create(req, function(){
        res.redirect('/relations')
    })
})

router.get('/relations/edit/:id', (req, res) => {
    Relation.findOne(req, function(result) {
        res.render('editrelation.ejs', {relation: result});
    })
})

router.post('/relations/update/:id', (req, res) => {
    console.log('Saving Changes');
    Relation.update(req, function(){
        res.redirect('/relations')
    })
})

router.post('/relations/delete/:id', (req, res) => {
    Relation.delete(req, function(){
        res.redirect('/relations')
    })
})

router.post('/relations/emptydb', (req, res) => {
    Relation.empty(req, function(){
        res.redirect('/relations')
    })
})

module.exports = router