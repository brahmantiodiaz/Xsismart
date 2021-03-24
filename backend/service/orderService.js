const Mongoclient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectID

let dbo

module.exports = exports = function (server, config) {
    server.get('/api/payment', (req, res) => {
        Mongoclient.connect(config.dbconn, async function (err, db) {
            if (err) {
                var error = new Error(err.message)
                return error
            }
            dbo = db.db(config.dbname)
            await dbo.collection('paymentmethod').find().toArray(function (error, response) {
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

    server.post('/api/order', (req, res, next) => {
        console.log(req.body)
        var entity = req.body
        Mongoclient.connect(config.dbconn, async function (err, db) {
            if (err) {
                var error = new Error(err.message)
                return next(error)
            }
            dbo = db.db(config.dbname)
            var header = {}
            header.paymentmethod_id = ObjectId(entity.header.payment)
            header.total = entity.header.total
            header.active = true
            header.create_by = "system"
            header.create_at = new Date()
            header.update_by = ""
            header.update_at = new Date()
            await dbo.collection('OrderHeader').insertOne(header, function (error, response) {
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
            })
            //console.log(header)
            //
            var details = entity.details
            console.log(details)
            // details.forEach(order => {
            //     if (order._id == undefined || order.qty == undefined || order.price == undefined) {
            //         var error = new Error('ProductId, Quantity and Price are required!');
            //         error.status = 412;
            //         return next(error);
            //     }
            //     order.header_id = header._id;
            //     order.product_id = ObjectId(order._id);
            //     TimeStamp(order, req);
            // })

            // dbo.collection('OrderDetails' + suffix).insertMany(details, (errDetail, resDetail) => {
            //     if (errDetail) {
            //         return next(new Error(errDetail));
            //     }

            //     return res.send(201, {
            //         header: header,
            //         details: details
            //     })
            // })

        })
    })


}