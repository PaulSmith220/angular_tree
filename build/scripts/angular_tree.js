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

                        /**
                         * Фильтр по полям
                         * @type {{}}
                         */
                        scope.filter = {};

                    }
                }
            }])
        .filter('treeGridFilter', function() {
            return function(input, filter)  {
                var plainData = [];

                /**
                 * Рекурсивная функция, выполняющая развертку дерева в плоский массив
                 * @param children
                 * @param parent
                 */
                function toPlain(children, parent) {
                    children.forEach(function(child) {
                        child.parent = parent;
                        plainData.push(child);
                        if (child.children && child.children.length > 0) {
                            toPlain(child.children, child);
                        }
                    });

                };

                // Т.к. корневые элементы не имеют предка, для удобства дальнейшего сворачивания, ставим его значение в false
                toPlain(input, false);

                var filtered = [];

                /**
                 * Проверяет вхождение значений фильтров в соответствующие поля элемента
                 * @param item
                 * @returns {boolean}
                 */
                function filterItem(item) {
                    var valid = true;
                    Object.keys(filter).forEach(function(key) {
                        if (item[key].toString().indexOf(filter[key]) == -1) {
                            valid = false;
                        }
                    });
                    return valid;
                }

                plainData
                    .filter(function(item) { // Выбираем только конечные элементы
                        item.visible = false;
                        return !item.children || item.children.length == 0;
                    })
                    .forEach(function(item) {
                        if (filterItem(item)) { // Если элемент проходит фильтр, добавляем его и рекурсивно его предков в список отфильтрованного
                            var i = item,
                                hasParent = true;
                            while(hasParent) {
                                    i.visible = true;
                                    hasParent = i = i.parent;
                                }
                            }
                    });



                return input;
            }
        });

})();