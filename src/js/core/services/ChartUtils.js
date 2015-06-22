(function() {
    'use strict';

    // Fetch module instance
    var module = angular.module('aviogram.highcharts');

    // Create the new service
    module.service('ChartUtils', ChartUtilsService);

    // Inject dependencies
    ChartUtilsService.$injector = [];

    // The Service
    function ChartUtilsService() {
        var uid       = ['0', '0', '0'],
            uidPrefix = 'highcharts-',
            service = {
            hash : function(key) {
                var type = typeof key,
                    hash = null;

                if (key === null || type !== 'object') {
                    hash = key;
                } else if (key.$$hashKey !== undefined) {
                    hash = (typeof key.$$hashKey === 'function') ? key.$$hashKey() : key.$$hashKey;
                } else {
                    hash = key.$$hashKey = service.uid();
                }

                return type + ':' + hash;
            },
            uid : function() {
                var index = uid.length;
                var digit;

                while (index) {
                    index--;
                    digit = uid[index].charCodeAt(0);
                    if (digit === 57 /*'9'*/) {
                        uid[index] = 'A';
                        return uidPrefix + uid.join('');
                    }
                    if (digit === 90  /*'Z'*/) {
                        uid[index] = '0';
                    } else {
                        uid[index] = String.fromCharCode(digit + 1);
                        return uidPrefix + uid.join('');
                    }
                }
                uid.unshift('0');

                return uidPrefix + uid.join('');
            },
            hashMap : function() {}
        };

        service.hashMap.prototype.get = function(key) {
            return this[service.hash(key)];
        };

        service.hashMap.prototype.set = function(key, value) {
            this[service.hash(key)] = value;
        };

        service.hashMap.prototype.remove = function(key) {
            var value = this[service.hash(key)];

            delete this[service.hash(key)];

            return value;
        };

        return service;
    }
})();
