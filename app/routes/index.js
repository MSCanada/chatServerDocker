var passport=require('passport');
var log = require('debug')('balloons:chatServerConfig');
var dbLayer=require('../DBLayer.js');


module.exports=function(app){
    var client=app.get('redisClient');
  app.get('/', function(req, res, next) {


    if(req.isAuthenticated()){
log("Reached after authentication")
      res.redirect('/rooms');

    }
    else
        res.render('index');



  });



    app.get('/auth/twitter', passport.authenticate('twitter'));

    app.get('/rooms',function(req,res){
        if(req.isAuthenticated()){


        dbLayer.getAllRooms(client,function(rooms){
        res.render('list_rooms',{rooms:rooms});

        });
    }
        else
            res.redirect('/');

    });

    app.get('/createRooms',function(req,res){
        if(req.isAuthenticated()){
            var url = require('url');
            var url_parts = url.parse(req.url, true);
            var query = url_parts.query;
            console.log(query.roomName);

            dbLayer.createRoom(client,query.roomName,res);

        }
        else
            res.redirect('/');

    });



    app.get('/auth/twitter/callback',
        passport.authenticate('twitter', {
          successRedirect: '/',
          failureRedirect: '/'
        })
    );

    app.get('/mainRoom', function(req, res, next) {

        res.render('mainRoom');


    });

    app.get('/logout', function(req, res, next) {

        req.logout();
        res.redirect('/');


    });






    app.get('/error', function(req, res, next) {

res.render('error');


    });
  



}