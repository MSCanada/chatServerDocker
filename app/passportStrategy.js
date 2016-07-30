/**
 * Created by Muhammad Suhail on 7/2/2016.
 */
var passport=require('passport');
var  TwitterStrategy = require('passport-twitter').Strategy
var log = require('debug')('balloons:chatServerConfig');

module.exports=function(app){
    var config=app.get('config');
    if(config.auth.twitter.consumerkey.length) {
        passport.use(new TwitterStrategy({
                consumerKey: config.auth.twitter.consumerkey,
                consumerSecret: config.auth.twitter.consumersecret,
                callbackURL: config.auth.twitter.callback
            },
            function(token, tokenSecret, profile, done) {

                return done(null, profile);
            }
        ));
    }


    passport.serializeUser(function(user, done) {

        done(null, user);
    });

    passport.deserializeUser(function(user, done) {
        
        done(null, user);
    });


}