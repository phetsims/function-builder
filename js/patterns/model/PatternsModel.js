// Copyright 2015, University of Colorado Boulder

/**
 * Model for the 'Patterns' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Builder = require( 'FUNCTION_BUILDER/common/model/Builder' );
  var FBColors = require( 'FUNCTION_BUILDER/common/FBColors' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var PatternsIconFactory = require( 'FUNCTION_BUILDER/patterns/view/PatternsIconFactory' );
  var PatternsScene = require( 'FUNCTION_BUILDER/patterns/model/PatternsScene' );
  var Property = require( 'AXON/Property' );
  var Vector2 = require( 'DOT/Vector2' );

  /**
   * @constructor
   */
  function PatternsModel() {

    // @public (read-only)
    this.scenes = [

      // single
      new PatternsScene(
        [
          new Builder( {
            width: 350,
            numberOfSlots: 1,
            location: new Vector2( 335, 240 ),
            colorScheme: FBColors.BUILDER_MAROON
          } )
        ],
        PatternsIconFactory.createSingleSceneIcon,
        {
          maxFunctionInstances: 2
        } ),

      // dual
      new PatternsScene(
        [
          new Builder( {
            width: 300,
            numberOfSlots: 1,
            location: new Vector2( 320, 180 ),
            colorScheme: FBColors.BUILDER_MAROON
          } ),
          new Builder( {
            width: 300,
            location: new Vector2( 320, 340 ),
            colorScheme: FBColors.BUILDER_GREEN
          } )
        ],
        PatternsIconFactory.createDualSceneIcon,
        {
          maxFunctionInstances: 2
        } ),

      // composed
      new PatternsScene(
        [
          new Builder( {
            width: 450,
            numberOfSlots: 3,
            location: new Vector2( 285, 240 ),
            colorScheme: FBColors.BUILDER_BLUE
          } )
        ],
        PatternsIconFactory.createComposedSceneIcon,
        {
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