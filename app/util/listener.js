class Listener {
    static listen() {


        var recognition = new webkitSpeechRecognition();
        recognition.lang = 'en-US';
        recognition.interimResults = true;
         recognition.maxAlternatives = 4;
        recognition.continuous = true;


        return recognition;
    }
}