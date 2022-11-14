
let timeOn = document.getElementById("timeOn");
let timeOff = document.getElementById("timeOff");
let offOption = document.getElementById('schedule-off');
let onOption = document.getElementById('schedule-on');
let onOffButton = document.getElementById('onOffButton');

const exp = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/ 

  chrome.storage.sync.get('timeOn', function(data) {
    //console.log(data);
    let time = data.timeOn;
    if(time&&time.match(exp)) {
      timeOn.value=time
    }
  });

  chrome.storage.sync.get('timeOff', function(data) {
    //console.log(data);
    let time = data.timeOff;
    if(time&&time.match(exp)) {
      timeOff.value=time
    }
  });

  chrome.storage.sync.get('onOff', function(data) {
    //console.log(data);
    let onOffData = data.onOff;
    if(onOffData=='On') {
      onOption.checked=true;
    } else {
      offOption.checked=true;
    }
  });
//New branch (ignore this is a test)

timeOn.addEventListener('input',function() {
    console.log('SaveOn:');
    console.log(timeOn.value);
    chrome.storage.sync.set({timeOn: timeOn.value})
})
timeOff.addEventListener('input',function() {
    console.log('SaveOff:')
    console.log(timeOff.value);
    chrome.storage.sync.set({timeOff: timeOff.value})
})

onOffButton.addEventListener('click', function (event) {
  if (event.target && event.target.matches("input[type='radio']")) {
      //console.log(event);
      chrome.storage.sync.set({onOff: event.srcElement.defaultValue});
  }
});

  