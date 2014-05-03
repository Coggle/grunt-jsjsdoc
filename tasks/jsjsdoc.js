/*
 * grunt-jsjsdoc
 * https://github.com/coggle/grunt-jsjsdoc
 *
 * Copyright (c) 2014 Coggle
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {

  grunt.registerMultiTask('jsjsdoc', 'A grunt task for running jsjsdoc.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
    });
    var jsjsdoc = require('jsjsdoc');
    var async   = require('async');
    var done    = this.async();

    grunt.log.writeln('jsjsdoc on files:', this.files);

    // Iterate over all specified file groups.
    async.forEach(this.files, function(f, cb){
      var paths = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if(!grunt.file.exists(filepath)){
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        }else{
          return true;
        }
      });
      grunt.log.writeln("process:" + paths);
      jsjsdoc.process(paths, {output:undefined}, function(err, docs){
          grunt.log.writeln("got docs:" + docs);
          grunt.log.writeln("for dest:" + f.dest);
          grunt.file.write(f.dest, docs);
          grunt.log.writeln('Documentation "' + f.dest + '" created.');
          cb(err);
      });
    }, function(err){
        if(err)
            throw err;
        done();
    });
  });
};

