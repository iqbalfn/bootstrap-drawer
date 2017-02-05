module.exports = function(grunt) {
    
    grunt.initConfig({
        less: {
            default: {
                files: {
                    'dist/css/bootstrap-drawer.css': 'src/less/standalone.less'
                }
            },
            dist: {
                files: {
                    'dist/css/bootstrap-drawer.min.css': 'src/less/standalone.less'
                },
                options: {
                    compress: true
                }
            }
        },
        
        watch: {
            files: ['src/js/*.js', 'src/less/*.less'],
            tasks: ['less:default']
        },
        
        uglify: {
            dist: {
                files: {
                    'dist/js/bootstrap-drawer.min.js': 'src/js/drawer.js'
                },
                options: {
                    compress: true,
                    report: 'gzip',
                    preserveComments: false
                }
            }
        }
    });
    
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    
    grunt.registerTask('dist', [
        'less:default',
        'less:dist',
        'uglify:dist'
    ]);
}