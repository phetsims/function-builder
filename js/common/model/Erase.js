// Copyright 2002-2015, University of Colorado Boulder

/**
 * Erases the image.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var CanvasUtils = require( 'FUNCTION_BUILDER/common/model/CanvasUtils' );
  var FBFunction = require( 'FUNCTION_BUILDER/common/model/FBFunction' );
  var inherit = require( 'PHET_CORE/inherit' );

  // images
  var eraseImage = require( 'mipmap!FUNCTION_BUILDER/functions/erase.png' );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function Erase( options ) {

    options = _.extend( {
      name: 'erase',
      image: eraseImage,
      fill: 'rgb( 0, 222, 224 )'
    }, options );

    FBFunction.call( this, options );
  }

  return inherit( FBFunction, Erase, {

    /**
     * Applies this function.
     * @param {HTMLCanvasElement} inputCanvas
     * @returns {HTMLCanvasElement}
     * @public
     * @override
     */
    apply: function( inputCanvas ) {
      var imageData = CanvasUtils.createImageData( inputCanvas ); // blank image data, same dimensions as input
      return CanvasUtils.createCanvasWithImageData( imageData );
    }
  } );
} );
