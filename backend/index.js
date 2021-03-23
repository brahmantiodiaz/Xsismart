const restify = require('restify')
const corsMiddleware =require('restify-cors-middleware')
const PORT = 8080
const server = restify.createServer({
    name: 'Web API',
    version: '1.0.0'

})
//body parser
server.use(restify.plugins.bodyParser())
//query parser
server.use(restify.plugins.queryParser())

global.config = require('./config/dbconfig')

//config cors
const cors = corsMiddleware({
    origins : ["http://localhost:8000"],
    allowHeaders : ['x-access-token'],
    exposeHeaders : []
})
server.pre(cors.preflight)
server.use(cors.actual)

//en config cors



require('./service/categoryService')(server,global.config)
require('./service/variantService')(server,global.config)
require('./service/productService')(server,global.config)
server.get('/api/example', (req, res) => {
    res.send(200, {
        data: {
            name: "diaz",
            alamat: "depok",
            age: 21
        }
    })
})

server.get('/api/example/:id/:nama/:alamat', (req, res) => {
    const id = req.params.id
    const {alamat, nama} = req.params
    res.send(200, {
        data: {
            id: id,
            name: nama,
            address: alamat,
            age: 21
        }
    })
})

server.listen(PORT, function () {
    console.log("Server ", server.name, " running on port", PORT)
})