(function() {
    'use strict';

    // Get the main module
    var module = angular.module('aviogram.highcharts');

    // Register a new factory
    module.factory('ChartTooltip', ChartTooltipFactory);

    // Dependency injector
    ChartTooltipFactory.$injector = ['$rootScope', '$controller', '$compile', '$injector', '$q', '$templateRequest', '$timeout'];

    // The Factory
    function ChartTooltipFactory($rootScope, $controller, $compile, $injector, $q, $templateRequest, $timeout) {
        var ChartTooltip = function ChartTooltip(Chart) {
            var self = this;

            self.chart       = Chart;
            self.tooltipData = {};
            self.tooltip     = null;
            self.options     = Chart.options.tooltip;
        };

        ChartTooltip.prototype.formatter = function(Tooltip, TooltipData) {
            var self  = this;

            this.tooltipData = {
                points : TooltipData.points || [TooltipData.point]
            };

            this.tooltip = Tooltip;

            var defer           = $q.defer(),
                options         = self.options,
                resolveList     = [
                    options.template ? $q.when(options.template) :
                        ($templateRequest(typeof options.templateUrl === 'function' ? (options.templateUrl)() : options.templateUrl))
                ];

            if (options.controller) {
                angular.forEach(options.resolves, function (value) {
                    resolveList.push($q.when($injector.invoke(value)));
                });
            }

            $q.all(resolveList).then(
                function(results) {
                    var tooltipScope    = $rootScope.$new(),
                        injectionLocals = {},
                        i               = 1,
                        element         = angular.element(
                            self.chart.chart.container.querySelector('div.highcharts-tooltip > span')
                        );

                    element.html(results[0]);

                    if (options.controller) {
                        injectionLocals.$scope = tooltipScope;

                        angular.forEach(options.resolves, function (value, key) {
                            injectionLocals[key] = results[i];
                            i++;
                        });

                        injectionLocals.Tooltip     = self.tooltip;
                        injectionLocals.TooltipData = self.tooltipData;

                        $controller(options.controller, injectionLocals);
                    }

                    $compile(element)(tooltipScope);
                }
            );

            return '';
        };

        return ChartTooltip;
    }
})();
