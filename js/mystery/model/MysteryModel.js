// Copyright 2016-2019, University of Colorado Boulder

/**
 * Model for the 'Mystery' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const FBModel = require( 'FUNCTION_BUILDER/common/model/FBModel' );
  const functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  const inherit = require( 'PHET_CORE/inherit' );
  const MysteryChallenges = require( 'FUNCTION_BUILDER/mystery/model/MysteryChallenges' );
  const MysteryScene = require( 'FUNCTION_BUILDER/mystery/model/MysteryScene' );

  /**
   * @constructor
   */
  function MysteryModel() {
    FBModel.call( this, [
      new MysteryScene( MysteryChallenges.POOL1, { numberOfSlots: 1 } ),
      new MysteryScene( MysteryChallenges.POOL2, { numberOfSlots: 2 } ),
      new MysteryScene( MysteryChallenges.POOL3, { numberOfSlots: 3 } )
    ] );
  }

  functionBuilder.register( 'MysteryModel', MysteryModel );

  return inherit( FBModel, MysteryModel );
} );
