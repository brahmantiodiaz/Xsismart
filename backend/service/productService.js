const Mongoclient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectID
const Model = require('../model/productModel')

let dbo

module.exports = exports = function (server, config) {
    server.get('/api/product', (req, res) => {
        Mongoclient.connect(config.dbconn, async function (err, db) {
            if (err) {
                var error = new Error(err.message)
                return error
            }
            dbo = db.db(config.dbname)
            await dbo.collection('product').aggregate([
                {
                    $lookup: {
                        from: "variant",
                        localField: "variant_id",
                        foreignField: "_id",
                        as: "variant"
                    }
                }, { $unwind: { path: "$variant" } },
                {
                    $lookup: {
                        from: "category",
                        localField: "variant.category_id",
                        foreignField: "_id",
                        as: "category"
                    }
                }, { $unwind: { path: "$category" } },
                { $match: { "active": true } },
                {
                    $project: {
                        "name": 1,
                        "price": 1,
                        "stock": 1,
                        "description": 1,
                        "variant_name": "$variant.name",
                        "category_name": "$category.name",
                        "active": true,
                        "category_id": "$category._id",
                        "variant_id": 1,

                    }
                }
            ])
                .toArray(function (error, response) {
                    if (err) {
                        res.send(400, {
                            success: false,
                            result: error
                        })
                    }
                    res.send(200, {
                        success: true,
                        result: response
                    })
                    db.close()
                })
        })
    })

    server.get('/api/productJumlah', (req, res) => {
        Mongoclient.connect(config.dbconn, async function (err, db) {
            if (err) {
                var error = new Error(err.message)
                return error
            }
            dbo = db.db(config.dbname)
            await dbo.collection('product').aggregate([
                {
                    $group :{
                        "_id":null,
                        "count":{$sum:1}
                    }
                }
            ])
                .toArray(function (error, response) {
                    if (err) {
                        res.send(400, {
                            success: false,
                            result: error
                        })
                    }
                    res.send(200, {
                        success: true,
                        result: response
                    })
                    db.close()
                })
        })
    })


    server.post('/api/productfilter', (req, res) => {
        const{search, order, page, pagesize} = req.body
        const limit = parseInt(pagesize)
        const skip = parseInt(page-1)*pagesize
        const search_regex= new RegExp(search, 'i')
        const sort = order != ""? {name:parseInt(order)} : {_id:1}
        Mongoclient.connect(config.dbconn, async function (err, db) {
            if (err) {
                var error = new Error(err.message)
                return error
            }
            dbo = db.db(config.dbname)
            await dbo.collection('product').aggregate([
                {
                    $lookup: {
                        from: "variant",
                        localField: "variant_id",
                        foreignField: "_id",
                        as: "variant"
                    }
                }, { $unwind: { path: "$variant" } },
                {
                    $lookup: {
                        from: "category",
                        localField: "variant.category_id",
                        foreignField: "_id",
                        as: "category"
                    }
                }, { $unwind: { path: "$category" } },
                {
                    $project: {
                        "name": 1,
                        "price": 1,
                        "stock": 1,
                        "description": 1,
                        "variant_name": "$variant.name",
                        "category_name": "$category.name",
                        "active": 1,
                        "category_id": "$category._id",
                        "variant_id": 1,

                    }
                },
                { $match: { "active": true, "name": search_regex } },
                {$skip: skip},
                 {$limit : limit},
                 {$sort : sort}
            ])
                .toArray(function (error, response) {
                    if (err) {
                        res.send(400, {
                            success: false,
                            result: error
                        })
                    }
                    res.send(200, {
                        success: true,
                        result: response
                    })
                    db.close()
                })
        })
    })


    server.post('/api/product', (req, res, next) => {
        var entity = req.body
        Mongoclient.connect(config.dbconn, async function (err, db) {
            if (err) {
                var error = new Error(err.message)
                return next(error)
            }
            dbo = db.db(config.dbname)
            let model = {}
            model.name = entity.name
            model.price = parseInt(entity.price)
            model.stock = parseInt(entity.stock)
            model.description = entity.description            
            model.variant_id = ObjectId(entity.variant_id)
            model.image = entity.image
            model.active = entity.active
            model.create_by = "system"
            model.create_at = new Date()
            model.update_by = ""
            model.update_at = new Date()
            await dbo.collection('product').insertOne(model, function (error, response) {
                if (err) {
                    res.send(400, {
                        success: false,
                        result: error
                    })
                }
                res.send(200, {
                    success: true,
                    result: response
                })
                db.close()
            })
        })
    })
    ///API PUT KATEGORI
    server.put('/api/product', (req, res, next) => {
        var entity = req.body
        var id = req.body._id
        Mongoclient.connect(config.dbconn, async function (err, db) {
            if (err) {
                var error = new Error(err.message)
                return next(error)
            }
            dbo = db.db(config.dbname)
            let model = {}
            model.name = entity.name
            model.price = parseInt(entity.price)
            model.stock = parseInt(entity.stock)
            model.description = entity.description            
            model.variant_id = ObjectId(entity.variant_id)
            model.image = entity.image
            model.active = entity.active
            model.create_by = "system"
            model.update_by = ""
            model.update_at = new Date()
            await dbo.collection('product').updateOne({ '_id': ObjectId(id) }, { $set: model },
                function (error, response) {
                    if (err) {
                        res.send(400, {
                            success: false,
                            result: error
                        })
                    }
                    res.send(200, {
                        success: true,
                        result: response
                    })
                    db.close()
                })
        })
    })
    //get by id
    server.get('/api/product/:_id', (req,res,next)=>{
        var {_id} = req.params
        Mongoclient.connect(config.dbconn,async function(err, db){
            if (err) {
                var error = new Error(err.message)
                return next(error)
            }
            dbo = db.db(config.dbname)
            await dbo.collection('product').aggregate([
                {
                    $lookup: {
                        from: "variant",
                        localField: "variant_id",
                        foreignField: "_id",
                        as: "variant"
                    }
                }, { $unwind: { path: "$variant" } },
                {
                    $lookup: {
                        from: "category",
                        localField: "variant.category_id",
                        foreignField: "_id",
                        as: "category"
                    }
                }, { $unwind: { path: "$category" } },
                { $match: { "active": true } },
                {
                    $project: {
                        "name": 1,
                        "price": 1,
                        "stock": 1,
                        "description": 1,
                        "variant_name": "$variant.name",
                        "category_name": "$category.name",
                        "active": true,
                        "category_id": "$category._id",
                        "variant_id": 1,

                    }
                },
                {$match : {"_id" : ObjectId(_id)}}
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
    //delete
    server.del('/api/product/:_id', (req, res, next) => {
        var id = req.params._id
        Mongoclient.connect(config.dbconn, async function (err, db) {
            if (err) {
                var error = new Error(err.message)
                return next(error)
            }
            dbo = db.db(config.dbname)
            await dbo.collection('product').deleteOne({ '_id': ObjectId(id) },
                function (error, response) {
                    if (err) {
                        res.send(400, {
                            success: false,
                            result: error
                        })
                    }
                    res.send(200, {
                        success: true,
                        result: response
                    })
                    db.close()
                })
        })
    })

}

function setData(entity) {
    Model.name = entity.name
    Model.price = entity.price
    Model.stock = entity.stock
    Model.description = entity.description
    Model.variant_id = ObjectId(entity.variant_id)
    Model.active = entity.active
    Model.image = entity.image
    Model.create_by = entity.create_by
    return Model
}