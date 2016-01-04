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
  var PatternsIconFactory = require( 'FUNCTION_BUILDER/patterns/view/PatternsIconFactory' );
  var PatternsScene = require( 'FUNCTION_BUILDER/patterns/model/PatternsScene' );
  var Property = require( 'AXON/Property' );

  /**
   * @constructor
   */
  function PatternsModel() {

    // @public (read-only)
    this.scenes = [

      // single
      new PatternsScene( PatternsIconFactory.createSingleSceneIcon, {
        numberOfBuilders: 1,
        numberOfSlots: 1,
        maxFunctionInstances: 2
      } ),

      // dual
      new PatternsScene( PatternsIconFactory.createDualSceneIcon, {
        numberOfBuilders: 2,
        numberOfSlots: 1,
        maxFunctionInstances: 2
      } ),

      // composed
      new PatternsScene( PatternsIconFactory.createComposedSceneIcon, {
        numberOfBuilders: 1,
        numberOfSlots: 3,
        maxFunctionInstances: 2
      } )
    ];

    //TODO initial selection should be scenes[0]
    // @public
    this.selectedSceneProperty = new Property( this.scenes[ 2 ] );
  }

  functionBuilder.register( 'PatternsModel', PatternsModel );

  return inherit( Object, PatternsModel, {

    // @public
    reset: function() {
      this.scenes.forEach( function( scene ) {
        scene.reset();
      } );
      this.selectedSceneProperty.reset();
    }
  } );
} );