const express = require('express');
const bodyParser= require('body-parser')

const app = express();

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.static('assets'))

//require all routes for beavers
const beavercontrollers = require('./controllers/beavers')
app.use(beavercontrollers)

const relationcontrollers = require('./controllers/relations')
app.use(relationcontrollers)

const beaverlogcontrollers = require('./controllers/beaverlogs')
app.use(beaverlogcontrollers)

app.listen(process.env.PORT || 3000, function() {
	console.log('chilling on 3000');
})


const MongoClient = require('mongodb').MongoClient

//connect to MongoDB
// MongoClient.connect('mongodb://Nicolas:foobar@ds033996.mlab.com:33996/nico-mongodb', (err, database) => {
// 	if (err) return console.log(err)
//   	db = database

// })

// //Homepage
// app.get('/', (req,res) => {
// 	db.collection('beavers').find().toArray((err, result) =>{
// 	if (err) return console.log(err)
// 	res.render('index.ejs', {beavers: result})	
// 	})
// })

// //Direct to create page
// app.get('/create', (req, res) => {
// 	console.log('rendering create form')
// 	res.render('create.ejs')
// })

// //Direct to relationship form
// app.get('/relationinfo', (req, res) => {
// 	db.collection('relationships').find().toArray((err, result) =>{
// 		if (err) return console.log(err)
// 		res.render('relationships.ejs', {relations: result})	
// 	})
// })


// //Direct to details form from button on homepage
// app.get('/views/:id', (req, res) => {
// 	var id = require('mongodb').ObjectID(req.params.id);
// 	db.collection('beavers').findOne({_id: id}, (err, result) => {
// 		if (err) return console.log(err);
// 		res.render('details.ejs', {beaverinfo: result});
// 		console.log(result.logger)
// 	})
// })


// //Direct to edit relationship form from edit button on details page
// app.get('/views/editrelation/:id', (req, res) => {
// 	var id = require('mongodb').ObjectID(req.params.id);
// 	db.collection('relationships').findOne({_id: id}, (err, result) => {
// 		if (err) return console.log(err);
// 		res.render('editlove.ejs', {loveInfo: result});
// 	})
// })

// //Direct to New Love form
// app.get('/newLove', (req, res) => {
// 	db.collection('beavers').find().toArray((err, result) =>{
// 		if (err) return console.log(err)
// 		res.render('loveform.ejs', {beavers: result})	
// 	})	
// })

// //Direct to log beaver location form
// app.get('/views/log/:id' , (req, res) =>{
// 	console.log('redirecting to logging form')
// 	var id = require('mongodb').ObjectID(req.params.id);
// 	db.collection('beavers').findOne({_id: id}, (err, result) => {
// 		if (err) return console.log(err);
// 		res.render('logbeaver.ejs', {Beaverinfo: result});
// 	})

// })

// //direct to show logger page
// app.get('/views/showlog/:name', (req, res) => {
// 	var name = req.params.name;
// 	console.log(name)
// 	db.collection('beaverlog').findOne({beavername: name}, (err, result) => {
// 		if (err) return console.log(err);
// 		console.log(result)
// 		res.render('displaylog.ejs', {logger: result.logger});
// 	})
// }) 


// //Create beaver in database
// app.post('/create', (req, res) => {
// 	console.log('Saving beaver to database...')
// 	var name = req.body.name;
// 	var location = req.body.location;
// 	var time = req.body.birthDate;
// 	db.collection('beavers').save(req.body, (err, result) =>{
// 		if (err) return console.log(err);
// 		console.log('Beaver saved to database');
// 		id = require('mongodb').ObjectID(result._id);
// 	})
// 	var object = {
// 		"beavername" : name,
// 		"logger": [{"date":time,"location":location}]
// 	}
// 	db.collection('beaverlog').save(object, (err, result) =>{
// 		if (err) return console.log(err);
// 		console.log('Location Logged')
// 		res.redirect('/')
// 	})
// })



// //Create relationship in database
// app.post('/newLove', (req, res) => {
// 	object = {"male": req.body.male,
// 		"female": req.body.female,
// 		"term": req.body.term,
// 		"status": "on"
// 		}

// 	console.log('Saving new love to database...')
// 	db.collection('relationships').save(object, (err, result) =>{
// 		if (err) return console.log(err)
// 		console.log('New love saved to database')
// 		res.redirect('/relationinfo')
// 	});
// });


// //Save changes to love
// app.post('/savelovechanges/:id', (req, res) => {
// 	console.log('Saving Changes to love');
// 	var id = require('mongodb').ObjectID(req.params.id);
// 	db.collection('relationships').findOneAndUpdate(
// 		{_id: id},
// 		{$set:{
// 			status: req.body.status
// 		}}
// 		,
// 		(err, result) => {
// 			if (err) return res.send(err)
// 			res.redirect('/relationinfo')
// 		}
// 	)
// })

// //Log location in database
// app.post('/log/:name' , (req, res) =>{
// 	console.log('Looging Beaver')
// 	var name = req.params.name
// 	db.collection('beaverlog').findOneAndUpdate(
// 		{beavername: name},
// 		{$push:{
// 			logger:{"location": req.body.location, "date":req.body.date}
// 		}}
// 		,
// 		(err, result) => {
// 			if (err) return res.send(err)
// 		}
// 	)
// 	db.collection('beavers').findOneAndUpdate(
// 		{name: name},
// 		{$set:{
// 			"health":req.body.health
// 		}}
// 		,
// 		(err, result) => {
// 			if (err) return res.send(err)
// 			res.redirect('/')
// 		}
// 	)
// })


// //Deleting beaver
// app.get('/views/delete/:id', (req, res) => {
// 	var id = require('mongodb').ObjectID(req.params.id);
// 	db.collection('beavers').findOneAndDelete(
//       {_id: id},
//       (err, result) => {
//         if (err) return res.send(500, err)
//           res.redirect('/')
//       }
//     )
// })

// app.post('/emptybeavers', (req, res) => {
// 	db.collection('beavers').remove( { } )
// 	console.log('beavers killed')
// 	res.redirect('/')
// })

// app.post('/emptyrelationships', (req, res) => {
// 	db.collection('relationships').remove( { } )
// 	console.log('relationships ended')
// 	res.redirect('/')
// })