app.controller('AppCtrl', function ($scope, $mdToast) {

    let allPhases = ["What airline am I flying?", 
    "Where is the restroom?", 
    "How much does the magazine cost?", 
    "May I purchase headphones?",
    "How do I access the Internet?"
    ];

    $scope.determinateValue = 0;
    const step = 100/allPhases.length;

    function initParameters() {
        
        $scope.error = false;
        $scope.understood = '';
        $scope.fail = false;
        $scope.success = false;
    }

    $scope.init = function () {

        var phaseIndex = Math.floor((Math.random() * allPhases.length) + 0);

        $scope.currentPhase = allPhases[phaseIndex];

        allPhases.splice(phaseIndex, 1);

        initParameters();
    }

    $scope.init();

    $scope.showSimpleToast = function(msg) {
    
    $mdToast.show(
      $mdToast.simple()
        .textContent(msg)
        .hideDelay(4000)
    );
  };

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

            if (isSimilar(similarity)){
                $scope.success = true;
                $scope.determinateValue += step;

                if($scope.determinateValue >= 100) $scope.showSimpleToast('You did!');
            }
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