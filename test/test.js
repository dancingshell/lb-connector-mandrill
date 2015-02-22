"use strict";

var path = require("path");
var _ = require("underscore");
var glob = require("glob");
var Yadda = require("yadda");

//setup paths
var cwd = process.cwd();
var directories = require(cwd + "/package.json").directories;
var testFeatures = cwd + path.sep + directories.test + path.sep;
var tstGlob = [];

//setup logger
var bunyanFormat = require("bunyan-format");
var formatOut = bunyanFormat({"outputMode": "short"});
var logger = require("bunyan").createLogger({"name": "TEST", "stream": formatOut});

//setup test 'world' context object and logger
//Note: world.before and world.after are reserved for adding before and after functions
var worldContext = {"world": {"logger": logger}};

//execute all unit test feature files
if (directories.hasOwnProperty("testFeatures")) {
  testFeatures = cwd + path.sep + directories.testFeatures + path.sep;
}
if (process.env.hasOwnProperty("YADDA_FEATURE_GLOB")) {
  tstGlob = glob.sync(testFeatures + "**/*" + process.env.YADDA_FEATURE_GLOB + "*");
  tstGlob = _.map(tstGlob, function mapTstGlob(dir) {
    return dir.replace(/\//g, "\\");
  });
}


Yadda.plugins.mocha.StepLevelPlugin.init();
new Yadda.FeatureFileSearch([testFeatures]).each(function eachFeatureFile(file) {
  var featureLibraryPath, featureLibraryDefault;
  //if YADDA_FEATURE_GLOB exists then check if featureFile in YADDA_FEATURE_GLOB
  if (tstGlob.length === 0 || _.contains(tstGlob, file)) {
    //construct featureLibraryPath by extracting feature file path minus the testFeatures path
    //the remaining path can be added to the testSteps path
    featureLibraryPath = path.dirname(file);
    featureLibraryDefault = file.replace(/\..+$/, "") + "-steps.js";

    featureFile(file, function featureFile(feature) {
      var libraries = [], loadedLibraries, yadda;

      //helper function to prepare multiple libraries for loading into the yadda interpreter
      var requireLibraries = function requireLibraries(libraries1) {
        var requireLibrary = function requireLibrary(libraries2, library) {
          return libraries2.concat(require(library));
        };
        return libraries1.reduce(requireLibrary, []);
      };

      //get libraries to load and load
      if (feature.annotations.hasOwnProperty("libraries")) {
        //load any libraries annotated in the feature file
        libraries = _.map(feature.annotations.libraries.split(", "), function mapLibraries(value) {
          return path.join(featureLibraryPath, value);
        });
      }
      libraries.push(featureLibraryDefault); //add default library
      loadedLibraries = requireLibraries(libraries);

      //initiate yadda and execute each scenario
      yadda = new Yadda.Yadda(loadedLibraries, worldContext);
      scenarios(feature.scenarios, function scenario(scenarioParam) {
        //before test setup
        before(function before(done) {
          if (worldContext.world.hasOwnProperty("before")) {
            worldContext.world.before(done);
            delete worldContext.world.before;
          } else {
            done();
          }
        });
        //run steps
        steps(scenarioParam.steps, function step(stepParam, done) {
          yadda.yadda(stepParam, done);
        });
        //after test teardown
        after(function after(done) {
          if (worldContext.world.hasOwnProperty("after")) {
            worldContext.world.after(done);
            delete worldContext.world.after;
          } else {
            done();
          }
        });
      });
    });
  }
});
