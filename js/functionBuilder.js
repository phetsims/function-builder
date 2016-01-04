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

  // enables logging output to the console
  if ( phet.chipper.getQueryParameter( 'log' ) ) {
    console.log( 'enabling log' );
    functionBuilder.log = function( message ) {
      console.log( '%clog: ' + message, 'color: #009900' ); // green
    };
  }

  return functionBuilder;
} );