module.exports = function(grunt) {
    // 配置
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        cssmin: {
            compress: {
                options: {
                    banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
                },
                files: {
                    'dist/<%= pkg.name %>.min.css': ['public/css/*.css']
                }
            }
        },
        uglify: {
            options: {
                //生成一个banner注释并插入到输出文件的顶部
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            build: {
                files: {
                    'dist/<%= pkg.name %>.min.js': 'public/**/*.js',
                }
            }
        }
        
    });
    // grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    // grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    // grunt.loadNpmTasks('grunt-contrib-sass');
    // grunt.loadNpmTasks('grunt-contrib-watch');
    // grunt.loadNpmTasks('grunt-contrib-less');
    //  grunt.loadNpmTasks('grunt-contrib-watch');
    //下面这个在命令行可以通过`grunt test`来运行执行jshint和qunit任务
    // grunt.registerTask('test', ['jshint', 'qunit']);
    grunt.registerTask('default', ['cssmin', 'uglify']);
};