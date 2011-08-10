var fs = require( 'fs' );

exports.version =
  JSON.parse( fs.readFileSync( __dirname + '/package.json' ) ).version;

var name = {};
var mode = {};

// because logly is a singleton, we save global settings as a hash
//  using process.pid as keys
name[ process.pid ] = 'logly';
mode[ process.pid ] = 'standard';

var logger = function( input, methodMode ) {
  if ( typeof( input ) === "string" ) {
    if ( methodMode == 'error' || methodMode == 'warn' ) {
      console.error( name[ process.pid ] + '[' + methodMode + ']: ' + input );
    } else if ( methodMode != 'standard' ) {
      console.log( name[ process.pid ] + '[' + methodMode + ']: ' + input );
    } else {
      console.log( name[ process.pid ] + ': ' + input );
    }
  } else if ( typeof( input ) === "function" ) {
    input();
  }
};

var debug = function( input ) {
  if ( 'debug' == mode[ process.pid ] ) {
    logger( input, 'debug' );
  }
};

var log = function( input ) {
  if ( 'standard' == mode[ process.pid ] || 'verbose' == mode[ process.pid ] 
      || 'debug' == mode[ process.pid ] ) {
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
  if ( 'verbose' == mode[ process.pid ] || 'debug' == mode[ process.pid ] ) {
    logger( input, 'verbose' );
  }
};

var warn = function( input ) {
  logger( input, 'warn' );
};

exports.mode = function( loglyMode ) {
  if ( 'standard' === loglyMode || 'verbose' === loglyMode || 'debug' === loglyMode ) {
    mode[ process.pid ] = loglyMode;
  } else {
    throw "Invalid logly mode ( should be one of: standard, verbose, debug )";
  }
};

exports.name = function( applicationName ) {
  name[ process.pid ] = applicationName;
};

exports.debug = debug;
exports.error = error;
exports.log = log;
exports.stdout = stdout;
exports.stderr = stderr;
exports.verbose = verbose;
exports.warn = warn;