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
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var FBIconFactory = require( 'FUNCTION_BUILDER/common/view/FBIconFactory' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var PatternsScene = require( 'FUNCTION_BUILDER/patterns/model/PatternsScene' );
  var PropertySet = require( 'AXON/PropertySet' );
  var Vector2 = require( 'DOT/Vector2' );

  // constants for the 'single' scene
  var SINGLE_BUILDER_SLOTS = 1;
  var SINGLE_BUILDER_WIDTH = ( SINGLE_BUILDER_SLOTS * FBConstants.FUNCTION_SIZE.width ) + 200;
  var SINGLE_BUILDER_X = ( FBConstants.SCREEN_VIEW_LAYOUT_BOUNDS.width / 2 ) - ( SINGLE_BUILDER_WIDTH / 2 );

  // constants for the 'composed' scene
  var COMPOSED_BUILDER_SLOTS = 3;
  var COMPOSED_BUILDER_WIDTH = ( COMPOSED_BUILDER_SLOTS * FBConstants.FUNCTION_SIZE.width ) + 70;
  var COMPOSED_BUILDER_X = ( FBConstants.SCREEN_VIEW_LAYOUT_BOUNDS.width / 2 ) - ( COMPOSED_BUILDER_WIDTH / 2 );

  /**
   * @constructor
   */
  function PatternsModel() {

    // @public (read-only)
    this.scenes = [

      // single: builder with 1 slot, for exploring application of 1 function
      new PatternsScene( FBIconFactory.createSingleSceneIcon(), {
        numberOfEachCard: 2,
        numberOfEachFunction: 1,
        builder: new Builder( {
          numberOfSlots: SINGLE_BUILDER_SLOTS,
          width: SINGLE_BUILDER_WIDTH,
          location: new Vector2( SINGLE_BUILDER_X, FBConstants.BUILDER_Y ), // center of input slot
          colorScheme: FBColors.BUILDER_MAROON
        } )
      } ),

      // composed: builder with 3 slots, for exploring function composition
      new PatternsScene( FBIconFactory.createComposedSceneIcon(), {
        numberOfEachCard: 2,
        numberOfEachFunction: 2,
        builder: new Builder( {
          numberOfSlots: COMPOSED_BUILDER_SLOTS,
          width: COMPOSED_BUILDER_WIDTH,
          location: new Vector2( COMPOSED_BUILDER_X, FBConstants.BUILDER_Y ), // center of input slot
          colorScheme: FBColors.BUILDER_BLUE
        } )
      } )
    ];

    PropertySet.call( this, {
      selectedScene: this.scenes[ 0 ] // @public
    } );
  }

  functionBuilder.register( 'PatternsModel', PatternsModel );

  return inherit( PropertySet, PatternsModel, {

    /**
     * Animates the model.
     *
     * @param {number} dt - time since the previous step, in seconds
     * @public
     */
    step: function( dt ) {
      for ( var sceneIndex = 0; sceneIndex < this.scenes.length; sceneIndex++ ) {
        this.scenes[ sceneIndex ].step( dt );
      }
    }
  } );
} );