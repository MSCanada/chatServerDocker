/**
 * Created by Muhammad Suhail on 7/2/2016.
 */
var express= require('express');
var app=express();

require('./config')(app);
require('./passportStrategy')(app);

require('./routes')(app);

exports.server = require('http')
    .createServer(app).listen(app.get('port'), function() {
        console.log('Chat Server started on port %d', app.get('port'));
    });



require('./chatServerSockets')(app,exports.server);