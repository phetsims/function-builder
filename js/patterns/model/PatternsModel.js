// Copyright 2015-2016, University of Colorado Boulder

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
  var FBIconFactory = require( 'FUNCTION_BUILDER/common/view/FBIconFactory' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var PatternsScene = require( 'FUNCTION_BUILDER/patterns/model/PatternsScene' );
  var Property = require( 'AXON/Property' );
  var Vector2 = require( 'DOT/Vector2' );

  /**
   * @constructor
   */
  function PatternsModel() {

    // @public (read-only)
    this.scenes = [

      // single: 1 builder with 1 slot
      new PatternsScene( FBIconFactory.createSingleSceneIcon, {
        builder: new Builder( {
          width: 350,
          numberOfSlots: 1,
          location: new Vector2( 335, 280 ),
          colorScheme: FBColors.BUILDER_MAROON
        } )
      } ),

      // composed: 1 builder with 3 slots, for demonstrating function composition
      new PatternsScene( FBIconFactory.createComposedSceneIcon, {
        builder: new Builder( {
          width: 450,
          numberOfSlots: 3,
          location: new Vector2( 285, 280 ),
          colorScheme: FBColors.BUILDER_BLUE
        } )
      } )
    ];

    // @public
    this.selectedSceneProperty = new Property( this.scenes[ 0 ] );
  }

  functionBuilder.register( 'PatternsModel', PatternsModel );

  return inherit( Object, PatternsModel, {

    // @public
    reset: function() {
      this.scenes.forEach( function( scene ) {
        scene.reset();
      } );
      this.selectedSceneProperty.reset();
    },

    /**
     * Animates the model.
     *
     * @param {number} dt - time since the previous step, in seconds
     * @public
     */
    step: function( dt ) {
      this.scenes.forEach( function( scene ) {
        scene.step( dt );
      } );
    }
  } );
} );