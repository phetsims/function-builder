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

  if ( phet.chipper.getQueryParameter( 'debug' ) ) {
    functionBuilder.debug = function( message ) {
      console.log( 'DEBUG: ' + message );
    }
  }

  return functionBuilder;
} );