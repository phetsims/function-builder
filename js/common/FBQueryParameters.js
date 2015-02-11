// Copyright 2002-2015, University of Colorado Boulder

/**
 * Query parameters supported by this simulation.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  var getQueryParameter = phet.chipper.getQueryParameter;

  return {
    // enables developer-only features
    DEV: getQueryParameter( 'dev' ) || false
  };
} );
