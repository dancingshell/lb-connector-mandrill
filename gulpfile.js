"use strict";

var cwd = process.cwd();

/**
 * Setup logger
 */
var bunyanFormat = require("bunyan-format");
var formatOut = bunyanFormat({"outputMode": "short"});
var logger = require("bunyan").createLogger({"name": "GULP", "stream": formatOut});

/**
 * Get gulp
 */
var gulp = require("gulp");

/**
 * Setup context object to be passed to gulp tasks
 * @namespace
 * @property {String} cwd  - The current working directory
 * @property {JSON} package  - The package.json for the module
 * @property {Array} argv - The arguments past to the gulp task
 * @property {bunyan} logger - A logger matching the bunyan API
 */
var context = {
  "argv": [],
  "cwd": cwd,
  "logger": logger,
  "package": require(cwd + "/package.json")
};

/**
 * Get gulp-load-params and provide modulePrefix to load tasks that start with `gulp-tasks` in package.json
 * @type {"gulp-load-params"}
 */
require("gulp-load-params")(gulp, {"modulePrefix": "gulp-tasks"});
gulp.loadTasks(cwd, context);
