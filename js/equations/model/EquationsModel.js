// Copyright 2015-2017, University of Colorado Boulder

/**
 * Model for the 'Equations' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const EquationsScene = require( 'FUNCTION_BUILDER/equations/model/EquationsScene' );
  const FBModel = require( 'FUNCTION_BUILDER/common/model/FBModel' );
  const functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  const inherit = require( 'PHET_CORE/inherit' );

  /**
   * @constructor
   */
  function EquationsModel() {
    FBModel.call( this, [ new EquationsScene() ] );
  }

  functionBuilder.register( 'EquationsModel', EquationsModel );

  return inherit( FBModel, EquationsModel );
} );