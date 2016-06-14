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
  var MysteryScene = require( 'FUNCTION_BUILDER/mystery/model/MysteryScene' );

  /**
   * @constructor
   */
  function MysteryModel() {

    var scenes = [
      new MysteryScene( [], { functionsPerChallenge: 1 } ),
      new MysteryScene( [], { functionsPerChallenge: 2 } ),
      new MysteryScene( [], { functionsPerChallenge: 3 } )
    ];

    FBModel.call( this, scenes );
  }

  functionBuilder.register( 'MysteryModel', MysteryModel );

  return inherit( FBModel, MysteryModel );
} );
