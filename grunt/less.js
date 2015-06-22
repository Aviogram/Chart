module.exports = function(grunt, options) {
    return {
        dist : {
            options : {
                banner : '<%= banner %>'
            },
            files : {
                '<%= dist %>/release/<%= pkg.name %>.css' : ['src/less/main.less']
            }
        },
        min : {
            options : {
                banner : '<%= banner %>',
                compress : true
            },
            files : {
                '<%= dist %>/release/<%= pkg.name %>.min.css' : ['src/less/main.less']
            }
        }
    };
};
