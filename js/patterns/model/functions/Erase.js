// Copyright 2015-2016, University of Colorado Boulder

/**
 * Erases the image.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var CanvasUtils = require( 'FUNCTION_BUILDER/common/model/CanvasUtils' );
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var Image = require( 'SCENERY/nodes/Image' );
  var ImageFunction = require( 'FUNCTION_BUILDER/patterns/model/ImageFunction' );
  var inherit = require( 'PHET_CORE/inherit' );

  // images
  var eraseImage = require( 'mipmap!FUNCTION_BUILDER/functions/erase.png' );

  /**
   * @constructor
   */
  function Erase() {
    ImageFunction.call( this, new Image( eraseImage, { scale: FBConstants.FUNCTION_IMAGE_SCALE } ), {
      fill: 'rgb( 0, 222, 224 )',
      invertible: false // lossy, erased image data cannot be restored
    } );
  }

  functionBuilder.register( 'Erase', Erase );

  return inherit( ImageFunction, Erase, {

    /**
     * Applies this function.
     *
     * @param {HTMLCanvasElement} inputCanvas
     * @returns {HTMLCanvasElement}
     * @public
     * @override
     */
    apply: function( inputCanvas ) {

      // blank image data (transparent black pixels), same dimensions as input
      var imageData = inputCanvas.getContext( '2d' ).createImageData( inputCanvas.width, inputCanvas.height );
      return CanvasUtils.createCanvasWithImageData( imageData );
    }
  } );
} );
