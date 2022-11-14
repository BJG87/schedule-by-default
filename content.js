

var running = false;
var scheduledOn = false;

window.addEventListener('load', (event) => {
  setupListener();
});

document.addEventListener("click", function(){
  checkIfInWindow();
});



function setupListener() {
  let now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let hourMinutes = (hours*60)+minutes;

  chrome.storage.sync.get(['onOff', 'timeOn','timeOff'], function(items) {
    console.log(items);
    if(items.onOff=='On') {
      //console.log('Extension On');
      let onMinutes = (+items.timeOn.split(":")[0]*60)+(+items.timeOn.split(":")[1]) //Convert TimeOn to minutes
      let offMinutes = (+items.timeOff.split(":")[0]*60)+(+items.timeOff.split(":")[1]) //Convert TimeOff to minutes
      if(!(hourMinutes<=onMinutes&&hourMinutes>=offMinutes)) {
        console.log('Initiral Setup Listener');
        document.addEventListener('DOMNodeInserted',function() {
          if(!running) {
          checkForButton();
          }
        });
      } else {
        console.log('Initial Switch Off Extension');
        switchOffExtension();
      } 
    } else {
      switchOffExtension();
      console.log('Initial Switch Off Extension');
    }
  });
}


function checkForButton() { 
    //console.log('CheckForButton');
    running=true;
    //var timeCheck = checkIfInWindow();
    //console.log(timeCheck);
    /*  if (!timeCheck) {
        return;
      } */
    //if(scheduledOn){return}
    var sendButtonCollection = document.getElementsByClassName("T-I J-J5-Ji aoO v7 T-I-atl L3"); //Look for send and schedule buttons
    var sendButton = sendButtonCollection.item(0);
    var scheduleButtonCollection = document.getElementsByClassName('q8NmZb J-M jQjAxd');
    var scheduleButton = scheduleButtonCollection.item(0);
    if(sendButton&&scheduleButton) { //Change code if buttons detected
      //console.log('Switch On Schedule by Deault');
      for(var i in sendButtonCollection) {
        var newButton = sendButtonCollection.item[i].parentNode.insertBefore(scheduleButtonCollection.item[i], sendButtonCollection.item[i].nextSibling);
        newButton.style.display='block';
        newButton.classList.add('eduScripts_additive');
        //scheduledOn=true;
      }
    //var newButton = sendButton.parentNode.insertBefore(scheduleButton, sendButton.nextSibling);
    //  newButton.style.display='block';
    //  newButton.classList.add('eduScripts_additive');
    } //End Change code if buttons detected
    running=false;
}


function checkIfInWindow() {
  //console.log('CheckIfInWindow');
  let now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let hourMinutes = (hours*60)+minutes;

  chrome.storage.sync.get(['onOff', 'timeOn','timeOff'], function(items) {
    console.log(items);
    if(items.onOff=='On') {
      console.log('Extension On');
      let onMinutes = (+items.timeOn.split(":")[0]*60)+(+items.timeOn.split(":")[1]) //Convert TimeOn to minutes
      let offMinutes = (+items.timeOff.split(":")[0]*60)+(+items.timeOff.split(":")[1]) //Convert TimeOff to minutes
      if((hourMinutes<=onMinutes&&hourMinutes>=offMinutes)) {
        console.log('Switch Off Extension');
        switchOffExtension();
        return false;
      } else {
        //Set up Listener
        console.log('SetupListener');
        document.addEventListener('DOMNodeInserted',function() {
          if(!running) {
          checkForButton();
          }
        });
      }
    } else {
      console.log('Switch Off Extension');
      switchOffExtension();
      return false;
    }
    return true;
  });
}

function switchOffExtension() {
  //console.log('Switch Off Schedule By Default');
  document.removeEventListener('DOMNodeInserted',function(){});
  removeAdditions();
}

function removeAdditions() {
  var newButtonCollection = document.getElementsByClassName("eduScripts_additive"); //Look for created buttons
  var newButton = newButtonCollection.item(0);
  if(newButton) {
    for(var i in newButtonCollection) {
      newButtonCollection.item[i].remove();
    } 
    //newButton.remove();
  }
}

