// Copyright 2015-2016, University of Colorado Boulder

/**
 * Query parameters supported by this simulation.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );

  var getQueryParameter = phet.chipper.getQueryParameter;

  var FBQueryParameters = {

    // enables developer-only features
    DEV: getQueryParameter( 'dev' ) || false,

    // populates the output carousel with 1 card of each type
    POPULATE_OUTPUT: getQueryParameter( 'populateOutput' ) || false
  };

  functionBuilder.register( 'FBQueryParameters', FBQueryParameters );

  return FBQueryParameters;
} );
