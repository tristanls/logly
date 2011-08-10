exports.version = "1.0.0";

var name = 'logly';
var mode = 'standard';

var logger = function( input, methodMode ) {
  if ( typeof( input ) === "string" ) {
    if ( methodMode == 'error' || methodMode == 'warn' ) {
      console.error( name + '[' + methodMode + ']: ' + input );
    } else if ( methodMode != 'standard' ) {
      console.log( name + '[' + methodMode + ']: ' + input );
    } else {
      console.log( name + ': ' + input );
    }
  } else if ( typeof( input ) === "function" ) {
    input();
  }
};

var debug = function( input ) {
  if ( 'debug' == mode ) {
    logger( input, 'debug' );
  }
};

var log = function( input ) {
  if ( 'standard' == mode || 'verbose' == mode || 'debug' == mode ) {
    logger( input, 'standard' );
  }
};

var error = function( input ) {
  logger( input, 'error' );
};

var stderr = function( input ) {
  if ( typeof( input ) === "string" ) {
    process.stderr.write( input );
  } else if ( typeof( input ) === "function" ) {
    input();
  }
};

var stdout = function( input ) {
  if ( typeof( input ) === "string" ) {
    process.stdout.write( input );
  } else if ( typeof( input ) === "function" ) {
    input(); 
  }
};

var verbose = function( input ) {
  if ( 'verbose' == mode || 'debug' == mode ) {
    logger( input, 'verbose' );
  }
};

var warn = function( input ) {
  logger( input, 'warn' );
};

exports.mode = function( loglyMode ) {
  if ( 'standard' === loglyMode || 'verbose' === loglyMode || 'debug' === loglyMode ) {
    mode = loglyMode;
  } else {
    throw "Invalid logly mode ( should be one of: standard, verbose, debug )";
  }
};

exports.name = function( applicationName ) {
  name = applicationName;
};

exports.debug = debug;
exports.error = error;
exports.log = log;
exports.stdout = stdout;
exports.stderr = stderr;
exports.verbose = verbose;
exports.warn = warn;