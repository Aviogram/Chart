var shell  = require('shelljs');
var semver = require('semver');

var util  = module.exports = {
    getVersion: function() {
        // Try to get a tag for the current version
        var out = shell.exec('git tag -l --points-at HEAD', {silent:true});

        var version, tag;

        // If there's a tag on this commit, use it as the version
        if (out.code === 0 && out.output.trim() !== '' && out.output.trim() !== null) {
            version = out.output.trim();
            tag = version;
        }
        // ...otherwise, get the most recent stable tag
        else {
            var hash;

            // If there isn't one then just get the most recent tag, whatever it is
            version = shell.exec('git rev-list --tags --max-count=1 | xargs git describe', {silent:true}).output.trim();

            // Get the short commit hash from the current commit to append to the most recent tag
            hash = shell.exec('git rev-parse --short HEAD', {silent:true}).output.trim();

            version = version + '-' + hash;

            tag = version;
        }

        tag = semver.clean(tag);

        return tag;
    },

    getStableVersion: function() {
        var cmd = 'git log --date-order --graph --tags --simplify-by-decoration --pretty=format:\"%ai %h %d\"';
        // grunt.log.writeln(cmd);
        var out = shell.exec(cmd, {silent:true}).output;

        // grunt.log.writeln(lines);

        var lines = out.split('\n');
        for (var i in lines) {
            var l = lines[i];

            var match = l.match(/\(.*?tag: (.+?)(\)|,)/);
            if (! match || match.length < 2 || !match[1]) { continue; }
            var tag = match[1];

            var v = semver.clean(tag);

            if (!v.match(/-.+?$/)) {
                return v;
            }
        }
    }
};
