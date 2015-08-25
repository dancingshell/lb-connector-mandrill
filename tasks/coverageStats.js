"use strict";

/**
 * A module to add a gulp task which calculates coverage stats from the Istanbul reporter json-summary.
 * @exports tasks/coverageStatsTasks
 * @param {Gulp} gulp - The gulp module
 * @param {Object} context - An object containing the following properties:
 * @param {String} context.cwd - The current working directory
 * @param {json} context.package - The package.json for the module
 * @param {Array} context.argv - The arguments past to the gulp task
 * @param {bunyan} context.logger - A logger matching the bunyan API
 */
module.exports = function coverageStatsTasks(gulp, context) {
  var jeditor = require("gulp-json-editor");
  var gutil = require("gulp-util");
  var logger = context.logger;
  var fs = require("fs");
  var coverageStatsUtils = require("./lib/coverageStats")(logger);

  /**
   * A gulp build task to calculate coverage stats from the Istanbul reporter json-summary.
   * Coverage stats are appended to package.json config.coverage.stats property.
   * The coverage stats include an overall coverage percentage and badge colour.
   * @member {Gulp} coverage_stats
   * @return {through2} stream
   */
  gulp.task("coverage_stats", function coverageStatsTask() {
    return gulp.src(["package.json"])
      .pipe(jeditor(function jeditorStream(packageJSON) {
        var coveragePath = process.cwd() + "/Reports/code-coverage/coverage-summary.json";
        var coverageReport = {}, coverageStats;
        if (fs.existsSync(coveragePath)){
          coverageReport = JSON.parse(fs.readFileSync(coveragePath));
        }
        if (packageJSON.config.hasOwnProperty("coverage")) {
          coverageStats = coverageStatsUtils.calculateCoverageStats(coverageReport, packageJSON);
          packageJSON.config.coverage.stats = coverageStats;
          if (coverageStats.overall.colour === "red") {
            throw new gutil.PluginError({
              "plugin": "coverage_stats",
              "message": "Code coverage below error threshold"
            });
          }
        }
        //update context.package used by subsequent tasks
        context.package = packageJSON;
        return packageJSON;
      }))
      .pipe(gulp.dest(""));
  });
};
