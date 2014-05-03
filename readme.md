## grunt-jsjsdoc

A Grunt task for running [jsjsdoc](http://github.com/coggle/jsjsdoc).

### Example Gruntfile.js
```js
module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jsjsdoc: {
      main: {
        files: {'docs/main.md': ['*.js']},
      }
    },
    watch: {
      main: {
        files: ['*.js'],
        tasks: ['jsjsdoc']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-jsjsdoc');

  grunt.registerTask('default', ['jsjsdoc', 'watch']);
  
};
```


