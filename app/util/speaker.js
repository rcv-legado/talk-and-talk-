class Speaker {
    static speak(text) {
        var voices = window.speechSynthesis.getVoices();

        let msg = new SpeechSynthesisUtterance();
        msg.voiceURI = 'native';
        msg.voice = voices[4];
        msg.volume = 1;
        msg.rate = 0.9;
        msg.pitch = 1;

        msg.lang = 'en-UK';
        msg.text = text;
        speechSynthesis.speak(msg);

        return;

    }
}