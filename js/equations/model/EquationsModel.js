// Copyright 2016, University of Colorado Boulder

/**
 * Model for the 'Equations' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var FBModel = require( 'FUNCTION_BUILDER/common/model/FBModel' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var EquationsScene = require( 'FUNCTION_BUILDER/equations/model/EquationsScene' );

  /**
   * @constructor
   */
  function EquationsModel() {
    FBModel.call( this, [ new EquationsScene() ] );
  }

  functionBuilder.register( 'EquationsModel', EquationsModel );

  return inherit( FBModel, EquationsModel );
} );