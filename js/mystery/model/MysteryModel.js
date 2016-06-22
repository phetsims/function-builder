// Copyright 2016, University of Colorado Boulder

/**
 * Model for the 'Mystery' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var FBModel = require( 'FUNCTION_BUILDER/common/model/FBModel' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MysteryChallenges = require( 'FUNCTION_BUILDER/mystery/model/MysteryChallenges' );
  var MysteryScene = require( 'FUNCTION_BUILDER/mystery/model/MysteryScene' );

  /**
   * @constructor
   */
  function MysteryModel() {
    FBModel.call( this, [
      new MysteryScene( MysteryChallenges.POOL1, { functionsPerChallenge: 1 } ),
      new MysteryScene( MysteryChallenges.POOL2, { functionsPerChallenge: 2 } ),
      new MysteryScene( MysteryChallenges.POOL3, { functionsPerChallenge: 3 } )
    ] );
  }

  functionBuilder.register( 'MysteryModel', MysteryModel );

  return inherit( FBModel, MysteryModel );
} );
