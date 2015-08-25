"use strict";
/**
 * Coverage statistic utilities
 * @exports utils/coverageStats
 * @param {bunyan} logger - A logger matching the bunyan API
 * @returns {Object} coverage statistics utility functions
 */
module.exports = function coverageStats(logger) {

  var exports = {

    /**
     * Helper function to append statistic properties from the provided collection to the provided package.json
     * @param {Object} collection - a collection of statistic properties
     * @param {Object} pkg - package.json object
     */
    "addStats": function addStats(collection, pkg) {
      var coverageType, stat;
      for (coverageType in collection) {
        if (collection.hasOwnProperty(coverageType)) {
          for (stat in collection[coverageType]) {
            if (collection[coverageType].hasOwnProperty(stat)) {
              collection[coverageType][stat] = collection[coverageType][stat] +
              pkg[coverageType][stat];
            }
          }
        }
      }
    },

    /**
     * Helper function to delete total, covered and skipped statistic properties from a collection
     * @param {Object} collection - a collection of statistic properties
     */
    "deleteStats": function deleteStats(collection) {
      var coverageType;
      for (coverageType in collection) {
        if (collection.hasOwnProperty(coverageType)) {
          if (collection[coverageType].hasOwnProperty("total")) {
            delete collection[coverageType].total;
          }
          if (collection[coverageType].hasOwnProperty("covered")) {
            delete collection[coverageType].covered;
          }
          if (collection[coverageType].hasOwnProperty("skipped")) {
            delete collection[coverageType].skipped;
          }
        }
      }
    },

    /**
     * Helper function to determine badge colour
     * @param {Object} collection - a collection of statistic properties
     * @param {Object} stat - a statistic from the collection to calculate the badge for
     * @param {Object} watermarks - the high and low watermarks for each statistic in collection
     */
    "badgeColour": function badgeColour(collection, stat, watermarks) {
      var watermarkType = stat === "overall" ? "lines" : stat;
      var low = watermarks[watermarkType][0];
      var high = watermarks[watermarkType][1];
      var mid = (high - low) / 2;
      var value = collection[stat].pct;
      if (value < low) {
        collection[stat].colour = "red";
      } else if (value < mid) {
        collection[stat].colour = "orange";
      } else if (value < high) {
        collection[stat].colour = "yellow";
      } else if (value < 100) {
        collection[stat].colour = "green";
      } else {
        collection[stat].colour = "brightgreen";
      }
    },

    /**
     * Calculate coverage stats from an istanbul coverage.json report
     * and append to provided package.json config.coverage.stats property.
     * The coverage stats include an overall coverage percentage and badge colour.
     * @param {Object} coverageReport - the istanbul generated coverage.json report object
     * @param {Object} packageJSON - the package.json object
     * @returns {Object} updated package.json object
     */
    "calculateCoverageStats": function calculateCoverageStats(coverageReport, packageJSON) {
      var coverageStat = {
        "lines": {"total": 0, "covered": 0, "skipped": 0},
        "branches": {"total": 0, "covered": 0, "skipped": 0},
        "statements": {"total": 0, "covered": 0, "skipped": 0},
        "functions": {"total": 0, "covered": 0, "skipped": 0},
        "skipped": {},
        "overall": {}
      };
      var coveredFile;
      var watermarks;

      if (coverageReport && packageJSON) {
        for (coveredFile in coverageReport) {
          if (coverageReport.hasOwnProperty(coveredFile)) {
            this.addStats(coverageStat, coverageReport[coveredFile]);
          }
        }
        //set skipped percentages
        coverageStat.lines.pctSkipped =
          Math.round(coverageStat.lines.skipped / coverageStat.lines.total * 100) || 0;
        coverageStat.branches.pctSkipped =
          Math.round(coverageStat.branches.skipped / coverageStat.branches.total * 100) || 0;
        coverageStat.statements.pctSkipped =
          Math.round(coverageStat.statements.skipped / coverageStat.statements.total * 100) || 0;
        coverageStat.functions.pctSkipped =
          Math.round(coverageStat.functions.skipped / coverageStat.functions.total * 100) || 0;

        coverageStat.skipped.pct = Math.round((coverageStat.lines.pctSkipped +
        coverageStat.branches.pctSkipped +
        coverageStat.statements.pctSkipped +
        coverageStat.functions.pctSkipped) / 400 * 100);

        //set overall percentages
        coverageStat.lines.pct =
          Math.round(coverageStat.lines.covered / coverageStat.lines.total * 100) || 100;
        coverageStat.branches.pct =
          Math.round(coverageStat.branches.covered / coverageStat.branches.total * 100) || 100;
        coverageStat.statements.pct =
          Math.round(coverageStat.statements.covered / coverageStat.statements.total * 100) || 100;
        coverageStat.functions.pct =
          Math.round(coverageStat.functions.covered / coverageStat.functions.total * 100) || 100;
        coverageStat.overall.pct =
          Math.round((coverageStat.lines.pct +
          coverageStat.branches.pct +
          coverageStat.statements.pct +
          coverageStat.functions.pct) / 400 * 100);

        //set watermark color for badge
        watermarks = packageJSON.config.coverage.watermarks;
        this.badgeColour(coverageStat, "lines", watermarks);
        this.badgeColour(coverageStat, "branches", watermarks);
        this.badgeColour(coverageStat, "statements", watermarks);
        this.badgeColour(coverageStat, "functions", watermarks);
        this.badgeColour(coverageStat, "overall", watermarks);

      } else {
        logger.warn("No valid coverage report or package json provided");
      }

      this.deleteStats(coverageStat);
      return coverageStat;
    }
  };

  return exports;
};
