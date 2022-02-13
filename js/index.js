
let musicPosition;

// Thumbnail image controls
function pauseAudio(audioId) {
    let music=document.getElementById(audioId);
    music.pause();
    music.setAttribute("statusText", "paused");
    clearInterval(musicPosition);  
};


function playAudio(audioId, barId) {
    let music=document.getElementById(audioId);
    let durationSeconds = music.duration;
    let durationMilliseconds = durationSeconds * 1000;
    music.play();
    music.setAttribute("statusText", "playing");
    musicPosition = setInterval(barWidth, 10);
    function barWidth() {
        let positionSeconds = music.currentTime;
        let positionMilliseconds = positionSeconds * 1000;
        let proportionPlayed = positionMilliseconds / durationMilliseconds;
        let percentPlayed = (proportionPlayed * 100);
        let barWidthString = percentPlayed + "%";
       
        if (percentPlayed >= 100) { clearInterval(musicPosition);
                                    getElementById(audioId).currentTime = "0";} 
        else {document.getElementById(barId).style.width = barWidthString;};
    
    };
    let musicIds = ['piece01_music', 'piece02_music', 'piece03_music'];
    let remainingIds = musicIds.filter(otherMusic);
    function otherMusic(idString) {
        return idString !== pieceId;
    };
    remainingIds.forEach(pauseAudio);
    
};


function backAudio(audioId, barId) {
    let music=document.getElementById(audioId);
    let durationSeconds = music.duration;
    let positionSeconds = music.currentTime;
    pauseAudio(audioId);
    let durationMilliseconds = durationSeconds * 1000;
    let positionMilliseconds = positionSeconds * 1000;
    let proportionPlayed = positionMilliseconds / durationMilliseconds;
    let backIntervalMilliseconds = 0;
    let backIntervalSeconds = 0;

    if (proportionPlayed <= 0.20) { backIntervalMilliseconds = positionMilliseconds / 2;
                                    backIntervalSeconds = backIntervalMilliseconds / 1000;
                                    music.currentTime = backIntervalSeconds;} 
    else { backIntervalMilliseconds = durationMilliseconds / 10;
           let newPositionMilliseconds = positionMilliseconds - backIntervalMilliseconds;
           let newPositionSeconds = newPositionMilliseconds /1000;
           music.currentTime = newPositionSeconds;};
    playAudio(audioId, barId);

};

function forwardAudio(audioId, barId) {
    clearInterval(musicPosition);
    let music=document.getElementById(audioId);
    let durationSeconds = music.duration;
    let positionSeconds = music.currentTime;
    music.pause();
    music.setAttribute("statusText", "paused");
    clearInterval(musicPosition);
    let durationMilliseconds = durationSeconds * 1000;
    let positionMilliseconds = positionSeconds * 1000;
    let proportionPlayed = positionMilliseconds / durationMilliseconds;
    let jumpIntervalMilliseconds = 0;
    let jumpIntervalSeconds = 0;

    if (proportionPlayed <= 0.10) { jumpIntervalMilliseconds = positionMilliseconds * 1.50;
                                    jumpIntervalSeconds = jumpIntervalMilliseconds / 1000;
                                    music.currentTime = jumpIntervalSeconds;} 
    else { jumpIntervalMilliseconds = durationMilliseconds / 10;
           let newPositionMilliseconds = positionMilliseconds + jumpIntervalMilliseconds;
           let newPositionSeconds = newPositionMilliseconds /1000;
           music.currentTime = newPositionSeconds;};
    playAudio(audioId, barId);

};

function adjustVolume(sliderId, audioId) {
        let music = document.getElementById(audioId);
        let currentStatus = music.getAttribute("statusText");
        if (currentStatus === "paused") {alert('Please play track before changing the volume for a better experience.');}
        else {let volumeValue = document.getElementById(sliderId).value;
              let decimalValue = volumeValue / 100;
        music.volume = decimalValue;};


};


var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  let tempIndex = slideIndex + n;
  showSlides(tempIndex);
};

// Thumbnail image controls
function currentSlide(pieceId) {
    document.getElementById(pieceId).style.display = "block";
    let pieceIdArray = ['piece01', 'piece02', 'piece03'];
    let remainingPieces = pieceIdArray.filter(otherPieces);
    function otherPieces(idString) {
        return idString !== pieceId;
    };
    for (let i=0; i < remainingPieces.length; i++) {
        let idNow = remainingPieces[i];
        let reconstructedMusicId = idNow +"_music";
        pauseAudio(reconstructedMusicId);
        document.getElementById(idNow).style.display="none";
    };

};

function showSlides(tempIndex) {
  let n = tempIndex;
  var i;
  let slides = ['piece01', 'piece02', 'piece03'];
  let dots = ['dot01', 'dot02', 'dot03'];;
  if (n > slides.length) {slideIndex = 1;}
  else if (n < 1) {slideIndex = slides.length}
  else {slideIndex = n};

  let slideNumber = slideIndex - 1;

  let idNow = slides[slideNumber];
  document.getElementById(idNow).style.display = "block";

  let dotNow = dots[slideNumber];
  document.getElementById(dotNow).classList.add = "active";

  let remainingSlides=slides.filter(remainderSlides);
  function remainderSlides(stringId) {
      return stringId !== idNow;
  };
  for (let i=0; i < remainingSlides.length; i++) {
    let idNow = remainingSlides[i];
    let reconstructedMusicId = idNow +"_music";
    pauseAudio(reconstructedMusicId);
    document.getElementById(idNow).style.display="none";
   };


  let remainingDots = dots.filter(remainderDots);
  function remainderDots(dotStringId) {
      return dotStringId !== dotNow;
  };
  for (let j=0; j < remainingDots.length; j++) {
    let dotIdNow = remainingDots[i];
    document.getElementById(dotIdNow).classList.remove= "active";
   };

};
