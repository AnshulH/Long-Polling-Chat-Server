const https = require('https');

function POSTCall() {
    function sendMessage(message) {
        fetch(url, {
          method: 'POST',
          body: message
        });
      }
    
      form.onsubmit = function() {
        var message = form.message.value;
        
        if(message) {
          form.message.value = '';
          sendMessage(message);
        }
        return false;
      };
}

function LongPoll(id , url) {
    function displayMessage(message){
        id.append(<div>${message}</div>)
    }
    async function serverResponse(){
        var res = await fetch(url);
        if(res.status == 200){
            let message = await response.text();
            displayMessage(message);
            await serverResponse();
        } else if (res.status != 200){
            displayMessage("There was an issue with the server. Reconnecting...");
            setTimeout(function() {
                console.log("setTimeout called!");
            }, 1000);
            await serverResponse();
        }
    }
    serverResponse();
}

