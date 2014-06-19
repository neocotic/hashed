/*
 * Hashed
 * https://github.com/neocotic/hashed
 *
 * Copyright (C) 2014 Alasdair Mercer
 * Licensed under the MIT license.
 * https://github.com/neocotic/hashed/blob/master/LICENSE.md
 */

'use strict';

// External dependencies.
var async = require('async');
var util = require('util');
var EventEmitter = require('events').EventEmitter;

// Internal dependencies.
var encrypt = require('./encrypt');
var pkg = require('../package.json');

// TODO: doc
var MIN_CHAR_CODE = 33;
var MAX_CHAR_CODE = 126;

// TODO: doc
var FIND_CHECK_INTERVAL = 100;

// TODO: doc
// TODO: emit `error` events where appropriate
var Table = function(options) {
  this.options = (options || {});

  this.encryptor = encrypt(this.options.algorithms);
  this.lastKnown = null;
  this.newRows = 0;
  this.stopping = false;
};

// TODO: doc
util.inherits(Table, EventEmitter);

// TODO: doc
Table.prototype.find = function(hash, encryption, callback) {
  callback = callback.bind(this);

  var interrupted = false;
  var timer = setInterval(function() {
    if (this.stopping) {
      clearInterval(timer);

      interrupted = true;

      callback(null, null);
    }
  }.bind(this), FIND_CHECK_INTERVAL);

  this.adapter.find(this, hash, encryption, function(err, value) {
    if (interrupted) return;

    clearInterval(timer);

    if (err) {
      callback(err);
    } else {
      callback(null, value);
    }
  });

  return this;
};

// TODO: doc
Table.prototype.generate = function(callback) {
  callback = callback.bind(this);

  var addRow = function(done) {
    var value = this.next();
    var data = {
      hashes: this.encryptor(value),
      value: value
    };

    this.adapter.add(this, data, function(err) {
      if (err) return done(err);

      this.lastKnown = value;
      this.newRows++;

      this.emit('add', data);

      done();
    });
  }.bind(this);

  var check = function() {
    return this.stopping;
  }.bind(this);

  async.until(check, addRow, callback);

  return this;
};

// TODO: doc
Table.prototype.last = function(callback) {
  callback = callback.bind(this);

  if (this.lastKnown == null) {
    this.adapter.last(this, function(err, last) {
      if (err) {
        callback(err);
      } else {
        this.lastKnown = last;

        callback(null, last);
      }
    });
  } else {
    callback(null, this.lastKnown);
  }

  return this;
};

// TODO: doc
Table.prototype.next = function(callback) {
  callback = callback.bind(this);

  this.last(function(err, last) {
    if (err) {
      callback(err);
    } else {
      callback(null, rollLastChar(last));
    }
  });

  return this;
};

// TODO: doc
// TODO: clean up "ready" handling here and for handlers
Table.prototype.ready = function(callback) {
  this.on('ready', callback);

  return this;
};

// TODO: doc
Table.prototype.stop = function() {
  this.stopping = true;

  return this;
};

// TODO: doc
// TODO: how to pass options to adapters
Table.prototype.use = function(adapter) {
  this.adapter = adapter;

  // TODO: setup adapter
  this.adapter.on('ready', function() {
    this.emit('ready');
  }.bind(this));

  return this;
};

// TODO: doc
var hashed = function(options) {
  return new Table(options);
};

// TODO: doc
hashed.VERSION = pkg.version;

// TODO: doc
var rollLastChar = function(str) {
  str = (str || '');

  var lastCharCode = str.charCodeAt(str.length - 1);
  var result;

  if (Number.isNaN(lastCharCode) || lastCharCode === MAX_CHAR_CODE) {
    result = str + String.fromCharCode(MIN_CHAR_CODE);
  } else {
    result = str.slice(0, -1) + String.fromCharCode(lastCharCode + 1);
  }

  return result;
};

module.exports = hashed;
