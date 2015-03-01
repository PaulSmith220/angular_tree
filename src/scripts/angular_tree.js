(function () {
    angular.module('treeGrid', ['ngSanitize'])
    .directive('treeGrid', [
        '$timeout', '$rootScope', function ($timeout, $rootScope) {
            return {
                restrict: 'E',
                template: '<div ng-include="getTemplate()"></div>',
                replace: true,
                scope: {
                    treeData: '=',
                    colDefs: '=',
                    template: '@'
                },
                link: function (scope, element, attrs) {
                    scope.testData = "Дерево данных";

                    /**
                     * Расширение для динамической подгрузки шаблона
                     * @returns {*|string} Шаблон
                     */
                    scope.getTemplate = function () {
                        return scope.template || "templates/treeTemplateBase.html";
                    };
                }
            }
        }]);

})();