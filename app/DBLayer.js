/**
 * Created by Muhammad Suhail on 7/9/2016.
 */
exports.getAllRooms=function(client,fn){
client.smembers('rooms:chatServer',function(err,rooms){
    console.log(rooms);
    fn(rooms);

})


}


exports.createRoom=function(client,roomName,res){
    client.sadd('rooms:chatServer',roomName);
    res.redirect('/rooms');

}