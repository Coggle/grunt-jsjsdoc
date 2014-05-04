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
      jsjsdoc.process(paths, {output:undefined}, function(err, docs){
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

