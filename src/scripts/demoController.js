//= ../../bower_components/angular/angular.js
//= ../../bower_components/angular-sanitize/angular-sanitize.js

angular.module("demoApp", ["treeGrid"])
.controller('demoController', [
        '$scope',
        '$rootScope',
        function($scope, $rootScope) {
            $scope.treeData = [{
                name: "Челябинская область",
                children: [{
                    name: "Челябинск",
                    amount: 1169432,
                    children: [{
                        name: "Курча́товский",
                        amount: 181500
                    }, {
                        name: "Тракторозаво́дский",
                        amount: 256000
                    }]
                }, {
                    name: "Магнитогорск",
                    amount: 414897,
                    children: []
                }, {
                    name: "Златоуст",
                    amount: 170920,
                    children: []
                }]
            }, {
                name: "Свердловская область",
                children: [{
                    name: "Екатеринбург",
                    amount: 1412346,
                    children: []
                }, {
                    name: "Каменск-Уральский",
                    amount: 171483,
                    children: []
                }]
            }];



            $scope.colDefs = [
                {
                    name: "name",
                    displayName: "Город",
                    width: 200,
                    filterable: true
                },
                {
                    name: "amount",
                    displayName: "Население на 2014г.",
                    width: 200,
                    type: "number"
                }
            ];
        }
    ]);