module.exports = function(grunt, options) {
  return {
      options: {
          banner: '<%= banner %>',
          stripBanners: true
      },
      dist: {
          src: options.src.js,
          dest : '<%= dist %>/release/<%= pkg.name %>.js'
      },
      less : {
          options : {
              process : function(src) {
                  return src.replace(/\@import\s*.+?;/g, '');
              }
          },
          src  : options.src.less,
          dest : '<%= dist %>/release/<%= pkg.name %>.less'
      }
  };
};
