logly
====

`logly` is a small logging framework in the `nodejs` ecosystem that also allows one to set `debug` or `verbose` logging modes. 
It is useful to replace comments that describe what the code is doing, especially in `debug` mode.
Usage
----

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
    
If you want color then you can enable it (by default color is disabled):

    logly.color(true);

`logly` also accepts functions as input; this is primarily to conditionally produce a debug output of complex something if in `debug` mode, for example:

    var options = { debug: true, output: "some.file" }
    // dump options in debug mode
    logly.debug( function() {
      for ( var i = 0; i < options.length; i++ ) {
        logly.debug( '[OPTION] ' + option + ": " + options[ option ] );
      }
    });
    // stdout: myapp[debug]: [OPTION] debug: true
    // stdout: myapp[debug]: [OPTION] output: some.file

