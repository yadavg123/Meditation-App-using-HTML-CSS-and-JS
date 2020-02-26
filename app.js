const app = () => {
    const song=document.querySelector('.song');
    const play=document.querySelector('.play');
    const outline=document.querySelector('.moving-outline circle');
    const video=document.querySelector('.vid-container video');

    // SOUND
    const sounds=document.querySelectorAll('.sound-picker button');
    // TIME_DISPLAY
    const timeDisplay=document.querySelector('.time-display');
    const timeSelect = document.querySelectorAll('.time-select button');
    // GET THE LENGTH OF OUTLINE
    const outlineLength=outline.getTotalLength();
    console.log(outlineLength);
    // DURATION
    let fakeDuration=600;
    outline.style.strokeDasharray=outlineLength;
    outline.style.strokeDashoffset=outlineLength; 

    // PICK DIFFERENT SOUNDS
    sounds.forEach(sound => {
        sound.addEventListener('click',function(){
            song.src = this.getAttribute('data-sound');
            video.src = this.getAttribute('data-video');
            video.style.width="100%";;
            checkPlaying(song);
        });
    });


    // PLAY SOUND
    play.addEventListener('click',()=>{
        checkPlaying(song);
    });

    // SELECT SOUND
    timeSelect.forEach(option => {
        option.addEventListener('click',function(){
            fakeDuration = this.getAttribute('data-time');
            timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(fakeDuration %60)}`;
        });
    });


    // CREATE A SPECIFIC FUNCTION TO PLAY AND STOP THE SOUND
    const checkPlaying= song => {
        if(song.paused){
            song.play();
            video.play();
            play.src="./svg/pause.svg";
        }else{
            song.pause();
            video.pause();
            play.src="./svg/play.svg";
        }
    };

    // WE CAN ANIMATE THE CIRCLE
    song.ontimeupdate= () => {
        let currentTime=song.currentTime;
        let elapsed=fakeDuration - currentTime;
        let seconds=Math.floor(elapsed % 60);
        let minutes=Math.floor(elapsed / 60); 
        // ANIMATE THE CIRCLE
        let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
        outline.style.strokeDashoffset = progress;
        // ANIMATE THE TEXT
        timeDisplay.textContent = `${minutes}:${seconds}`;
        if(currentTime >= fakeDuration){
            song.pause();
            song.currentTime = 0;
            play.src = "./svg/play.svg";
            video.pause();
        }
    };


}
app();