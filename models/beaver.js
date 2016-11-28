const Mongo       = require('mongodb');
const MongoClient = Mongo.MongoClient;
const ObjectID    = Mongo.ObjectID;

var Beaver
MongoClient.connect('mongodb://Nicolas:foobar@ds033996.mlab.com:33996/nico-mongodb', (err, database) => {
    if (err) return console.log(err)
    Beaver = database.collection('beavers')
})


module.exports = {
    all: function(cb) {
        Beaver.find().toArray((err, result) =>{
            if (err) return console.log(err)
            cb(result)
        })
    },
    findOne: function(req, cb) {
        Beaver.findOne({_id: ObjectID(req.params.id)}, (err, result) => {
            if (err) return console.log(err);
            cb(result)
        })
    },
    create: function(req, cb) {
        var newbeaver = {
            name: req.body.name,
            sex: req.body.sex,
            date: req.body.date,
            location: req.body.location,
            health: req.body.health,
            image: req.body.image,
            pendingout: [],
            pendingin: []
        }
        return Beaver.save(newbeaver, (err, result) =>{
            if (err) return console.log(err)
            console.log('Beaver saved to database')
            cb(result)
        })
    },
    update: function(req, cb) {
        Beaver.findOneAndUpdate(
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
        Beaver.findOneAndDelete(
          {_id: ObjectID(req.params.id)},
          (err, result) => {
            if (err) return res.send(500, err)
              cb(result)
          }
        )
    },
    empty: function() {
        Beaver.remove({})
    },
    requestout: function(req, cb) {
        Beaver.findOneAndUpdate(
            {_id: ObjectID(req.params.id)},
            {$push:{
                pendingout: ObjectID(req.params.toid)
            }}
            ,
            (err, result) => {
                if (err) return res.send(err)
                cb(result)
            }
        )
    },
    requestin: function(req, cb) {
        Beaver.findOneAndUpdate(
            {_id: ObjectID(req.params.toid)},
            {$push:{
                pendingin: ObjectID(req.params.id)
            }}
            ,
            (err, result) => {
                if (err) return res.send(err)
                cb(result)
            }
        )   
    },
    clearrequestout: function(req, cb) {
       var fromid = ObjectID(req.params.fromid);
       var toid = ObjectID(req.params.toid);
        Beaver.findOneAndUpdate(
            {_id:fromid},
            {$pull:{
                pendingout:toid
            }
            },
            (err, result) => {
                if (err) return cb(err)
                cb(result)
            }
        )
    },
    clearrequestin: function(req, cb) {
        var fromid = ObjectID(req.params.fromid);
        var toid = ObjectID(req.params.toid);
        console.log(fromid)
        Beaver.findOneAndUpdate(
            {_id:toid},
            {$pull:
                {pendingin:fromid
                    }   
            }
            ,
            (err, result) => {
                if (err) return cb(err)
                cb(result)
            }
        )
    }
}
