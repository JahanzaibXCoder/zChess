/*
Created by: Kenrick Beckett

Name: Chat Engine
*/

var instanse = false;
var state;
var mes;
var filename;
var globbyid;
var noOfRecords = -1;

function Chat (lobbyid, tnoOfRecords) {
  this.update = updateChat;
  this.send = sendChat;
//  this.getState = getStateOfChat;
//  this.setState = setStateOfChat;
  filename = "lobbychat" + lobbyid + ".txt";
  globbyid = lobbyid;
  noOfRecords = tnoOfRecords;

  //  filename = "lobbychat" + lobbyid + ".txt";
}

//gets the state of the chat
function getStateOfChat(){
	if(!instanse){
		 instanse = true;
		 $.ajax({
			   type: "POST",
			   url: "process.php",
			   data: {
			   			'function': 'getState',
						'file': filename,
            'lobbyid': globbyid
						},
			  //dataType: "json",
			   success: function(data){
         var data = JSON.parse(data);
				   state = data.state;
				   instanse = false;
          // console.log(state);
			   },
			});
	}
}

//Updates the chat
function updateChat(){
	 if(!instanse){
		 instanse = true;
	     $.ajax({
			   type: "POST",
			   url: "process.php",
			   data: {
			   		'function': 'update',
						'state': state,
						'file': filename,
            'lobbyid': globbyid,
            'noOfRecords': noOfRecords
						},
			    //dataType: "jsonp",
			   success: function(response){
            var data = JSON.parse(response);
				   if(data.text){
						for (var i = 0; i < data.text.length-1; i++)
            {
                $('#chat-area').append($("<span><p>[<i>"+ data.time[i] + "</i>]</p><span id = 'profile' value ='"+data.shoutid[i]+"'class = 'moderator'><i><b>" + data.name[i] + "</b></i>: </span><span class ='shoutboxtext'>" + data.text[i] +"\n</span><div class = 'chat-spacer'></div></span>"));
            }
            document.getElementById('chat-area').scrollTop = document.getElementById('chat-area').scrollHeight;
				   }
				   instanse = false;
				   state = data.state;
			   },
			});
	 }
	 else {
		 setTimeout(updateChat, 1500);
	 }
}

//send the message
function sendChat(message, nickname)
{
    updateChat();
     $.ajax({
		   type: "POST",
		   url: "process.php",
		   data: {
		   		'function': 'send',
					'message': message,
					'nickname': nickname,
					'file': filename,
          'lobbyid': globbyid
				 },
		 //  dataType: "json",
		   success: function(data){
			   updateChat();
		   },
		});
}
