(function() {
    'use strict';

    // Get global module
    var module   = angular.module('aviogram.highcharts'),
        defaults = {
            onRegisterApi     : angular.noop(),
            options           : {},
            tooltip : {
                controller : 'ChartTooltipController',
                resolves   : {},
                templateUrl : 'chart/tooltip',
                shared     : false,
                crosshairs : false
            }
        };

    // Create a new factory instance
    module.factory('ChartOptions', ChartOptionsFactory);

    ChartOptionsFactory.$injector = [];

    // The factory
    function ChartOptionsFactory() {
        return {
            init : function(options) {
                return angular.merge({}, defaults, options);
            }
        };
    }
})();
