class Speaker {
    static speak(text) {

        let msg = new SpeechSynthesisUtterance();
        msg.voiceURI = 'native';
        msg.volume = 1;
        msg.rate = 0.6;
        msg.pitch = 1;

        msg.lang = 'en-US';
        msg.text = text;
        speechSynthesis.speak(msg);
    }
}