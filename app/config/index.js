/**
 * Created by Muhammad Suhail on 7/2/2016.
 */
var log = require('debug')('balloons:chatServerConfig')
    , express = require('express')
    , redis = require('redis')
    , RedisStore = require('connect-redis')(express)
    , passport = require('passport')
    , path = require('path')
    , url = require('url')
    , config = {}



module.exports=function(app){

    config=require('./config.json');
    var host = process.env.REDIS_PORT_6379_TCP_ADDR || '127.0.01';
var port = process.env.REDIS_PORT_6379_TCP_PORT || 6379;



app.set('config',config);
    app.set('port',config.app.port);
    app.set('view engine','jade');
    app.set('redisURL', config.redisURL);
    var redisConfig = url.parse(config.redisURL);

   // var redisClient = redis.createClient(redisConfig.port, redisConfig.hostname);
    var redisClient = redis.createClient(port, host);
    redisClient
        .on('error', function(err) {
            log('Error connecting to redis %j', err);
        }).on('connect', function() {
        log('Connected to redis.');
    }).on('ready', function() {
        log('Redis client ready.');
    });

    app.set('redisClient', redisClient);


    app.set('sessionStore', new RedisStore({client: redisClient}));


    app.set('views', path.join(__dirname, '..', '/views'));


    app.use(express.static(path.join(__dirname, '..', '/public')));


    app.use(express.bodyParser());


    app.use(express.cookieParser(config.session.secret));


    //this is the main syntax which stores session id in cookie so that it could be retreived anywhere and then that id can be used to fetch the session
    
    app.use(express.session({
        key: "chatServer",
        store: app.get('sessionStore'),
        cookie: {
            maxAge: config.session.age || null
        }
    }));


    app.use(passport.initialize());
    app.use(passport.session());


    app.use(app.router);


}