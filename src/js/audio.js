var audio = document.getElementById("audio");
if(localStorage.getItem('value')) {
    audio.volume = localStorage.getItem('value')/100;
}
else{
    audio.volume = 0;
}
audio.loop = true;
audio.autoplay = true;