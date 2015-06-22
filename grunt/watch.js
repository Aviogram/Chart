module.exports = function(grunt, options) {
    return {
        gruntFile: {
            files: options.src.grunt,
            tasks: ['jshint:gruntfile', 'pre', 'post', 'build']
        },
        rebuild: {
            files: options.src.js,
            tasks: ['concat', 'uglify']
        },
        templates : {
            files : options.src.templates,
            tasks : ['ngtemplates', 'concat', 'uglify']
        },
        less : {
            files : options.src.less,
            tasks : ['concat:less', 'less']
        },
        livereload: {
            options: {livereload: false},
            files: ['dist/**/*']
        }
    };
};
