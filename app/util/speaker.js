class Speaker {
    static speak(text) {

        window.speechSynthesis.onvoiceschanged = function () {

            var voices = window.speechSynthesis.getVoices();

            let msg = new SpeechSynthesisUtterance();
            msg.voiceURI = 'native';
            msg.voice = voices[4];
            msg.volume = 1;
            msg.rate = 0.9;
            msg.pitch = 1;

            msg.lang = 'en-US';
            msg.text = text;
            speechSynthesis.speak(msg);

            return;
        }
    }
}