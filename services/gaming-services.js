var sys = require('util'),
    fs = require('fs'),
    childProcess = require('child_process'),
    _ = require('underscore')._,
    Backbone = require('backbone');

var Service = function () {

    this.options = null;
    this.messages = null;

    this.init = function () {
        sys.log("Service is here to do something..");
//        if (config) {
//            this.sendMail();
//        }
    };

    this.set = function (options) {
        this.init();
        this.options = options;
    };

    this.call = function (servicename, method, id, params) {
        return this[servicename](method, id, params);
    };

    this.dataSource = function (ds) {
        this.ds = ds;
    };

    // service methods

    this.hello = function (method, id, params) {
        return {msg: 'Hi there!', method: method, id: id, params: params};
    };

};

exports.Service = Service;

var exec_child_process = function (command, callbacks) {
    var child_ps;
    if (command) {
        child_ps = childProcess.exec(command, function (error, stdout, stderr) {
            if (error) {
                sys.log(error.stack);
                sys.log('Error code: '+error.code);
                sys.log('Signal received: '+error.signal);
            }
            if (stdout) {
                if (callbacks.stdout) {
                    callbacks.stdout(stdout);
                }
            }
            if (stderr) {
                if (callbacks.stderr) {
                    callbacks.stderr(stderr);
                }
            }
        });
        child_ps.on('exit', function (code) {
            if (callbacks.exit) {
                callbacks.exit(code);
            }
        });
    }
};

function dirExists (d, cb) {
    fs.stat(d, function (er, s) { cb(!er) })
}