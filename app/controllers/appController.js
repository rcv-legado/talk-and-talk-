app.controller('AppCtrl', function ($scope, $mdToast, $mdDialog) {

    let allPhases = ["What airline am I flying?",
        "Where is the restroom?",
        "How much does the magazine cost?",
        "May I purchase headphones?",
        "How do I access the Internet?",
        "Where can I find a restaurant?",
        "I have lost my passport.",
        "Someone stole my money.",
        "Where is the hospital?",
        "Where can I find a grocery store?",
        "My room is messy, and I would like it cleaned.",
        "I would like two double beds, please.",
        "How many beds are in the room?",
        "Do you know where this hotel is?"
    ];

    speechSynthesis.onvoiceschanged = function () { };

    $scope.determinateValue = 0;
    const step = 100 / allPhases.length;

    function initParameters() {

        $scope.error = false;
        $scope.understood = '';
        $scope.fail = false;
        $scope.success = false;
    }

    $scope.showAllPhasesDialog = function (ev) {
        $mdDialog.show({
            controller: DialogController,
            templateUrl: 'dialogAllPhasesDialog.tmpl.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        })
            .then(function (answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function () {
                $scope.status = 'You cancelled the dialog.';
            });
    }

    $scope.readPhase = function (currentPhase) {
        Speaker.speak(currentPhase);
    }

    $scope.init = function () {

        var phaseIndex = Math.floor((Math.random() * allPhases.length) + 0);

        $scope.currentPhase = allPhases[phaseIndex];

        allPhases.splice(phaseIndex, 1);

        initParameters();
    }

    $scope.init();

    $scope.showSimpleToast = function (msg) {

        $mdToast.show(
            $mdToast.simple()
                .textContent(msg)
                .hideDelay(4000)
        );
    };

    $scope.startRecognition = function (event, currentPhase) {

        $scope.listening = true;
        initParameters();

        var recognition = Listener.listen();

        recognition.onresult = (event) => {
            $scope.listening = false;
            $scope.understood = event.results[0][0].transcript;

            var similarity = Similarity.getSimilarity($scope.understood, $scope.currentPhase);

            if (isSimilar(similarity)) {
                $scope.success = true;
                $scope.determinateValue += step;

                if ($scope.determinateValue >= 100) $scope.showSimpleToast('You did!');
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


    function DialogController($scope, $mdDialog) {
        $scope.hide = function () {
            $mdDialog.hide();
        };

        $scope.cancel = function () {
            $mdDialog.cancel();
        };

        $scope.answer = function (answer) {
            $mdDialog.hide(answer);
        };
    }

});