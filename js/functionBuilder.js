// Copyright 2015, University of Colorado Boulder

/**
 * Creates the namespace for this simulation.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Namespace = require( 'PHET_CORE/Namespace' );

  var functionBuilder = new Namespace( 'functionBuilder' );

  // enables debug output to the console
  if ( phet.chipper.getQueryParameter( 'debug' ) ) {
    console.log( 'enabling debug' );
    functionBuilder.debug = function( message ) {
      console.log( '%cdebug: ' + message, 'color: #009900' ); // green
    }
  }

  return functionBuilder;
} );