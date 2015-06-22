module.exports = {
    'pre'  : ['clean'],
    'post' : ['build'],
    'build' : ['ngtemplates', 'concat', 'uglify', 'less'],
    'dev'  : ['pre', 'post', 'watch']
};
