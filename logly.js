var fs = require( 'fs' );

exports.version =
  JSON.parse( fs.readFileSync( __dirname + '/package.json' ) ).version;

var name = {};
var mode = {};
var options = {
  'colourText': false, // true if the output should be coloured
  'datePrefix': false  // true if log messages should be prefixed with date
};
var colours = {}; //set up below colour functions

// because logly is a singleton, we save global settings as a hash
//  using process.pid as keys
name[ process.pid ] = 'logly';
mode[ process.pid ] = 'standard';

var logger = function( input, methodMode ) {
  if ( typeof( input ) === "string" ) {
    //colour output
    var colour = noColour;
    if(options.colourText) colour = ( colours[methodMode] );
    if(typeof colour === 'undefined') colour = noColour;

    // add date as message prefix
    var datePrefix = '';

    if ( options.datePrefix === true ) {
      datePrefix = ( new Date() ).toString() + ' ';
    } else if ( typeof( options.datePrefix ) === 'string' ) {

      var comparison = options.datePrefix.toLowerCase();

      if ( comparison === 'iso' || comparison === 'iso8601' ) {
        datePrefix = ( new Date() ).toISOString() + ' ';
      }

    } // else if

    switch(methodMode) {    
      case 'error':
      case 'warn':
        console.error( datePrefix + colour( name[ process.pid ] + '[' + methodMode + ']: ' + input ) );
        break;
      case 'debug':
      case 'verbose':
        console.log( datePrefix + colour( name[ process.pid ] + '[' + methodMode + ']: ' + input ) );
        break;
      default:
        console.log( datePrefix + colour( name[ process.pid ] + ': ' + input ) );
        break;
    }
  } else if ( typeof( input ) === "function" ) {
    input();
  }
}; // logger


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



//------------------------
// Colour Section
var ENDL = '\x1B[0m';

var blue = function( text ) {
  return '\x1B[0;34m' + text + ENDL;
};

var cyan = function( text ) {
  return '\x1B[0;36m' + text + ENDL;
};

var green = function( text ) {
  return '\x1B[0;32m' + text + ENDL;
};

var red = function( text ) {
  return '\x1B[0;31m' + text + ENDL;
};

var yellow = function( text ) {
  return '\x1B[0;33m' + text + ENDL;
};

var noColour = function( text ) {
  return text;
}

//config for colouring output
colours['error'] = red;
colours['warn'] = yellow;
colours['debug'] = cyan;
colours['verbose'] = green;
colours['standard'] = noColour;

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

exports.options = function( opts ) {
  options.colourText = (('color' in opts) ? (opts.color === true) : (('colour' in opts) ? (opts.colour === true) : options.colourText));
  options.datePrefix = (('date' in opts) ? opts.date : options.datePrefix);
};

// this is for compatibility with initial way to set output coloring
exports.colour = function( bColour ) {
  options.colourText = bColour === true;
};
exports.color = exports.colour;

exports.debug = debug;
exports.error = error;
exports.log = log;
exports.stdout = stdout;
exports.stderr = stderr;
exports.verbose = verbose;
exports.warn = warn;