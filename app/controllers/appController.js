app.controller('AppCtrl', function ($scope, $mdToast, $mdDialog) {

    speechSynthesis.onvoiceschanged = function () { };

    if (navigator.storage && navigator.storage.persist) {
        navigator.storage.persist().then(granted => {
            if (granted)
                console.log("Storage will not be cleared except by explicit user action");
            else
                console.warn("Storage may be cleared by the UA under storage pressure.");
        });
    }

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
        "Do you know where this hotel is?",
        "Didn't even last a minute"
    ];


    $scope.determinateValue = 0;
    const step = 100 / allPhases.length;

    $scope.appUnderstood = null;

    function initParameters() {

        $scope.error = false;
        $scope.appUnderstood = '';
        $scope.interimResult = '';
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
            fullscreen: $scope.customFullscreen
        })
            .then(function (answer) {

            }, function () {

            });
    }

    let speechSynthesisUtterance;
    function initSpeechSynthesisUtterance() {

        var voices = window.speechSynthesis.getVoices();
        speechSynthesisUtterance = new SpeechSynthesisUtterance();
        speechSynthesisUtterance.voiceURI = 'native';
        speechSynthesisUtterance.volume = 1;
        speechSynthesisUtterance.rate = 0.7;
        speechSynthesisUtterance.pitch = 1;

        speechSynthesisUtterance.lang = 'en-US';
    }
    initSpeechSynthesisUtterance();

    $scope.readPhase = function (currentPhase) {

        speechSynthesisUtterance.text = currentPhase;
        Speaker.speak(speechSynthesisUtterance);

        speechSynthesisUtterance.onstart = function(){
            console.log('Talking..');
        }

        speechSynthesisUtterance.onend = function(){
            console.log('Stop talking..');
        }
    }

    $scope.init = function () {

        var phaseIndex = Math.floor((Math.random() * allPhases.length) + 0);

        $scope.currentPhase = allPhases[phaseIndex];

        allPhases.splice(phaseIndex, 1);

        initParameters();

            $scope.readPhase($scope.currentPhase);
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


        var recognition = Listener.listen();

        recognition.start();

        $scope.listening = true;
        initParameters();

        recognition.onstart = function () {
            console.log('Listening...');
        };

        var two_line = /\n\n/g;
        var one_line = /\n/g;
        function linebreak(s) {
            return s.replace(two_line, '<p></p>').replace(one_line, '<br>');
        }


        recognition.onresult = function (event) {


            $scope.interimResult = '';
            $scope.$apply();

            var isFinalResult = event.results[0].isFinal;

            if (!isFinalResult) {

                for (var i = event.resultIndex; i < event.results.length; ++i) {
                    $scope.interimResult += event.results[i][0].transcript;
                }

                $scope.$apply();
                return;
            }

            $scope.listening = false;

            $scope.appUnderstood = event.results[0][0].transcript;
            $scope.interimResult = '';


            var similarity = Similarity.getSimilarity($scope.appUnderstood, $scope.currentPhase);

            if (isSimilar(similarity)) {
                recognition.stop();
                $scope.success = true;
                $scope.determinateValue += step;

                if ($scope.determinateValue >= 100) $scope.showSimpleToast('You did!');
            }
            else
                $scope.fail = true;

            recognition.stop();

            $scope.$apply();
        }

        recognition.onerror = function (error) {
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