/**
 * Grunt, The Javascript Task Runner
 */


"use strict";


exports = module.exports = function(grunt) {
    require("load-grunt-tasks")(grunt);

    grunt.initConfig({
        eslint: {
            src: ["Gruntfile.js", "index.js", "lib/**/*.js"],
            test: ["test/**/*.js"],
            examples: ["example/**/*.js"],
        },
        jsdoc: {
            docs: {
                src: ["lib/**/*.js", "index.js", "README.md", "package.json"],
                jsdoc: "./node_modules/.bin/jsdoc",
                options: {
                    destination: "docs",
                },
            },
        },
        mochaTest: {
            test: {
                options: {
                    reporter: "spec",
                    quiet: false,
                    clearRequireCache: false,
                },
                src: ["test/**/test.*.js"],
            },
        },
        watch: {
            docs: {
                files: ["**/*.js"],
                tasks: ["jsdoc:docs"],
                options: {
                    spawn: false,
                },
            },
        },
    });

    grunt.registerTask("lint", ["eslint"]);
    grunt.registerTask("unit", ["mochaTest"]);
    grunt.registerTask("test", ["lint", "unit"]);
    grunt.registerTask("docs", ["jsdoc"]);
};
