const Mongo       = require('mongodb');
const MongoClient = Mongo.MongoClient;
const ObjectID    = Mongo.ObjectID;

var Relation
MongoClient.connect('mongodb://Nicolas:foobar@ds033996.mlab.com:33996/nico-mongodb', (err, database) => {
    if (err) return console.log(err)
    Relation = database.collection('relations')
})


module.exports = {
    all: function(cb) {
        Relation.find().toArray((err, result) =>{
            if (err) return console.log(err)
            cb(result)
        })
    },
    findOne: function(req, cb) {
        Relation.findOne({_id: ObjectID(req.params.id)}, (err, result) => {
            if (err) return console.log(err);
            cb(result)
        })
    },
    create: function(req, cb) {
        var newrelation = {
                asker : req.params.fromid,
                giver : req.params.toid,
                askername: req.body.askername,
                givername: req.body.givername,
                term : "long",
                status : "on"
            }   
        return Relation.save(newrelation, (err, result) =>{
            if (err) return console.log(err)
            console.log('Relation saved to database')
            cb(result)
        })
    },
    update: function(req, cb) {
        Relation.findOneAndUpdate(
            {_id: ObjectID(req.params.id)},
            {$set:{
                "status":req.body.status
			}}
			,
			(err, result) => {
			if (err) return res.send(err)
			cb(result)
			}
        )
    },
    delete: function(req, cb) {
        Relation.findOneAndDelete(
          {_id: ObjectID(req.params.id)},
          (err, result) => {
            if (err) return res.send(500, err)
              cb(result)
          }
        )
    },
    empty: function() {
        Relation.remove({})
    }
}

