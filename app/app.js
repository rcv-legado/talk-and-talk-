var app = angular.module('myApp', ['ngMaterial']).config(function ($mdIconProvider, $mdThemingProvider) {
    $mdIconProvider
        .iconSet('social', 'img/icons/sets/social-icons.svg', 24)
        .defaultIconSet('img/icons/sets/core-icons.svg', 24);

    $mdThemingProvider.theme('default')
        .primaryPalette('deep-purple',{'default': '500'});

});