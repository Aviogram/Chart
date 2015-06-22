(function() {
    'use strict';

    // Get the main module
    var module = angular.module('aviogram.highcharts');

    // Register a new factory
    module.factory('ChartApi', ChartApiFactory);

    // Inject the dependencies
    ChartApiFactory.$injector = ['$rootScope'];

    // The API
    function ChartApiFactory($rootScope) {
        var ChartApi = function ChartApi(Chart) {
            this.chart     = Chart;
            this.listeners = [];

            this.registerEvent('core', 'initComplete');

            this.registerEvent('series', 'new');
            this.registerEvent('series', 'removed');

            this.registerEvent('series', 'show');
            this.registerEvent('series', 'hide');
        };

        ChartApi.prototype.registerEvent = function(featureName, eventName) {
            var self = this,
                id   = [self.chart.id, featureName, eventName].join('');

            if (self[featureName] === undefined) {
                self[featureName] = {
                    on    : {},
                    raise : {}
                };
            }

            self[featureName].raise[eventName] = function() {
                $rootScope.$emit.apply($rootScope, [id].concat(Array.prototype.slice.call(arguments)));
            };

            self[featureName].on[eventName] = function(scope, handler, thisObject) {
                var deregisterListener = $rootScope.$on(id, function(event){
                        var args = Array.prototype.slice.call(arguments);

                        args.splice(0, 1);

                        handler.apply(thisObject || self.chart, args);
                    }),
                    listener = {
                        id         : id,
                        thisObject : thisObject,
                        scope      : scope,
                        handler    : handler,
                        deregister : deregisterListener
                    },
                    removeListener = function() {
                        listener.deregister();

                        self.listeners.splice(self.listeners.indexOf(listener), 1);
                    };

                self.listeners.push(listener);

                if (scope.$on) {
                    scope.$on("$destroy", function() {
                        removeListener();
                    });
                }

                return removeListener;
            };
        };

        return ChartApi;
    }
})();
