const Mongoclient = require('mongodb').MongoClient
const ObjectId = require ('mongodb').ObjectID
const Model = require('../model/categoryModel')

let dbo

module.exports = exports = function(server, config){
    server.get('/api/category', (req,res) => {
        Mongoclient.connect(config.dbconn, async function(err, db){
            if(err){
                var error = new Error(err.message)
                return error
            }
            dbo = db.db(config.dbname)
            await dbo.collection('category').find({'active':true}).toArray(function(error, response){
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
    server.get('/api/categoryById/:_id', (req,res,next)=>{
        var {_id} = req.params
        Mongoclient.connect(config.dbconn,async function(err, db){
            if (err) {
                var error = new Error(err.message)
                return next(error)
            }
            dbo = db.db(config.dbname)
            await dbo.collection('category').find({"_id":ObjectId(_id)}).toArray(function(error, response){
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
///API POST KATEGORI
server.post('/api/category', (req,res,next)=>{
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
        model.active = entity.active
        model.create_by = "system"
        model.create_at = new Date()
        model.update_by = ""
        model.update_at = new Date()

        await dbo.collection('category').insertOne(model,function(error, response){
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
server.put('/api/category', (req,res,next)=>{
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
        model.active = entity.active
        model.create_by = entity.create_by
        await dbo.collection('category').update({'_id':ObjectId(id)},{$set : model},
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
server.del('/api/category/:_id', (req,res,next)=>{
    var id = req.params._id
    Mongoclient.connect(config.dbconn,async function(err, db){
        if (err) {
            var error = new Error(err.message)
            return next(error)
        }
        dbo = db.db(config.dbname)
        await dbo.collection('category').deleteOne({'_id':ObjectId(id)},
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
    Model.active = entity.active
    Model.create_by = entity.create_by
    return Model
}