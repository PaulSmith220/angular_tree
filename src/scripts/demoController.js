//= ../../bower_components/angular/angular.js
//= ../../bower_components/angular-sanitize/angular-sanitize.js

angular.module("demoApp", ["treeGrid"])
.controller('demoController', [
        '$scope',
        '$rootScope',
        function($scope, $rootScope) {
            $scope.treeData = {};
            $scope.colDefs = [
                {
                    name: "Колонка 1"
                },
                {
                    name: "Колонка 2"
                }
            ];
        }
    ]);