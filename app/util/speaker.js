class Speaker {
    static speak(msg) {
        

        speechSynthesis.speak(msg);

        return speechSynthesis;

    }
}