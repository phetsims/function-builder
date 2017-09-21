// Copyright 2015-2017, University of Colorado Boulder

/**
 * Model for the 'Equations' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var EquationsScene = require( 'FUNCTION_BUILDER/equations/model/EquationsScene' );
  var FBModel = require( 'FUNCTION_BUILDER/common/model/FBModel' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );

  /**
   * @constructor
   */
  function EquationsModel() {
    FBModel.call( this, [ new EquationsScene() ] );
  }

  functionBuilder.register( 'EquationsModel', EquationsModel );

  return inherit( FBModel, EquationsModel );
} );