module.exports = function(grunt, options) {
    return {
        'chart' : {
            src : options.src.templates,
            dest : '.tmp/template.js',
            options : {
                module : 'aviogram.highcharts',
                htmlmin : {
                    collapseWhitespace : true,
                    collapseBooleanAttributes : true
                },
                url : function(url) {
                    return url.match(/^(.*)\/templates\/(.+?).html$/)[2];
                }
            }
        }
    };
};
