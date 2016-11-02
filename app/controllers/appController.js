app.controller('AppCtrl', function ($scope) {

    $scope.determinateValue = 0;

    let allPhases = ["What airline am I flying?", "Where is the restroom?", "How much does the magazine cost?", "May I purchase headphones?"];

    function initParameters() {
        
        $scope.error = false;
        $scope.understood = '';
        $scope.fail = false;
        $scope.success = false;
    }

    $scope.init = function () {
        $scope.currentPhase = allPhases[Math.floor((Math.random() * allPhases.length) + 0)];
        initParameters();
    }

    $scope.init();

    $scope.readPhase = function (currentPhase) {
        Speaker.speak(currentPhase);
    }

    $scope.startRecognition = function (event, currentPhase) {
        
        $scope.listening = true;
        initParameters();

        var recognition = Listener.listen();

        recognition.onresult = (event) => {
            $scope.listening = false;
            $scope.understood = event.results[0][0].transcript;

            var similarity = Similarity.getSimilarity($scope.understood, $scope.currentPhase);

            if (isSimilar(similarity))
                $scope.success = true;
            else
                $scope.fail = true;
        }

        recognition.onerror = (error) => {
            $scope.listening = false;
            $scope.error = true;
        };

    }

    function isSimilar(similarity) {
        if (similarity >= 0.9)
            return true;

        return false;
    }
});