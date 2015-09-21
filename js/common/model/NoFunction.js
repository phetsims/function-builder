// Copyright 2002-2015, University of Colorado Boulder

/**
 * Used to represent the absence of a function, as an alternative to null or undefined.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var FBFunction = require( 'FUNCTION_BUILDER/common/model/FBFunction' );
  var inherit = require( 'PHET_CORE/inherit' );

  // images
  var noFunctionImage = require( 'mipmap!FUNCTION_BUILDER/functions/noFunction.png' );

  /**
   * @constructor
   */
  function NoFunction() {
    FBFunction.call( this, 'noFunction', noFunctionImage, 'rgba( 0, 0, 0, 0 )' );
  }

  return inherit( FBFunction, NoFunction );
} );
