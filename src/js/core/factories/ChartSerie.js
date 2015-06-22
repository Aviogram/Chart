(function() {
    'use strict';

    // Get the main module
    var module = angular.module('aviogram.highcharts');

    // Register a new factory
    module.factory('ChartSerie', ChartSerieFactory);

    // Dependency injector
    ChartSerieFactory.$injector = ['ChartUtils'];

    // The Factory
    function ChartSerieFactory(ChartUtils) {
        var ChartSerie = function ChartSerie(Chart) {
            this.chart      = Chart;
            this.options    = null;
            this.chartSerie = null;
            this.data       = [];
        };

        ChartSerie.prototype.setData = function(data) {
            this.data = data;

            if (this.chartSerie === null) {
                this.chartSerie = this.chart.addSeries(createSerie.call(this, {}, data));
            }

            this.chartSerie.setData(data);
        };

        ChartSerie.prototype.setOptions = function(options) {
            this.options = options;

            if (this.chartSerie === null) {
                this.chartSerie = this.chart.chart.addSeries(createSerie.call(this, options, []));
            } else {
                this.chartSerie.update(this.options);
            }
        };

        function createSerie(options, data) {
            var self  = this,
                serie = angular.merge({}, options);

            serie.data   = data;
            serie.events = {
                show : function() {
                    self.chart.api.series.raise.show({options : this.options, data : this.data});
                },
                hide : function() {
                    self.chart.api.series.raise.hide({options : this.options, data : this.data});
                }
            };

            return serie;
        }

        return ChartSerie;
    }
})();
