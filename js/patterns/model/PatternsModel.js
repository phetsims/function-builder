// Copyright 2015, University of Colorado Boulder

/**
 * Model for the 'Patterns' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var PatternsScene = require( 'FUNCTION_BUILDER/patterns/model/PatternsScene' );
  var Property = require( 'AXON/Property' );

  /**
   * @constructor
   */
  function PatternsModel() {

    // @public
    this.singleScene = new PatternsScene( {
      numberOfBuilders: 1,
      numberOfSlots: 1,
      maxFunctionInstances: 2
    } );

    // @public
    this.dualScene = new PatternsScene( {
      numberOfBuilders: 2,
      numberOfSlots: 1,
      maxFunctionInstances: 2
    } );

    // @public
    this.composedScene = new PatternsScene( {
      numberOfBuilders: 1,
      numberOfSlots: 3,
      maxFunctionInstances: 2
    } );

    //TODO initial selection should be singleScene
    // @public
    this.selectedSceneProperty = new Property( this.composedScene );
  }

  functionBuilder.register( 'PatternsModel', PatternsModel );

  return inherit( Object, PatternsModel, {

    // @public
    reset: function() {
      this.singleScene.reset();
      this.dualScene.reset();
      this.composedScene.reset();
      this.selectedSceneProperty.reset();
    },

    // @public
    step: function( dt ) {
      //TODO
    }
  } );
} );