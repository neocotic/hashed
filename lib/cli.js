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
var commander = require('commander');

// Internal dependencies.
var hashed = require('./hashed');

// TODO: doc
// TODO: how to pass algorithms
// TODO: how to pass options to adapters
var program = commander
  .version(hashed.VERSION)
  .usage('[options] <adapter>')
  .option('-f, --filter <encryption>', 'sets the encryption of the hash to be searched')
  .option('-q, --quiet',               'output less log information')
  .option('-s, --search <hash>',       'find the value for the hash');

// TODO: doc
var table;

// TODO: doc
var cli = function(args) {
  args = (args || []);

  program.parse(args);

  // Try to ensure *graceful* exits whenever possible.
  if (process.platform !== 'win32') {
    // TODO: would `once` be safer? if so, add message to say next ctrl+c could cause problems
    process.on('SIGTERM', function() {
      table.stop();
    });
  }

  // TODO: validate `program.args`?
  var adapter = function() { return program.args[0]; }; // TODO: require(program.args[0]);

  table = hashed({ quiet: program.quiet })
    .use(adapter());

  table.ready(function() {
    if (program.search) {
      this.search();
    } else {
      this.generate();
    }
  });
};

// TODO: doc
cli.exit = function(code, message) {
  if (typeof code === 'string') {
    message = code;
    code = null;
  }

  code = (code == null || code < 0) ? 0 : code;

  if (code) {
    console.error(message);
  } else {
    console.log(message);
  }

  process.exit(code);
};

// TODO: doc
cli.generate = function() {
  // TODO: complete
  console.log('Generating hashes from "%s"...', table.next());

  if (!program.quiet) {
    table.on('add', function(data) {
      console.log('Row added for value "%s"', data.value);
    });
  }

  table.generate(function(err) {
    if (err) throw err;

    cli.exit(util.format('Stopped after generating %d new rows!', table.newRows));
  })
};

// TODO: doc
cli.search = function() {
  console.log('Searching for matching value. Please wait as this can take a very long time...');

  table.find(program.search, program.filter, function(err, value) {
    if (err) throw err;

    if (value) {
      cli.exit(util.format('Match found for value: %s', value));
    } else {
      cli.exit('No match found!');
    }
  });
};

module.exports = cli;
