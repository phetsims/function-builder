// Copyright 2016, University of Colorado Boulder

/**
 * Function that is used to transform images.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var AbstractFunction = require( 'FUNCTION_BUILDER/common/model/AbstractFunction' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );

  /**
   * @param {HTMLImageElement|MipMapArray} image - image that represents the function type
   * @param {Object} [options]
   * @constructor
   */
  function ImageFunction( image, options ) {
    this.image = image; // @public (read-only)
    AbstractFunction.call( this, options );
  }

  functionBuilder.register( 'ImageFunction', ImageFunction );

  return inherit( AbstractFunction, ImageFunction );
} );
