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
var util = require('util');
var EventEmitter = require('events').EventEmitter;

// TODO: doc
var Adapter = function() {};

// TODO: doc
util.inherits(Adapter, EventEmitter);

// TODO: doc
Adapter.prototype.isReady = false;

// TODO: doc
Adapter.prototype.add = function(table, data, callback) {
  callback(new Error('Unsupported operation: add'));

  return this;
};

// TODO: doc
Adapter.prototype.find = function(table, hash, encryption, callback) {
  callback(new Error('Unsupported operation: find'));

  return this;
};

// TODO: doc
Adapter.prototype.last = function(table, callback) {
  callback(new Error('Unsupported operation: last'));

  return this;
};

// TODO: doc
Adapter.prototype.once = function(event, listener) {
  if (event === 'ready' && this.isReady) {
    listener.call(this);

    return this;
  }

  return Adapter.super_.prototype.once.apply(this, arguments);
};

// TODO: doc
Adapter.prototype.ready = function(callback) {
  return this.on('ready', callback);
};

// TODO: doc
Adapter.prototype._ready = function() {
  this.isReady = true;

  return this.emit('ready');
};

// TODO: doc
['addListener', 'on'].forEach(function(method) {
  Adapter.prototype[method] = function(event, listener) {
    if (event === 'ready') {
      return this.once.apply(this, arguments);
    }

    return Adapter.super_.prototype[method].apply(this, arguments);
  };
});

module.exports = Adapter;
