const Mongo       = require('mongodb');
const MongoClient = Mongo.MongoClient;
const ObjectID    = Mongo.ObjectID;

var Logger
MongoClient.connect('mongodb://Nicolas:foobar@ds033996.mlab.com:33996/nico-mongodb', (err, database) => {
    if (err) return console.log(err)
    Logger = database.collection('beaverlogs')
})

module.exports = {
    all: function(cb) {
        Logger.find().toArray((err, result) =>{
            if (err) return console.log(err)
            cb(result)
        })
    },
    findOne: function(req, cb) {
        Logger.findOne({_id: ObjectID(req.params.id)}, (err, result) => {
            if (err) return console.log(err);
            cb(result)
        })
    },
    create: function(req, cb) {
        var newlog = {
        	beaverid : ObjectID(req.params.id),
        	location: req.body.location,
        	date: req.body.date
        }	
        return Logger.save(newlog, (err, result) =>{
            if (err) return console.log(err)
            console.log('Logger saved to database')
            cb(result)
        })
    },
    update: function(req, cb) {
        Logger.findOneAndUpdate(
            {_id: ObjectID(req.params.id)},
            {$set:{
				health:req.body.health
			}}
			,
			(err, result) => {
			if (err) return res.send(err)
			cb(result)
			}
        )
    },
    delete: function(req, cb) {
        Logger.findOneAndDelete(
          {_id: ObjectID(req.params.logid)},
          (err, result) => {
            if (err) return res.send(500, err)
              cb(result)
          }
        )
    },
    empty: function() {
        Logger.remove({})
    }
}
