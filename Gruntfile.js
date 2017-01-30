module.exports = function(grunt) {
    
    grunt.initConfig({
        concat: {
            bs: {
                src: [
                    'bootstrap/js/transition.js',
                    'bootstrap/js/alert.js',
                    'bootstrap/js/button.js',
                    'bootstrap/js/carousel.js',
                    'bootstrap/js/collapse.js',
                    'bootstrap/js/dropdown.js',
                    'bootstrap/js/modal.js',
                    'bootstrap/js/tooltip.js',
                    'bootstrap/js/popover.js',
                    'bootstrap/js/scrollspy.js',
                    'bootstrap/js/tab.js',
                    'bootstrap/js/affix.js',
                    'src/js/drawer.js'
                ],
                dest: 'bootstrap/javascript/bootstrap.js'
            }
        },
        
        less: {
            bs: {
                files: {
                    'bootstrap/css/bootstrap.css': 'bootstrap/less/bootstrap.less'
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
            tasks: ['concat:bs', 'less:bs']
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
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    
    grunt.registerTask('dist', [
        'less:dist',
        'uglify:dist'
    ]);
}