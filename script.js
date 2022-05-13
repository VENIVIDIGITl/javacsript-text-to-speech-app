const main = document.getElementById('main');
const voicesSelect = document.getElementById('voices');
const textarea = document.getElementById('text');
const readBtn = document.getElementById('read');
const pauseToggleBtn = document.getElementById('pause-toggle');


// Init speech synth
const textToSpeechMessage = new SpeechSynthesisUtterance();

// Store voices
let voices = [];

let isSpeaking = false;


function populateVoiceList() {
  // Get Web Speech API's speechSyntesis voice options
  voices = speechSynthesis.getVoices();
  // Create option elements for select input and insert into DOM
  voices.forEach(voice => {
    const option = document.createElement('option');
    option.value = voice.name;
    option.textContent = `${voice.name} - ${voice.lang}`;
    voicesSelect.appendChild(option);
  });
}


// Set voice
function selectVoice(event) {
  textToSpeechMessage.voice = voices.find(voice => voice.name === event.target.value);
}


// Speak textarea text
function speakText() {
  textToSpeechMessage.text = textarea.value;
  speechSynthesis.speak(textToSpeechMessage);
  isSpeaking = true;
}


// Toggle between Pause/Resume text to speech
function togglePause() {
  if (isSpeaking) {
    speechSynthesis.pause();
    pauseToggleBtn.textContent = 'Resume';
    isSpeaking = false;
  } else {
    speechSynthesis.resume();
    pauseToggleBtn.textContent = 'Pause';
    isSpeaking = true;
  }
}

// Event Listeners
speechSynthesis.addEventListener('voiceschanged', populateVoiceList);
voicesSelect.addEventListener('change', selectVoice);
readBtn.addEventListener('click', speakText);
pauseToggleBtn.addEventListener('click', togglePause);

// On Page load
populateVoiceList();
