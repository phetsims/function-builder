// Copyright 2015-2016, University of Colorado Boulder

/**
 * Model for the 'Numbers' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const FBModel = require( 'FUNCTION_BUILDER/common/model/FBModel' );
  const functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  const inherit = require( 'PHET_CORE/inherit' );
  const NumbersScene = require( 'FUNCTION_BUILDER/numbers/model/NumbersScene' );

  /**
   * @constructor
   */
  function NumbersModel() {
    FBModel.call( this, [ new NumbersScene() ] );
  }

  functionBuilder.register( 'NumbersModel', NumbersModel );

  return inherit( FBModel, NumbersModel );
} );