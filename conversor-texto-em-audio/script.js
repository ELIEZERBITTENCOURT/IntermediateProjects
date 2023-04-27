let textarea = document.querySelector('#textarea');
let voices = document.querySelector('#voices');
let button = document.querySelector('#button');
let selectedVoice = 0;

window.speechSynthesis.addEventListener('voiceschanged', () => {
    let voicesList = window.speechSynthesis.getVoices();
    for(let i in voicesList) {
        let optionE1 = document.createElement('option');
        optionE1.setAttribute('value', i);
        optionE1.innerText = voicesList[i].name;
        voices.appendChild(optionE1);
    }
});

button.addEventListener('click', () => {
    if(textarea.value !== ''){
        let voicesList = window.speechSynthesis.getVoices();
        let ut = new SpeechSynthesisUtterance(textarea.value);
        ut.voices = voicesList[selectedVoice];
        window.speechSynthesis.speak(ut);
    }
});

voices.addEventListener('change', () => {
    selectedVoice = parseInt(voices.value);
});

function updateStatus() {
    if(window.speechSynthesis.speaking){
        voices.setAttribute('disabled','disabled');
        button.setAttribute('disabled', 'disabled');
    }else{
        voices.removeAttribute('disabled');
        button.removeAttribute('disabled');
    }
}
setInterval(updateStatus, 100);