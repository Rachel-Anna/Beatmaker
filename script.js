class Drumkit {
    constructor(){
        this.pads = document.querySelectorAll(".pad");
        this.playBtn = document.querySelector(".play");
        this.currentKick = "./sounds/kick-classic.wav";
        this.currentSnare = "./sounds/snare-acoustic01.wav";
        this.currentHihat = "./sounds/hihat-acoustic01.wav";
        this.kickAudio = document.querySelector(".kick-sound");
        this.snareAudio = document.querySelector(".snare-sound");
        this.hihatAudio = document.querySelector(".hihat-sound");
        this.index = 0;
        this.bpm = 200;
        this.isPlaying = null;
        this.selects = document.querySelectorAll("select");
        this.muteBtns = document.querySelectorAll(".mute");
        this.tempoSlider = document.querySelector(".tempo-slider");
        this.resetButton = document.querySelector(".reset");
    }

    activePad(){
        this.classList.toggle("active");
    }

    repeat(){
        let step = this.index % 8; //sets it back to 0
        const activeBars = document.querySelectorAll(`.b${step}`);
        //loop over the pads
        activeBars.forEach(bar => {
            bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`;
            //check if pads are active if active play a sound
            if(bar.classList.contains("active")){
                //check each sound
                if(bar.classList.contains('kick-pad')){
                    this.kickAudio.currentTime = 0;
                    this.kickAudio.play();
                } 
                if(bar.classList.contains('snare-pad')){
                    this.snareAudio.currentTime = 0;
                    this.snareAudio.play();
                }
                if(bar.classList.contains('hihat-pad')){
                    this.hihatAudio.currentTime = 0;
                    this.hihatAudio.play();
                }
            }
        });
        this.index++;
    }
    start() {
     const interval = (60/this.bpm) * 1000;
        //check if it is playing
        if(this.isPlaying) {
            clearInterval(this.isPlaying);
            this.isPlaying = null;           
        } else {
            //if its not playing
            this.isPlaying = setInterval(()=> {
                this.repeat();
            }, interval); 
            
        }
    }
    updateBtn(){
        if(!this.isPlaying){
            this.playBtn.innerText = "Stop";
            this.playBtn.classList.add("active");
        } else {
            this.playBtn.innerText = "Play";
            this.playBtn.classList.remove("active");
        }
    }
    changeSound(e){
        const selectionName = e.target.name;
        const selectionValue = e.target.value;
        switch(selectionName){
            case "kick-select":
                this.kickAudio.src = selectionValue;
                break;
            case "snare-select":
              this.snareAudio.src = selectionValue;
                 break;
            case "hihat-select":
                this.hihatAudio.src = selectionValue;
                    break;

        }
        
    }
    mute(e){
        const muteIndex = e.target.getAttribute("data-track");
        
        e.target.classList.toggle("active");
        
        if(e.target.classList.contains("active")){
            switch(muteIndex){
                case "0":
                    this.kickAudio.volume = 0;
                    break;
                case "1":
                    this.snareAudio.volume = 0;
                    break;
                case "2":
                this.hihatAudio.volume = 0;
                break;
            }
        } else{
            switch(muteIndex){
                case "0":
                    this.kickAudio.volume = 1;
                    break;
                case "1":
                    this.snareAudio.volume = 1;
                    break;
                case "2":
                this.hihatAudio.volume = 1;
                break;
            }
        }
    }
    changeTempo(e){
        let tempoText = document.querySelector(".tempo-nr");
        tempoText.innerText = e.target.value;
    }
    updateTempo(e){
        this.bpm = e.target.value;
        clearInterval(this.isPlaying);
        this.isPlaying = null;
        const playBtn = document.querySelector(".play");
        if(playBtn.classList.contains("active")){
            this.start();
        }
    }
    activateReset(){
        for(let pad of this.pads){
            pad.classList.remove("active");
        }
        this.playBtn.innerText = "Play";
        this.playBtn.classList.remove("active");
        clearInterval(this.isPlaying);
        this.isPlaying = null;
        
    }
}

const drumKit = new Drumkit();



//event listeners


drumKit.pads.forEach(pad => {
    pad.addEventListener("click", drumKit.activePad);
    pad.addEventListener("animationend", function(){
        this.style.animation = "";
    })
});

drumKit.playBtn.addEventListener("click", function(){
    drumKit.updateBtn();
    drumKit.start();
});

drumKit.selects.forEach(select =>{
    select.addEventListener("change", function(e){
        drumKit.changeSound(e);
    });
});

drumKit.muteBtns.forEach(btn=>{
    btn.addEventListener("click", function(e){
        drumKit.mute(e);
    })
})

drumKit.tempoSlider.addEventListener("input", function(e){
    drumKit.changeTempo(e);
});

drumKit.tempoSlider.addEventListener("change", function(e){
    drumKit.updateTempo(e);
});

drumKit.resetButton.addEventListener("click", function(){
    drumKit.activateReset();
})