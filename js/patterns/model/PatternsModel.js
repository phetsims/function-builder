// Copyright 2015-2019, University of Colorado Boulder

/**
 * Model for the 'Patterns' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const FBModel = require( 'FUNCTION_BUILDER/common/model/FBModel' );
  const functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  const inherit = require( 'PHET_CORE/inherit' );
  const PatternsScene = require( 'FUNCTION_BUILDER/patterns/model/PatternsScene' );

  /**
   * @constructor
   */
  function PatternsModel() {
    FBModel.call( this, [

      // builder with 1 slot, for exploring application of 1 function
      new PatternsScene( {
        numberOfSlots: 1,
        numberOfEachCard: 2,
        numberOfEachFunction: 1
      } ),

      // builder with 3 slots, for exploring function composition
      new PatternsScene( {
        numberOfSlots: 3,
        numberOfEachCard: 2,
        numberOfEachFunction: 2
      } )
    ] );
  }

  functionBuilder.register( 'PatternsModel', PatternsModel );

  return inherit( FBModel, PatternsModel );
} );