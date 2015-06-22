module.exports = function(grunt, options) {
  return {
      options: {
          banner: '<%= banner %>',
          sourceMap : true,
          screwIE8  : true
      },
      concat: {
          src  : '<%= concat.dist.dest %>',
          dest : '<%= dist %>/release/<%= pkg.name %>.min.js'
      }
  };
};
