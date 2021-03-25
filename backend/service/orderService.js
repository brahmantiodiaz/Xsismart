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
        // console.log(req.body)
        var entity = req.body
        // const{header,details} = req.body
        // console.log(header)
        Mongoclient.connect(config.dbconn, async function (err, db) {
            if (err) {
                var error = new Error(err.message)
                return next(error)
            }
            dbo = db.db(config.dbname)

            getNewInvoice(dbo, newInv => {
                var header = {}
                header.paymentmethod_id = ObjectId(entity.header.payment)
                header.no_invoice = newInv
                header.total = entity.header.total
                header.active = true
                header.create_by = "system"
                header.create_at = new Date()
                header.update_by = ""
                header.update_at = new Date()
                dbo.collection('OrderHeader').insertOne(header, function (errHeader, resHeader) {
                    if (err) {
                        return next(errHeader)
                    }
                    if (resHeader) {
                        var details = entity.details
                        console.log(details)
                        console.log(header._id)
                        details.forEach(order => {
                            order.orderheader_id = ObjectId(header._id);
                            order.product_id = ObjectId(order.product_id);
                            // TimeStamp(order, req);
                        })
                        dbo.collection('OrderDetails').insertMany(details, (errDetail, resDetail) => {
                            if (errDetail) {
                                res.send(400,{
                                    success : false,
                                    result : error
                                })
                                return next(errDetail)
                            }
                            res.send(200, {
                                success: true,
                                result: resDetail
                            })
                        })
                        console.log(details)
                    }
                })

            })
            //console.log(header)
            //
            // var details = entity.details
            // console.log(details)
            // details.forEach(order => {
            //     if (order._id == undefined || order.qty == undefined || order.price == undefined) {
            //         var error = new Error('ProductId, Quantity and Price are required!');
            //         error.status = 412;
            //         return next(error);
            //     }
            //     order.header_id = header._id;
            //     order.product_id = ObjectId(order._id);
            //     // TimeStamp(order, req);
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



function getNewInvoice(dbo, callback) {
    var date = new Date()
    var year = date.getFullYear().toString().substr(-2)
    var month = ("0" + date.getMonth().toString()).substr(-2)
    var lastInv = '0001'
    var newInv = "XM-" + year + month + "-"

    dbo.collection('OrderHeader').find({}, { "no_invoice": 1, "_id": 0 }).sort({ "no_invoice": -1 }).limit(1)
        .toArray(function (error, respon) {
            if (error) {
                return next(error)
            }

            if (respon && respon.length > 0) {
                var splitInv = respon[0].no_invoice.split('-')
                var hit = parseInt(splitInv[splitInv.length - 1]) + 1
                lastInv = '000' + hit
                lastInv = lastInv.substr(-4)
                newInv += lastInv
                return callback(newInv)
            } else {
                newInv += lastInv
                return callback(newInv)
            }

        })



}