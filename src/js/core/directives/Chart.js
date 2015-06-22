(function() {
    'use strict';

    // Get the main module
    var module = angular.module('aviogram.highcharts');

    // Register the Chart controller
    module.controller('ChartController', ChartController);

    // Register the Chart directive
    module.directive('chart', ChartDirective);

    // Chart Directive
    function ChartDirective() {
        return {
            restrict : 'E',
            scope : {
                options : '='
            },
            controller : 'ChartController'
        }
    }

    // Dependency injector
    ChartController.$inject = ['$scope', '$element', 'Chart'];

    // The controller
    function ChartController($scope, $element, Chart) {
        var self = this;

        // Create new Chart object
        self.chart = new Chart($element[0], $scope.options);

        // Set the Application scope
        self.chart.applicationScope = $scope.$parent;

        // Watch for serie changes or for data changes
        $scope.$parent.$watch(function() { return $scope.options.series; }, seriesWatchFunction, true);
        $scope.$parent.$watchCollection(function() { return $scope.options.data}, dataWatchFunction);
        $scope.$parent.$watch(function() {
            var lengths = [];

            $scope.options.data.forEach(function(serie) {
                lengths.push(serie.length);
            });

            return lengths.join('');
        }, dataWatchFunction);

        $scope.$on("$destroy", function() {
            self.chart.destroy();
        });

        function seriesWatchFunction (serieOptions) {
            if (!serieOptions) {
                return;
            }

            self.chart.setSeriesOptions(serieOptions);
        }

        function dataWatchFunction() {
            if (!$scope.options.data) {
                return;
            }

            var input = [];

            $scope.options.data.forEach(function(data, index) {
                input.push({
                    serie : $scope.options.series[index],
                    data  : data
                });
            });

            self.chart.setSeriesData(input);
        }

        self.chart.initComplete();
    }
})();
