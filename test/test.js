"use strict";
var R = require("ramda");
var Yadda = require("yadda");

//setup paths
var cwd = process.cwd();
var pkg = require(cwd + "/package.json");

//setup logger
var bunyanFormat = require("bunyan-format");
var logger = require("bunyan").createLogger({"name": "TEST", "stream": bunyanFormat({"outputMode": "short"})});

//get browser test config
var testConfig = R.merge({
  "url": "http://localhost",
  "port": "3000",
  "browsers": []
}, R.defaultTo({}, pkg.config.test));
var testUtils = require('./testUtils')(testConfig);

//Setup test 'world' context object including world.logger, assertion library, and the browser context object
//Note: world.before and world.after are reserved for adding before and after functions
var worldContext = {"world": {"logger": logger}, "cwd": cwd, "browser": {"config": testConfig}};

//initiate mocha and run test suite
Yadda.plugins.mocha.StepLevelPlugin.init();
describe('', testUtils.getTestSuite(Yadda, worldContext, pkg.directories));
