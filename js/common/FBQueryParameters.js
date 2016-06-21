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
    DEV: !!getQueryParameter( 'dev' ),

    // adds the 'Test' screen
    TEST_SCREEN: !!getQueryParameter( 'testScreen' ),

    // populates the output carousel with 1 card of each type
    POPULATE_OUTPUT: !!getQueryParameter( 'populateOutput' ),

    // makes all animation run slowly, so that things are easier to grab while they're animating
    SLOW: !!getQueryParameter( 'slow' ),

    // puts a red stroke around containers in the carousels, so that empty containers are visible
    SHOW_CONTAINERS: !!getQueryParameter( 'showContainers' ),

    // when to initialize screen views: 'onDemand'|'onStart'
    INIT_SCREEN_VIEWS: getQueryParameter( 'initScreenViews' ) || 'onStart',

    // when to initialize scenes: 'onDemand'|'onStart'
    INIT_SCENES: getQueryParameter( 'initScenes' ) || 'onStart',

    // shows the answer in the Mystery screen
    SHOW_ANSWER: !!getQueryParameter( 'showAnswer' ),

    // plays all Mystery challenges, in order
    PLAY_ALL: !!getQueryParameter( 'playAll' )
  };

  functionBuilder.register( 'FBQueryParameters', FBQueryParameters );

  return FBQueryParameters;
} );
