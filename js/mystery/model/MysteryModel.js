// Copyright 2016, University of Colorado Boulder

/**
 * Model for the 'Mystery' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MysteryScene = require( 'FUNCTION_BUILDER/mystery/model/MysteryScene' );
  var Property = require( 'AXON/Property' );

  /**
   * @constructor
   */
  function MysteryModel() {

    // @public (read-only)
    this.scenes = [
      new MysteryScene( { functionsPerChallenge: 1 } ),
      new MysteryScene( { functionsPerChallenge: 2 } ),
      new MysteryScene( { functionsPerChallenge: 3 } )
    ];

    // @public {Property.<Scene>} the selected scene
    this.selectedSceneProperty = new Property( this.scenes[ 0 ] );
  }

  functionBuilder.register( 'MysteryModel', MysteryModel );

  return inherit( Object, MysteryModel, {

    // @public
    reset: function() {
      this.selectedSceneProperty.reset();
      for ( var sceneIndex = 0; sceneIndex < this.scenes.length; sceneIndex++ ) {
        this.scenes[ sceneIndex ].reset();
      }
    },

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
