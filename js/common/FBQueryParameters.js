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

  var FBQueryParameters = QueryStringMachine.getAll( {

    // enables console logging
    log: { type: 'flag' },

    // adds the 'Test' screen
    testScreen: { type: 'flag' },

    // populates the output carousel with 1 card of each type
    populateOutput: { type: 'flag' },

    // makes all animation run slowly, so that things are easier to grab while they're animating
    slow: { type: 'flag' },

    // puts a red stroke around containers in the carousels, so that empty containers are visible
    showContainers: { type: 'flag' },

    // when to initialize screen views
    initScreenViews: {
      type: 'string',
      validValues: [ 'onStart', 'onDemand' ],
      defaultValue: 'onStart'
    },

    // when to initialize scenes
    initScenes: {
      type: 'string',
      validValues: [ 'onStart', 'onDemand' ],
      defaultValue: 'onStart'
    },

    // shows the answers in the Mystery screen
    showAnswers: { type: 'flag' },

    // plays all Mystery challenges, in order
    playAll: { type: 'flag' },

    // shows all colors, in order that they appear in pool, for Mystery challenges
    showAllColors: { type: 'flag' },

    // which test to select initially on the Test screen, see TestScreenView
    selectedTest: {
      type: 'string',
      defaultValue: 'imageFunctions',
      validValues: [ 'imageFunctions', 'mysteryFunctionColors' ]
    }
  } );

  functionBuilder.register( 'FBQueryParameters', FBQueryParameters );

  return FBQueryParameters;
} );
