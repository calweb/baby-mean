// require necessary modules
var express = require('express')
  , mongoskin = require('mongoskin')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , db = mongoskin.db((process.env.MONGOLAB_URI || 'localhost:27017/test'), {safe:true});

// get an instance of express
var app = express();

var corsStuff = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', process.env.DOMAIN);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    console.log(process.env.DOMAIN);
    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};

// configure it
app.configure(function(){
  app.use(corsStuff);
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

// dev config
app.configure('development', function(){
  app.use(express.errorHandler());
});

// index route
app.get('/', routes.index);

// Setup the collectionName param for requests
app.param('collectionName', function(req, res, next, collectionName){
  req.collection = db.collection(collectionName)
  return next()
})

// API endpoints
// Thanks to http://webapplog.com/tutorial-node-js-and-mongodb-json-rest-api-server-with-mongoskin-and-express-js/
// for the cool help

// GET /collections/:collectionName
app.get('/api/collections/:collectionName', function(req, res) {
  req.collection.find({},{limit:100, sort: [['_id',-1]]}).toArray(function(e, results){
    if (e) return next(e)
    res.send(results)
  })
})

// POST /collections/:collectionName
app.post('/api/collections/:collectionName', function(req, res) {
  req.collection.insert(req.body, {}, function(e, results){
    if (e) return next(e)
    res.send(results[0])
  })
})


// GET /collections/:collectionName/:id
app.get('/api/collections/:collectionName/:id', function(req, res) {
  req.collection.findOne({_id: req.collection.id(req.params.id)}, function(e, result){
    if (e) return next(e)
    res.send(result)
  })
})

// PUT /collections/:collectionName/:id
app.put('/api/collections/:collectionName/:id', function(req, res) {

  // backbone sends the _id in the payload, but mongo doesn't wan it in the $set
  delete req.body._id

  req.collection.update({_id: req.collection.id(req.params.id)}, {$set:req.body}, {safe:true, multi:false}, function(e, result){
    res.send((result===1)? 200 : 404 )
  })
})

// DELETE /collections/:collectionName
app.del('/api/collections/:collectionName/:id', function(req, res) {
  req.collection.remove({_id: req.collection.id(req.params.id)}, function(e, result){
    if (e) return next(e)
    res.send((result===1)?{msg:'success'}:{msg:'error'})
  })
})

// DELETE /collections/:collectionName
// app.del('api/collections/:collectionName', function(req, res) {
//   req.collection.drop()
//   res.send((result===1)?{msg:'success, oh yeah'}:{msg: 'oh noes! you broke it'})
// })

// end API endpoints

// run the server
http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
