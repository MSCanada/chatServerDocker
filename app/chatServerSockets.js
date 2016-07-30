/**
 * Created by Muhammad Suhail on 7/4/2016.
 */
var sio = require('socket.io')
    , parseCookies = require('connect').utils.parseSignedCookies
    , cookie = require('cookie')
var log = require('debug')('socketData');
module.exports=function(app,server){

    var config = app.get('config');
    var client = app.get('redisClient');
    var sessionStore = app.get('sessionStore');

    var io = sio.listen(server);
    io.set('authorization', function (hsData, accept) {
        log("HEaderData is ",hsData);
        if(hsData.headers.cookie) {
            var cookies = parseCookies(cookie.parse(hsData.headers.cookie), config.session.secret)
                , sid = cookies['chatServer'];
            log("Cookies are ",cookies);
            sessionStore.load(sid, function(err, session) {

                log("Session is ",session);
                if(err || !session) {
                    return accept('Error retrieving session!', false);
                }
        log("Session is ",session);
                hsData.balloons = {
                    user: session.passport.user,
                    room: /\/(?:([^\/]+?))\/?$/g.exec(hsData.headers.referer)[1]
                };

                return accept(null, true);

            });
        } else {
            return accept('No cookie transmitted.', false);
        }
    });


    io.sockets.on('connection', function (socket) {
        var hs = socket.handshake
            , nickname = hs.balloons.user.username
        //     , provider = hs.balloons.user.provider
        //     , userKey = provider + ":" + nickname
        //     , room_id = hs.balloons.room
        //     , now = new Date()





        socket.on('my msg', function(data) {


log('spcket data is ',data)

                // chatlogWriteStream.write(JSON.stringify(chatlogRegistry) + "\n");

            io.sockets.in(socket.room).emit('new msg', {text:nickname+" "+data.text});

        });


        socket.on('enter room', function(data) {


            log('roomName is ',data);

        socket.room=data.roomName;
            log('joining room:  ',data.roomName)
           socket.join(data.roomName);

        });






    });

}