"use strict";
/**
 * A module to add gulp tasks which run test steps.
 * @exports tasks/testTasks
 * @param {Gulp} gulp - The gulp module
 * @param {Object} context - An object containing the following properties:
 * @param {String} context.cwd - The current working directory
 * @param {Object} context.package - The package.json for the module
 * @param {Array} context.argv - The arguments past to the gulp task
 * @param {bunyan} context.logger - A logger matching the bunyan API
 */
module.exports = function testTasks(gulp, context) {
  var mocha = require("gulp-mocha");
  var mkdirp = require("mkdirp");
  var istanbul = require("gulp-istanbul-custom-reports");
  var glob = require("glob");
  var path = require("path");
  var _ = require("underscore");
  var logger = context.logger;

  var handleError = function handleError(err) {
    logger.error(err.toString());
    this.emit("end"); //jshint ignore:line
  };

  var test = function test(reporter) {
    var cwd = context.cwd;
    var pkg = context.package;
    var directories = pkg.directories;
    var sourceGlobStr = directories.lib + "/**/*.js";
    var scriptPath;
    //require all library scripts to ensure istanbul picks up
    _.each(glob.sync(sourceGlobStr), function eachSourceGlobStrFN(value) {
      scriptPath = path.resolve(process.cwd(), value);
      try {
        require(scriptPath); // Make sure all files are loaded to get accurate coverage data
        logger.info("Loaded: " + scriptPath);
      } catch (err) {
        logger.warn("Could not load: " + scriptPath);
      }
    });

    //set YADDA_FEATURE_GLOB if argv[2]
    if (context.argv.length === 2) {
      process.env.YADDA_FEATURE_GLOB = context.argv[1];
      logger.info("Set process.env.YADDA_FEATURE_GLOB=" + process.env.YADDA_FEATURE_GLOB);
    }

    return gulp.src(directories.test + "/test.js")
      .pipe(mocha({
        "reporter": reporter,
        "timeout": 500000
      }))
      .on("error", handleError)
      .pipe(istanbul.writeReports({
        "reporters": ["html", "clover-limits", "json-summary"],
        "reportOpts": {
          "dir": cwd + "/" + directories.reports + "/code-coverage",
          "watermarks": pkg.config.coverage.watermarks
        }
      }));
  };

  istanbul.registerReport(require("istanbul-reporter-clover-limits"));

  /**
   * A gulp build task to instrument files.
   * Istanbul will override the node require() function to redirect to the instrumented files.
   * @member {Gulp} instrument
   * @return {through2} stream
   */
  gulp.task("instrument", function instrumentTask() {
    var pkg = context.package;
    var directories = pkg.directories;
    var sourceGlobStr = directories.lib + "/**/*.js";
    /**
     * Istanbul code coverage will not work if there are tasks containing local references.
     * For example, var x = require("../../lib/index");
     * Note: that if gulpfile.js contains `gulp.loadTasks(__dirname);` then all tasks will be loaded
     * in gulp modules and the tasks directory.
     * Make sure all these tasks do not require local references as defined above.
     */
    return gulp.src(sourceGlobStr)
      .pipe(istanbul()); // Covering files - note: finish event called when finished (not end event)
  });

  /**
   * A gulp build task to run test steps and calculate test coverage.
   * Test steps results will be output using mocha-bamboo-reporter-bgo reporter.
   * This task executes the Instrument task as a prerequisite.
   * @member {Gulp} test_cover
   * @return {through2} stream
   */
  gulp.task("test_cover", ["instrument"], function testCoverTask() {
    var cwd = context.cwd;
    var pkg = context.package;
    var directories = pkg.directories;

    //results file path for mocha-bamboo-reporter-bgo
    process.env.MOCHA_FILE = path.join(cwd, directories.reports, "unit-mocha-tests.json");
    //make sure the Reports directory exists - required for mocha-bamboo-reporter-bgo
    mkdirp.sync(path.join(cwd, directories.reports));
    return test("mocha-bamboo-reporter-bgo");
  });

  /**
   * A gulp build task to run test steps and calculate test coverage.
   * Test steps results will be output using spec reporter.
   * @member {Gulp} test
   * @return {through2} stream
   */
  gulp.task("test", function testTask() {
    return test("spec");
  });

};
