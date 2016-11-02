class Listener {
    static listen() {
        var recognition = new (webkitSpeechRecognition || mozSpeechRecognition || msSpeechRecognition)();
        recognition.lang = 'en-US';
        recognition.maxAlternatives = 4;
        recognition.start();

        return recognition;
    }
}