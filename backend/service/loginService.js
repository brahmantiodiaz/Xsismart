const Mongoclient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectID
const jwt = require('jsonwebtoken');
let dbo

module.exports = exports = function (server, config) {
    server.get('/api/user', (req, res) => {
        Mongoclient.connect(config.dbconn, async function (err, db) {
            if (err) {
                var error = new Error(err.message)
                return error
            }
            dbo = db.db(config.dbname)
            await dbo.collection('user').find().toArray(function (error, response) {
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

    server.post('/api/Cekuser', (req, res) => {
        const {email,password}=req.body
        Mongoclient.connect(config.dbconn, async function (err, db) {
            if (err) {
                var error = new Error(err.message)
                return error
            }
            dbo = db.db(config.dbname)
            await dbo.collection('user').find({"email":email,"password":password}).toArray(function (error, response) {
                if (err) {
                    res.send(400, {
                        success: false,
                        result: error
                    })
                }
                else{
                    if (response.length!=0) {
                        const token=
                        jwt.sign({
                            id:response[0]._id,
                            name:response[0].name
                        }, config.jwt_secret,{
                            expiresIn:3600
                        })
                        response[0].token=token
                        console.log(response)
                    }
                }
                

                res.send(200, {
                    success: true,
                    result: response
                })
                db.close()
            })
        })
    })

    server.post('/api/user', (req, res) => {
        var entity = req.body
        Mongoclient.connect(config.dbconn, async function (err, db) {
            if (err) {
                var error = new Error(err.message)
                return next(error)
            }
            dbo = db.db(config.dbname)
            let model = {}
            model.name = entity.name
            model.email = entity.email
            model.password = entity.password
            model.address = entity.address
            model.active = true
            model.create_by = "system"
            model.create_at = new Date()
            model.update_by = ""
            model.update_at = new Date()
            await dbo.collection('user').insertOne(model, function (error, response) {
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

    server.get('/api/user/:email', (req,res,next)=>{
        var {email} = req.params
        Mongoclient.connect(config.dbconn,async function(err, db){
            if (err) {
                var error = new Error(err.message)
                return next(error)
            }
            dbo = db.db(config.dbname)
            await dbo.collection('user').find({"email":email}).toArray(function(error, response){
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



