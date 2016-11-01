class Speaker{
    static speak(text){
        let msg = new SpeechSynthesisUtterance();
        msg.voice = speechSynthesis.getVoices().filter(function(voice) { return voice.name == "Google UK English Male"; })[0]; // Note: some voices don't support altering params
        msg.voiceURI = 'native';
        msg.volume = 1;
        msg.rate = 1; 
        msg.pitch = 1;
        
        msg.lang = 'en-US';
        msg.text = text;
        speechSynthesis.speak(msg);
    }
}