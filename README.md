    ooooo   ooooo                    oooo                        .o8
    `888'   `888'                    `888                       "888
     888     888   .oooo.    .oooo.o  888 .oo.    .ooooo.   .oooo888
     888ooooo888  `P  )88b  d88(  "8  888P"Y88b  d88' `88b d88' `888
     888     888   .oP"888  `"Y88b.   888   888  888ooo888 888   888
     888     888  d8(  888  o.  )88b  888   888  888    .o 888   888
    o888o   o888o `Y888""8o 8""888P' o888o o888o `Y8bod8P' `Y8bod88P"

[![Build Status: Linux](https://secure.travis-ci.org/neocotic/hashed.png?branch=master)](http://travis-ci.org/neocotic/hashed)
[![Dependency Status](https://gemnasium.com/neocotic/hashed.svg)](https://gemnasium.com/neocotic/hashed)

TODO: intro

> Hashed is still in the very early stages of development and is not recommended for wide use yet!
>
> Please stay tuned.

## Install

Install using the npm:

``` bash
$ npm install hashed -g
```

TODO: cover adapters

## Usage

TODO: intro to CLI

    Usage: hashed [options] <adapter>

    Options:

      -h, --help                 output usage information
      -V, --version              output the version number
      -f, --filter <algorithm>   sets the encryption algorithm of the hash to be searched
      -q, --quiet                output less log information
      -s, --search <hash>        find the value for the hash

TODO: document API

``` javascript
hashed = require('hashed');
adapter = require('hashed-csv');

table = hashed({ algorithms: ['sha1'] });
table.use(adapter());

table.ready(function() {
  table.encrypt('value', function(err, data) {
    if (err) throw err;
    /* ... */
  });
  table.find(hash, function(err, value) {
    if (err) throw err;
    /* ... */
  });
  table.find(hash, 'SHA512', function(err, value) {
    if (err) throw err;
    /* ... */
  });

  table.generate(function(err) {
    if (err) throw err;
    /* ... */
  });

  table.last(function(err, value) {
    if (err) throw err;
    /* ... */
  });

  table.next(function(err, value) {
    if (err) throw err;
    /* ... */
  });
});

table.on('add', function(data) {
  /* ... */
});
table.on('error', function(err) {
  /* ... */
});
table.on('ready', function() {
  /* ... */
});

hashed.VERSION;
```

## Adapters

TODO: document adapters

## Bugs

If you have any problems with this library or would like to see changes currently in development you can do so
[here][issues].

## Contributors

If you want to contribute, you're a legend! Information on how you can do so can be found in [CONTRIBUTING.md][]. We
want your suggestions and pull requests!

A list of Hashed contributors can be found in [AUTHORS.md][].

## License

Copyright (c) 2014 Alasdair Mercer

See [LICENSE.md][] for more information on our MIT license.

[authors.md]: https://github.com/neocotic/hashed/blob/master/AUTHORS.md
[contributing.md]: https://github.com/neocotic/hashed/blob/master/CONTRIBUTING.md
[issues]: https://github.com/neocotic/hashed/issues
[license.md]: https://github.com/neocotic/hashed/blob/master/LICENSE.md
