(function() {
    'use strict';

    // Get the main module
    var module = angular.module('aviogram.highcharts');

    // Create a new controller
    module.controller('ChartTooltipController', ChartTooltipController);

    // Define the dependencies
    ChartTooltipController.$inject = ['$scope', 'TooltipData', 'Tooltip'];

    // The controller
    function ChartTooltipController($scope, TooltipData, Tooltip) {
        $scope.points   = TooltipData.points;
        $scope.datetime = null;

        if ($scope.points[0].series.xAxis.options.type === 'datetime') {
            $scope.datetime = $scope.points[0].x;
        }
    }
})();
