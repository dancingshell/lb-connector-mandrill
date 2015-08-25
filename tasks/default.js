"use strict";

/**
 * A module to add a gulp task which executes the default task.
 * @exports tasks/defaultTasks
 * @param {Gulp} gulp - The gulp module
 */
module.exports = function defaultTasks(gulp) {
  var runSequence = require("run-sequence");

  /**
   * A gulp build task to run the default tasks.
   * The following tasks are executed in sequence: ["test"]
   * The sequence works by piping each task to the next.
   * @member {Gulp} default
   * @param {Function} cb - callback
   */
  gulp.task("default", function defaultTask(cb) {
    runSequence(
      "code_analysis",
      "test_cover",
      "coverage_stats",
      cb);
  });
};
