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
var crypto = require('crypto');

// TODO: doc
var createAllHashes = function(value, algorithms) {
  return algorithms.map(function(algorithm) {
    return {
      algorithm: algorithm,
      hash: createHash(value, algorithm)
    };
  });
};

// TODO: doc
var createHash = function(value, algorithm) {
  var hash = crypto.createHash(algorithm);
  hash.update(value);

  return hash.digest('hex');
};

// TODO: doc
var encrypt = function(algorithms) {
  algorithms = (algorithms || []);

  if (!algorithms.length) {
    throw new Error('No supported encryption algorithms were detected!');
  }

  return function(value) {
    return createAllHashes(value, algorithms);
  };
};

module.exports = encrypt;
