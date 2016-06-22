// Copyright 2015-2016, University of Colorado Boulder

/**
 * Model for the 'Numbers' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var FBModel = require( 'FUNCTION_BUILDER/common/model/FBModel' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var NumbersScene = require( 'FUNCTION_BUILDER/numbers/model/NumbersScene' );

  /**
   * @constructor
   */
  function NumbersModel() {
    FBModel.call( this, [ new NumbersScene() ] );
  }

  functionBuilder.register( 'NumbersModel', NumbersModel );

  return inherit( FBModel, NumbersModel );
} );