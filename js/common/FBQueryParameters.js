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

  var FBQueryParameters = QueryStringMachine.parse( {

    // enables developer-only features
    dev: { type: 'flag' },

    // adds the 'Test' screen
    testScreen: { type: 'flag' },

    // populates the output carousel with 1 card of each type
    populateOutput: { type: 'flag' },

    // makes all animation run slowly, so that things are easier to grab while they're animating
    slow: { type: 'flag' },

    // puts a red stroke around containers in the carousels, so that empty containers are visible
    showContainers: { type: 'flag' },

    // when to initialize screen views: 'onDemand'|'onStart'
    initScreenViews: { type: 'string', allowedValues: [ 'onDemand', 'onStart' ], defaultValue: 'onStart' },

    // when to initialize scenes: 'onDemand'|'onStart'
    initScenes: { type: 'string', allowedValues: [ 'onDemand', 'onStart' ], defaultValue: 'onStart' },

    // shows the answer in the Mystery screen
    showAnswer: { type: 'flag' },

    // plays all Mystery challenges, in order
    playAll: { type: 'flag' },

    // shows all colors, in order that they appear in pool, for Mystery challenges
    showAllColors: { type: 'flag' }
  } );

  functionBuilder.register( 'FBQueryParameters', FBQueryParameters );

  return FBQueryParameters;
} );
