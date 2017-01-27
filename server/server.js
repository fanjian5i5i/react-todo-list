var express = require('express');
var path = require('path');
var config = require('../webpack.config.js');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var request = require('request');
const fs = require('fs');
var WPAPI = require( 'wpapi' );
var app = express();
var compiler = webpack(config);
// console.log(auth);
var wpendpoint = new WPAPI({
    endpoint: 'http://s21451.p611.sites.pressdns.com/wp-json',
    // This assumes you are using basic auth, as described further below
    username: 'jian.fan',
    password: 'Njsg1JnE6^J7v(QH6l^evH$p'
});
app.use(webpackDevMiddleware(compiler,{noInfo:true, publicPath:config.output.publicPath}));
app.use(webpackHotMiddleware(compiler));
app.use(express.static('./dist'));


app.get('/', function (req, res) {
    res.sendFile(path.resolve('client/index.html'));
});

var user = [];
// app.UseCors(CorsOptions.AllowAll);

var port = 3000;
var router = express.Router();
router.get('/createproject',function(req,res){
  wpendpoint.posts().create({
    // "title" and "content" are the only required properties
    title: '1231231231',
    status: 'publish'
}).then(function( response ) {
    // "response" will hold all properties of your newly-created post,
    // including the unique `id` the post was assigned on creation
    res.send( response);
})
});
router.get('/parcels',function(req,res){
  var parcels = [];
  request('http://s21451.p611.sites.pressdns.com/wp-json/wp/v2/parcels', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      // console.log(JSON.parse(body)) // Show the HTML for the Google homepage.
      res.send(JSON.parse(body));
    }
  })
});
router.get('/owners',function(req,res){

  request('http://10.241.104.211:8080/wp-json/wp/v2/owners', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      // console.log(JSON.parse(body)) // Show the HTML for the Google homepage.
      res.send(JSON.parse(body));
    }
  })
});
router.get('/neighborhoods',function(req,res){

  request('http://10.241.104.211:8080/wp-json/wp/v2/neighborhoods', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      // console.log(JSON.parse(body)) // Show the HTML for the Google homepage.
      res.send(JSON.parse(body));
    }
  })
});
router.get('/zipcodes',function(req,res){

  request('http://10.241.104.211:8080/wp-json/wp/v2/zipcodes', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      // console.log(JSON.parse(body)) // Show the HTML for the Google homepage.
      res.send(JSON.parse(body));
    }
  })
});
router.get('/currentuses',function(req,res){

  request('http://10.241.104.211:8080/wp-json/wp/v2/currentuses', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      // console.log(JSON.parse(body)) // Show the HTML for the Google homepage.
      res.send(JSON.parse(body));
    }
  })
});

router.get('/urareas',function(req,res){

  request('http://10.241.104.211:8080/wp-json/wp/v2/urareas', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      // console.log(JSON.parse(body)) // Show the HTML for the Google homepage.
      res.send(JSON.parse(body));
    }
  })
});
router.get('/statuses',function(req,res){

  request('http://10.241.104.211:8080/wp-json/wp/v2/status', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      // console.log(JSON.parse(body)) // Show the HTML for the Google homepage.
      res.send(JSON.parse(body));
    }
  })
});
router.get('/preferreduses',function(req,res){

  request('http://10.241.104.211:8080/wp-json/wp/v2/preferreduses', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      // console.log(JSON.parse(body)) // Show the HTML for the Google homepage.
      res.send(JSON.parse(body));
    }
  })
});
router.get('/responsibledepts',function(req,res){

  request('http://10.241.104.211:8080/wp-json/wp/v2/responsible_dept', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      // console.log(JSON.parse(body)) // Show the HTML for the Google homepage.
      res.send(JSON.parse(body));
    }
  })
});
router.get('/projectmanagers',function(req,res){

  request('http://10.241.104.211:8080/wp-json/wp/v2/projectmanagers', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      // console.log(JSON.parse(body)) // Show the HTML for the Google homepage.
      res.send(JSON.parse(body));
    }
  })
});


router.get('/parcel/:parcelID',function(req,res){
  var parcels = [];
  // res.send(req.params);
  console.log(req.params.parcelID);
  request('http://10.241.104.211:8080/wp-json/wp/v2/parcels/'+req.params.parcelID, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      // console.log(JSON.parse(body)) // Show the HTML for the Google homepage.
      res.send(body);
    }
  })
});
router.get('/updatetest',function(req,res){
  // console.log(req.query);
  var formData = {
    "fields":req.query.acf
  }
  request.post({
    url:'http://10.241.104.211:8080/wp-json/acf/v2/parcels/'+req.query.id,
    json:formData,
    auth:{
      user:auth.wp.users[0].userid,
      pass:auth.wp.users[0].password
    }
  }, function optionalCallback(err, httpResponse, body) {
    if (err) {
      return res.send('upload failed:', err);
    }
    // console.log(res);
    res.status(200).send({"message":"Success"});
  });


});
router.get('/create',function(req,res){
  var response = res;
  // console.log(req.query);
  // var formData = {
  //   "fields":req.query.acf
  // }
  request.post({
    url:'http://10.241.104.211:8080/wp-json/wp/v2/parcels/',
    auth:{
      user:auth.wp.users[0].userid,
      pass:auth.wp.users[0].password
    },
    json:{status:"publish",title:req.query.pid}

  }, function optionalCallback(err, httpResponse, body) {
    if (err) {
      return res.send('upload failed:', err);
    }
    // var respond = JSON.parse(body);
    var respond = body.split("</body>");
    // console.log();
    var parcelID = JSON.parse(respond[1]).id.toString();
    console.log(req.query);
    request.post({
      url:'http://10.241.104.211:8080/wp-json/acf/v2/parcels/' + parcelID,
      auth:{
        user:auth.wp.users[0].userid,
        pass:auth.wp.users[0].password
      },
      json:{fields:req.query.acf}

    }, function optionalCallback(err, httpResponse, body) {
      if (err) {
        return res.send('upload failed:', err);
      }
      response.send({"status":"OK","id":parcelID});
      // var respond = JSON.parse(body);
      // var respond = body.split("</body>");
      // console.log();

      // res.send(JSON.parse(respond[1]).id.toString());
      // body.split(</body>);
      // res.status(200).send({"message":"Success"});
      // res.send(respond.id);
    });
    // res.send(JSON.parse(respond[1]).id.toString());
    // body.split(</body>);
    // res.status(200).send({"message":"Success"});
    // res.send(respond.id);
  });

  // request.post({
  //   url:'http://10.241.104.211:8080/wp-json/acf/v2/parcels/'+req.query.id,
  //   json:formData,
  //   auth:{
  //     user:auth.wp.users[0].userid,
  //     pass:auth.wp.users[0].password
  //   }
  // }, function optionalCallback(err, httpResponse, body) {
  //   if (err) {
  //     return res.send('upload failed:', err);
  //   }
    // console.log(res);
  //   res.status(200).send({"message":"Success"});
  // });


});

router.get('/mediatest',function(req,res){
  wp.media()
  // Specify a path to the file you want to upload
  .file( '/home/fanjian5i5i/Desktop/bitbucket/bold/img/2.jpg' )
  .create({
      title: 'My awesome image',
      alt_text: 'an image of something awesome',
      caption: 'This is the caption text',
      description: 'More explanatory information'
  })
  // .then(function( response ) {
  //     // Your media is now uploaded: let's associate it with a post
  //     var newImageId = response.id;
  //     return wp.media().id( newImageId ).update({
  //         post: "50"
  //     });
  // })
  .then(function( response ) {
      console.log( 'Media ID #' + response);
      // console.log( 'is now associated with Post ID #' + response.post );
  });
});
router.get('/login', function(req, res) {
	console.log(req.query);
	var validator = 0;
	var userid, password = "";
	auth.wp.users.forEach(function(user){
		if(req.query.email===user.email){
			// res.sendStatus(200);
			console.log("in");
			console.log(user.email);
			userid = user.userid;
			password = user.password;
			validator += 1;
		}
	});
	if(validator==0){
		res.sendStatus(404);
	}else{
		// res.sendStatus(200);
    user.push(req.query.email);
    res.send(req.query.email);
	}


});

router.get('/isloggedin', function(req, res) {

	if(user.length === 0){
		res.sendStatus(404);
	}else{
		// res.sendStatus(200);
    res.send(user[0]);
	}


});

router.get('/logout', function(req, res) {
  user = [];
  res.sendStatus(200);
});

app.use('/api', router);


app.listen(port, function(error) {
  if (error) throw error;
  console.log("Express server listening on port", port);
});
