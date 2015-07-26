/**
 * Created by Simone on 28/04/15.
 */
module.exports = function(grunt) {
    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-prova');

    // Project configuration.
    grunt.initConfig({
        prova: {
            task1 : {
                options : {
                    variable : true
                }
            }
        }
    });

    // Default task(s).
    grunt.registerTask('default', ['prova']);

};