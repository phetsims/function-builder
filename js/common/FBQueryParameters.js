// Copyright 2015-2018, University of Colorado Boulder

/**
 * Query parameters supported by this simulation.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );

  var FBQueryParameters = QueryStringMachine.getAll( {

    // adds the 'Test' screen
    testScreen: { type: 'flag' },

    // populates the output carousel with 1 card of each type
    populateOutput: { type: 'flag' },

    // puts a red stroke around containers in the carousels, so that empty containers are visible
    showContainers: { type: 'flag' },

    // plays all Mystery challenges, in order
    playAll: { type: 'flag' },

    // shows all colors, in order that they appear in pool, for Mystery challenges
    showAllColors: { type: 'flag' }
  } );

  functionBuilder.register( 'FBQueryParameters', FBQueryParameters );

  // log the values of all sim-specific query parameters
  phet.log && phet.log( 'query parameters: ' + JSON.stringify( FBQueryParameters, null, 2 ) );

  return FBQueryParameters;
} );
