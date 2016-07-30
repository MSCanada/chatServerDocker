/**
 * Created by Muhammad Suhail on 7/4/2016.
 */
var socket = io.connect();
var text="";
if(document.getElementById("roomName")!==null)
document.getElementById("roomName").innerHTML=localStorage.getItem("roomName");
socket.on('new msg', function(data){
   console.log(data);
   text=text+data.text + '<br>'

   if(document.getElementById("chatbox")!==null)
   document.getElementById('chatbox').innerHTML=text;
});




function enterRoom(){
   var room=document.getElementById('room_list').value;
   console.log(document.getElementById('room_list').value);
   socket.emit('enter room', {roomName:room});
   localStorage.setItem("roomName", room);
 window.location.href="/mainRoom"

}


function send(){
   var textSend=document.getElementById('text').value;
   document.getElementById('text').value="";
   socket.emit('my msg', {text:textSend});

}


function createRoom(){
   var xhttp = new XMLHttpRequest();
   xhttp.open("GET", "/createRooms?roomName="+document.getElementById('newRoom').value, true);
   xhttp.send();
   socket.emit('enter room', {roomName:document.getElementById('newRoom').value});
   localStorage.setItem("roomName", document.getElementById('newRoom').value);
   window.location.href="/mainRoom"


}