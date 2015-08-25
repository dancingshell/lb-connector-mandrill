"use strict";
var R = require("ramda");
var fs = require("fs");
var path = require('path');
var glob = require("glob");
var childProcess = require('child_process');
var spawn = childProcess.spawn;
var exec = childProcess.exec;
var loopbackServer, beforeAllFlag = false, afterAllFlag = false;

module.exports = function testUtils(opts) {
  var processCoverage = function processCoverage(coverageData) {
    global.__cpmCoverage__ = R.merge(global.__cpmCoverage__, coverageData);
  };
  var _opts = opts;
  return {
    "browsers": _opts.browsers,
    "openBrowser": function openBrowser(worldContext, done) {
      var requestStream;
      var browser = this.browsers.length > 0 ? this.browsers[0] : null;
      var subLogger = worldContext.world.logger.child({"widget_type": 'LOOPBACK'});
      var Bacon, Server, server, Command, request;
      if (browser && !worldContext.browser.remote) { //if .remote exists then web server and browser already started
        //For white-box browser testing setup Request and Leadfoot Webdriver.js server api
        //The Bacon, leadfoot and request packages are only required for white-box browser based testing
        Bacon = require('baconjs').Bacon;
        Server = require("leadfoot/Server");
        server = new Server("http://localhost:4444/wd/hub");
        Command = require("leadfoot/Command");
        request = require("request");
        //start web server
        loopbackServer = spawn('node', ['server/server.js'], {
          'cwd': worldContext.cwd,
          'env': {'path': process.env.path,
            'PORT': worldContext.browser.config.port,
            'NODE_ENV': 'development'
          }
        });
        loopbackServer.stdout.on('data', function onStdout() {
          //worldContext.world.logger.info(data);
        });
        loopbackServer.stderr.on('data', function onStderr(data) {
          subLogger.warn(data.toString('utf8'));
        });
        //provide url on browser object
        worldContext.browser.url = worldContext.browser.config.url + ':' + worldContext.browser.config.port;
        //wait for loopback server startup
        requestStream = Bacon.retry({
          "source": function source() { return Bacon.fromNodeCallback(request, worldContext.browser.url); },
          "retries": 5,
          "delay": function delay() { return 5000; }
        });
        requestStream.onError(done);
        requestStream.onValue(function onValue() {
            //setup browser session
            server.createSession(browser)
              .then(function addSessionToWorld(session) {
                worldContext.browser.request = request;
                worldContext.browser.remote = new Command(session);
              })
              .finally(done);
          });
      } else {
        done();
      }
    },
    //get coverage information and teardown Leadfoot Webdriver.js server api
    "closeBrowser": function closeBrowser(worldContext, done) {
      var browser = this.browsers.length > 0 ? this.browsers[0] : null;
      if (browser && worldContext.browser.remote) { //if .remote exists then web server and browser available to kill
        worldContext.browser.request(_opts.url + '/coverage', function handler(error, response, body) {
          var vasync = require('vasync');
          if (!error && response.statusCode === 200) {
            processCoverage(JSON.parse(body.replace(/c:/g, 'C:')));
          }
          vasync.parallel({
            'funcs': [
              function f1(callback) {
                worldContext.browser.remote
                  .execute('return window.__coverage__')
                  .then(processCoverage)
                  .finally(function sessionQuit() {
                    worldContext.browser.remote.quit()
                      .finally(function quit(){
                        callback();
                      });
                  });
              },
              function f2(callback) {
                exec('taskkill /pid ' + loopbackServer.pid + ' /T /F', callback);
              }
            ]
          }, done);
        });
      } else {
        done();
      }
    },
    "beforeAll": function b(beforeAll, worldContext) {
      if (!beforeAllFlag) {
        beforeAllFlag = true;
        beforeAll(function beforeFn(done) {
          this.openBrowser(worldContext, done);
        }.bind(this));
      }
    },
    "afterAll": function a(afterAll, worldContext) {
      if (!afterAllFlag) {
        afterAllFlag = true;
        afterAll(function afterFn(done) {
          this.closeBrowser(worldContext, done);
        }.bind(this));
      }
    },
    "before": function b(before, worldContext) {
      before(function beforeFn(done) {
        if (worldContext.world.hasOwnProperty("before")) {
          worldContext.world.before(done);
          delete worldContext.world.before;
        } else {
          done();
        }
      });
    },
    "after": function a(after, worldContext) {
      after(function afterFn(done) {
        if (worldContext.world.hasOwnProperty("after")) {
          worldContext.world.after(done);
          delete worldContext.world.after;
        } else {
          done();
        }
      });
    },
    "getTestFeaturesDir": function getTestFeaturesDir(directories, cwd) {
      var testDir = path.join(cwd, directories.test);
      if (directories.hasOwnProperty("testFeatures")) {
        return cwd + path.sep + directories.testFeatures + path.sep;
      }
      return testDir + path.sep;
    },
    "getTestLibrariesDir": function getTestLibrariesDir(directories, cwd) {
      var testDir = path.join(cwd, directories.test);
      if (directories.hasOwnProperty("testLibrary")) {
        return path.join(cwd, directories.testLibrary);
      }
      return testDir;
    },
    "getTstGlob": function getTstGlob(testFeaturesDir) {
      if (process.env.hasOwnProperty("YADDA_FEATURE_GLOB")) {
        return R.map(function mapTstGlob(dir) {
          return dir.replace(/\//g, "\\");
        }, glob.sync(testFeaturesDir + "**/*" + process.env.YADDA_FEATURE_GLOB + "*"));
      }
      return [];
    },
    "requireLibraries": function requireLibraries(librariesArr) {
      return librariesArr.reduce(function requireLibrary(librariesAcc, library) {
        return librariesAcc.concat(require(library));
      }, []);
    },
    "getLibraries": function getLibraries(testFeaturesDir, testLibrariesDir, file, feature) {
      var libraries = [];
      var libraryPath = this.getLibraryRelativePath(testFeaturesDir, testLibrariesDir, file);
      var defaultFeaturePath = this.getDefaultFeaturePath(libraryPath, file);
      //get libraries to load and load
      if (feature.annotations.hasOwnProperty("libraries")) {
        //load any libraries annotated in the feature file
        libraries = R.map(function mapLibraries(value) {
          return path.resolve(libraryPath, value);
        }, feature.annotations.libraries.split(","));
      }
      //add default library
      if (defaultFeaturePath) {
        libraries.push(defaultFeaturePath);
      }
      return libraries;
    },
    "getDefaultFeaturePath": function getDefaultFeaturePath(libraryPath, file) {
      var defaultFeaturePath = path.join(libraryPath, path.basename(file, ".feature") + "-steps.js");
      if (fs.existsSync(defaultFeaturePath)) {
        return defaultFeaturePath;
      }
      return null;
    },
    "getLibraryRelativePath": function getLibraryRelativePath(testFeaturesDir, testLibrariesDir, file) {
      var featureRelativePath = path.relative(testFeaturesDir, path.dirname(file));
      return path.resolve(testLibrariesDir, featureRelativePath);
    },
    "getTestSuite": function getTestSuite(Yadda, worldContext, directories) {
      var testFeaturesDir = this.getTestFeaturesDir(directories, worldContext.cwd);
      var testLibrariesDir = this.getTestLibrariesDir(directories, worldContext.cwd);
      var tstGlob = this.getTstGlob(testFeaturesDir);
      var self = this;
      return function testSuite() {
        //beforeAll
        self.beforeAll(before, worldContext);

        new Yadda.FeatureFileSearch([testFeaturesDir]).each(function eachFeatureFile(file) {
          //if YADDA_FEATURE_GLOB exists then check if featureFile in YADDA_FEATURE_GLOB
          if (tstGlob.length > 0 && !R.contains(file, tstGlob)) {
            return;
          }

          featureFile(file, function featureFile(feature) {
            var libraries = self.getLibraries(testFeaturesDir, testLibrariesDir, file, feature);
            var loadedLibraries = self.requireLibraries(libraries);
            //initiate yadda and execute each scenario
            var yadda = new Yadda.Yadda(loadedLibraries, worldContext);
            scenarios(feature.scenarios, function scenario(scenarioParam) {
              //before test setup
              self.before(before, worldContext);
              //run steps
              /*eslint max-nested-callbacks:0 */
              steps(scenarioParam.steps, function step(stepParam, done) {
                yadda.run(stepParam, worldContext, done);
              });
              //after test teardown
              self.after(after, worldContext);
            });
          });

          //afterAll
          self.afterAll(after, worldContext);
        });
      };
    }
  };
};
