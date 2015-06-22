(function(window) {
    'use strict';

    // Get main module
    var module = angular.module('aviogram.highcharts');

    // Register the Chart factory
    module.factory('Chart', ChartFactory);

    // Inject dependencies
    ChartFactory.$inject = ['ChartUtils', 'ChartApi', 'ChartOptions', 'ChartSerie', 'ChartTooltip'];

    // The factory
    function ChartFactory(ChartUtils, ChartApi, ChartOptions, ChartSerie, ChartTooltip) {
        var Chart = function Chart(element, options) {
            var self         = this,
                chartOptions = {};

            self.id      = ChartUtils.uid();
            self.api     = new ChartApi(self);
            self.options = ChartOptions.init(options);
            self.tooltip = new ChartTooltip(self);

            self.serieOptionsToSerie = new ChartUtils.hashMap();
            self.seriesLength        = 0;

            chartOptions = angular.extend(
                {},
                options.highcharts,
                {
                    chart : {
                        renderTo : element
                    },
                    tooltip : {
                        crosshairs : self.options.tooltip.crosshairs,
                        shared     : self.options.tooltip.shared,
                        useHTML    : true,
                        formatter  : function(Tooltip) {
                            return self.tooltip.formatter(Tooltip, this);
                        },
                        backgroundColor: null,
                        borderWidth: 0,
                        shadow: false,
                        style: {
                            padding: 0
                        }
                    }
                }
            );

            window.hc = self.chart = new window.Highcharts.Chart(chartOptions);
        };

        Chart.prototype.initComplete = function() {
            if (this.options.onRegisterApi) {
                this.options.onRegisterApi(this.api);
            }

            this.api.core.raise.initComplete();
        };


        Chart.prototype.setSeriesOptions = function(seriesOptions) {
            var self = this;

            seriesOptions.forEach(function(serieOptions) {
               var serie = self.serieOptionsToSerie.get(serieOptions);

                if (serie === undefined) {
                    serie = new ChartSerie(self);
                    self.serieOptionsToSerie.set(serieOptions, serie);
                }

                serie.setOptions(serieOptions);
            });
        };

        Chart.prototype.setSeriesData = function(seriesData) {
            var self = this;

            seriesData.forEach(function(serieData) {
               var serie = self.serieOptionsToSerie.get(serieData.serie);

                if (serie === undefined) {
                    serie = new ChartSerie(self);
                    serie.setOptions(serieData.serie);

                    self.serieOptionsToSerie.set(serieData.serie, serie);
                }

                serie.setData(serieData.data);
            });
        };

        Chart.prototype.destroy = function() {
            this.chart.destroy();
        };

        return Chart;
    }
})(window);
