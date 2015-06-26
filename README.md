logly
====

`logly` is a small logging framework in the `nodejs` ecosystem that also allows one to set `debug` or `verbose` logging modes.
It is useful to replace comments that describe what the code is doing, especially in `debug` mode.

## Usage

```javascript
var logly = require( 'logly' );

logly.name( 'myapp' );
logly.mode( 'debug' );

logly.debug( 'debug log' );
// stdout: myapp[debug]: debug log

logly.verbose( 'verbose log' );
// stdout: myapp[verbose]: verbose log

logly.log( 'standard log' );
// stdout: myapp: standard log

logly.warn( 'warning log' );
// stderr: myapp[warn]: warning log

logly.error( 'error log' );
// stderr: myapp[error]: error log

logly.stdout( 'stdout log' );
// stdout: stdout log
// *above does not include 'myapp'

logly.stderr( 'stderr log' );
// stderr: stderr log
// *above does not include 'myapp'
```

### functions as input

`logly` also accepts functions as input; this is primarily to conditionally produce a debug output of complex something if in `debug` mode, for example:

```javascript
var options = { debug: true, output: "some.file" }
// dump options in debug mode
logly.debug( function() {
  for ( var i = 0; i < options.length; i++ ) {
    logly.debug( '[OPTION] ' + option + ": " + options[ option ] );
  }
});
// stdout: myapp[debug]: [OPTION] debug: true
// stdout: myapp[debug]: [OPTION] output: some.file
```

## Options

### color/colour

If you want color then you can enable it (by default color is disabled):

```javascript
logly.options( { color : true } );
```

You can also use `color` or `colour` functions (maintained for backward compatibility):

```javascript
logly.color(true);
logly.colour(true);
```

### date

You can include a date prefix as well:

```javascript
logly.options( { date : true } );
logly.log( 'with date' );
// stdout: Wed Aug 22 2012 21:22:52 GMT-0500 (CDT) myapp: with date
```

[ISO8601](http://en.wikipedia.org/wiki/ISO_8601) format is also available:

```javascript
logly.options( { date : 'iso' } ); // or 'ISO8601', 'iso8601', 'ISO'
logly.log( 'with iso date' );
// stdout: 2012-08-23T02:26:14.841Z myapp: with iso date
```

### processors

You can do string processing:

```javascript
var processors = [];
processors.push( function( input ) {
    return input.replace(/\n/g, ' '); // replace newlines with spaces
});
logly.options( { processors: processors } );
logly.log( 'some\nnewlines\nhere\nand\nthere');
//
```

### `options` object

You can pass in the above options all together:

```javascript
var processors = [];
processors.push( function( input ) {
    return input.replace(/\n/g, ' ');
});
logly.options( { colour : true, date : 'iso' , processors: processors } );
```
