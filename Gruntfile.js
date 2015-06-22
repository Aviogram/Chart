module.exports = function(grunt) {
    var path = require('path');
    var util = require('./lib/grunt/utils.js');

    require('load-grunt-config')(grunt, {
        configPath    : path.join(process.cwd(), 'grunt'),
        init          : true,
        data          : {
            pkg           : grunt.file.readJSON('package.json'),
            src           : {
                grunt     : ['Gruntfile.js', 'grunt/*.js'],
                js        : ['src/js/core/bootstrap.js', 'src/js/**/*.js', '.tmp/template.js'],
                templates : ['src/templates/**/*.html'],
                less      : ['src/less/**/*.less']
            },
            version       : util.getVersion(),
            stableVersion : util.getStableVersion(),
            dist          : 'dist',
            site          : '127.0.0.1',
            banner        : '/*!\n' +
                ' * <%= pkg.title || pkg.name %> - v<%= version %> - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
                '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
                ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
                ' License: <%= pkg.license %> \n */\n\n'
        }
    });
};
