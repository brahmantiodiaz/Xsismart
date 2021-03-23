const Mongoclient = require('mongodb').MongoClient
const ObjectId = require ('mongodb').ObjectID
const Model = require('../model/variantModel')

let dbo

module.exports = exports = function(server, config){
    server.get('/api/variant', (req,res) => {
        Mongoclient.connect(config.dbconn, async function(err, db){
            if(err){
                var error = new Error(err.message)
                return error
            }
            dbo = db.db(config.dbname)
            await dbo.collection('variant').aggregate([
                {$lookup : {from:"category",
                                  localField : "category_id",
                                  foreignField : "_id",
                                  as: "category"
                    }},{$unwind:{path:"$category"}},
                    {$project : {
                            "name" : 1,
                            "description" : 1,
                            "category_id" :1,
                            "category_name" :"$category.name" ,
                            "active" : 1,
                        }},{$match : {"active":true}},{$sort:{category_name:1}}
                ])
            .toArray(function(error, response){
                if(err){
                    res.send(400,{
                        success : false,
                        result : error
                    })
                }
                res.send(200, {
                    success : true,
                    result: response
                })
                db.close()
                })
        })
    })
//get where category Id
server.get('/api/variantcategory/:_id', (req,res,next)=>{
    var {_id} = req.params
    Mongoclient.connect(config.dbconn,async function(err, db){
        if (err) {
            var error = new Error(err.message)
            return next(error)
        }
        dbo = db.db(config.dbname)
        await dbo.collection('variant').find({"category_id":ObjectId(_id)}).toArray(function(error, response){
            if(err){
                res.send(400,{
                    success : false,
                    result : error
                })
            }
            res.send(200, {
                success : true,
                result: response
            })
            db.close()
        })
    })
})


//get byid
server.get('/api/variant/:_id', (req,res,next)=>{
    var {_id} = req.params
    Mongoclient.connect(config.dbconn,async function(err, db){
        if (err) {
            var error = new Error(err.message)
            return next(error)
        }
        dbo = db.db(config.dbname)
        await dbo.collection('variant').find({"_id":ObjectId(_id)}).toArray(function(error, response){
            if(err){
                res.send(400,{
                    success : false,
                    result : error
                })
            }
            res.send(200, {
                success : true,
                result: response
            })
            db.close()
        })
    })
})

///API POST variant
server.post('/api/variant', (req,res,next)=>{
    var entity = req.body
    Mongoclient.connect(config.dbconn,async function(err, db){
        if (err) {
            var error = new Error(err.message)
            return next(error)
        }
        dbo = db.db(config.dbname)
        let model = {}
        model.name = entity.name
        model.description = entity.description
        model.category_id = ObjectId(entity.category_id)
        model.active = entity.active
        model.create_by = "system"
        model.create_at = new Date()
        model.update_by = ""
        model.update_at = new Date()
        await dbo.collection('variant').insertOne(model,function(error, response){
            if(err){
                res.send(400,{
                    success : false,
                    result : error
                })
            }
            res.send(200, {
                success : true,
                result: response
            })
            db.close()
        })
    })
})	
///API PUT KATEGORI
server.put('/api/variant', (req,res,next)=>{
    var entity = req.body
    var id = req.body._id
    Mongoclient.connect(config.dbconn,async function(err, db){
        if (err) {
            var error = new Error(err.message)
            return next(error)
        }
        dbo = db.db(config.dbname)
        let model = {}
        model.name = entity.name
        model.description = entity.description
        model.category_id = ObjectId(entity.category_id)
        model.active = entity.active
        await dbo.collection('variant').update({'_id':ObjectId(id)},{$set : model},
            function(error, response){
            if(err){
                res.send(400,{
                    success : false,
                    result : error
                })
            }
            res.send(200, {
                success : true,
                result: response
            })
            db.close()
        })
    })
})	
//delete
server.del('/api/variant/:_id', (req,res,next)=>{
    var id = req.params._id
    Mongoclient.connect(config.dbconn,async function(err, db){
        if (err) {
            var error = new Error(err.message)
            return next(error)
        }
        dbo = db.db(config.dbname)
        await dbo.collection('variant').deleteOne({'_id':ObjectId(id)},
            function(error, response){
            if(err){
                res.send(400,{
                    success : false,
                    result : error
                })
            }
            res.send(200, {
                success : true,
                result: response
            })
            db.close()
        })
    })
})

}

function setData(entity){
    Model.name = entity.name
    Model.description = entity.description
    Model.category_id = ObjectId(entity.category_id)
    Model.active = entity.active
    Model.create_by = entity.create_by
    return Model
}